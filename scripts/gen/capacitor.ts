import assert from "node:assert";
import * as fse from "fs-extra";
import _ from "lodash";
import plist from "plist";
import ts from "typescript";
import {
  changes,
  indent4,
  renderKotlinConstants,
  renderSwiftConstants,
  warnMessage,
} from "./common";
import type Context from "./context";

export const Events = {
  // Ad
  adClick: "ad.click",
  adDismiss: "ad.dismiss",
  adImpression: "ad.impression",
  adLoad: "ad.load",
  adLoadFail: "ad.loadfail",
  adReward: "ad.reward",
  adShow: "ad.show",
  adShowFail: "ad.showfail",
  // BannerAd
  bannerClick: "banner.click",
  bannerClose: "banner.close",
  bannerImpression: "banner.impression",
  bannerLoad: "banner.load",
  bannerLoadFail: "banner.loadfail",
  bannerOpen: "banner.open",
  bannerSizeChange: "banner.sizechange",
  // InterstitialAd
  interstitialDismiss: "interstitial.dismiss",
  interstitialImpression: "interstitial.impression",
  interstitialLoad: "interstitial.load",
  interstitialLoadFail: "interstitial.loadfail",
  interstitialShow: "interstitial.show",
  interstitialShowFail: "interstitial.showfail",
  // RewardedAd
  rewardedDismiss: "rewarded.dismiss",
  rewardedImpression: "rewarded.impression",
  rewardedLoad: "rewarded.load",
  rewardedLoadFail: "rewarded.loadfail",
  rewardedReward: "rewarded.reward",
  rewardedShow: "rewarded.show",
  rewardedShowFail: "rewarded.showfail",
  // RewardedInterstitialAd
  rewardedInterstitialDismiss: "rewardedi.dismiss",
  rewardedInterstitialImpression: "rewardedi.impression",
  rewardedInterstitialLoad: "rewardedi.load",
  rewardedInterstitialLoadFail: "rewardedi.loadfail",
  rewardedInterstitialReward: "rewardedi.reward",
  rewardedInterstitialShow: "rewardedi.show",
  rewardedInterstitialShowFail: "rewardedi.showfail",
};
for (const v of Object.values(Events)) {
  assert.strictEqual(v, v.toLowerCase());
}

export const extractClassInfo = (
  definitionsPath: string,
  className: string,
) => {
  const program = ts.createProgram([definitionsPath], {});
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(definitionsPath);
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const node = source
    ?.getChildAt(0)
    ?.getChildren()
    .find((x) => _.get(x, "name.escapedText") === className)!;
  const cls = checker.getTypeAtLocation(node);
  return {
    checker,
    cls,
    properties: checker.getPropertiesOfType(cls),
    methodSignatures: cls
      .getProperties()
      .filter(
        (x) => x.valueDeclaration?.kind === ts.SyntaxKind.MethodSignature,
      ),
  };
};

const pluginMethods = (() => {
  const definitionsPath = require.resolve(
    "@admob-plus/capacitor/src/definitions.ts",
  );
  return extractClassInfo(definitionsPath, "AdMobPlusPlugin")
    .methodSignatures.map((x) => x.getName())
    .filter((x) => !["addListener"].includes(x));
})();

const renderMethod = (method: string) => {
  switch (method) {
    case "adIsLoaded":
      return `
    console.log('${method}', opts)
    return false`;
    case "trackingAuthorizationStatus":
    case "requestTrackingAuthorization":
      return `
    console.log('${method}', opts)
    return { status: false }`;
    default:
      return `
    console.log('${method}', opts)`;
  }
};

class Generator {
  constructor(private ctx: Context) {}

  pkgDir(...args: string[]) {
    return this.ctx.rootDirJoin("packages/capacitor", ...args);
  }

  buildKotlin() {
    const linesEvents = renderKotlinConstants(Events, 2);

    return `// ${warnMessage}
package admob.plus.capacitor

class Generated {
    object Events {
${linesEvents}
    }
}
`;
  }

  buildIosMacro() {
    return `// ${warnMessage}
#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(AdMobPlusPlugin, "AdMobPlus",
${pluginMethods
  .map(
    (x) => `${indent4(2)}   CAP_PLUGIN_METHOD(${x}, CAPPluginReturnPromise);`,
  )
  .join("\n")}
)
`;
  }

  buildSwift(): string {
    const linesEvents = renderSwiftConstants(Events);

    return `// ${warnMessage}
struct AMBEvents {
${linesEvents}
}
`;
  }

  buildWebTs() {
    return `// ${warnMessage}
import { WebPlugin } from '@capacitor/core'
import type { AdMobPlusPlugin } from './definitions'

export class AdMobPlusWeb extends WebPlugin implements AdMobPlusPlugin {
${pluginMethods
  .map(
    (x) => `  async ${x}(
    ...opts: Parameters<AdMobPlusPlugin['${x}']>
  ): ReturnType<AdMobPlusPlugin['${x}']> {${renderMethod(x)}
  }`,
  )
  .join("\n\n")}
}
`;
  }

  async updateInfoPlist() {
    const filename = this.ctx.rootDirJoin(
      "examples/capacitor/ios/App/App/Info.plist",
    );
    const before = await fse.readFile(filename, "utf8");

    const o = plist.parse(before);
    (o as Record<string, unknown>).SKAdNetworkItems = plist.parse(
      `<plist>${this.ctx.adNetworkItems}</plist>`,
    );
    const after = plist.build(o);

    return { filename, before, after };
  }

  async files() {
    return {
      ...changes(await this.updateInfoPlist()),
      [this.pkgDir(
        "android/src/main/kotlin/admob/plus/capacitor/Generated.kt",
      )]: this.buildKotlin(),
      [this.pkgDir("ios/Plugin/AdMobPlusPlugin.m")]: this.buildIosMacro(),
      [this.pkgDir("ios/Plugin/AMBGenerated.swift")]: this.buildSwift(),
      [this.pkgDir("src/web.ts")]: this.buildWebTs(),
    };
  }
}

export default Generator;
