import path from "node:path";
import * as fse from "fs-extra";
import { JSDOM } from "jsdom";
import xmlFormat from "xml-formatter";
import xml2js from "xml2js";
import { Events } from "../../packages/cordova/src/www/common";
import {
  changes,
  getUnionTypeDict,
  renderKotlinConstants,
  warnMessage,
} from "./common";
import type Context from "./context";

async function androidLatestVersion() {
  const res = await fetch(
    "https://dl.google.com/dl/android/maven2/com/google/android/gms/play-services-ads/maven-metadata.xml",
  );
  const data = await res.text();
  const result: { metadata: { versioning: Array<{ latest: [string] }> } } =
    await xml2js.parseStringPromise(data);
  return result.metadata.versioning[0].latest[0];
}

async function iosLatestVersion() {
  const res = await fetch(
    "https://trunk.cocoapods.org/api/v1/pods/Google-Mobile-Ads-SDK",
  );
  const data: {
    versions: Array<{ name: string; created_at: string }>;
  } = await res.json();
  data.versions.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
  );
  return data.versions[0].name;
}

class Generator {
  constructor(private ctx: Context) {}

  pkgDir(...args: string[]) {
    return this.ctx.rootDirJoin("packages/cordova", ...args);
  }

  get cordovaActions() {
    return getUnionTypeDict(this.pkgDir("src/www/common.ts"), "CordovaAction");
  }

  buildKotlin() {
    const linesActions = renderKotlinConstants(this.cordovaActions);
    const linesEvents = renderKotlinConstants(Events);

    return `// ${warnMessage}
package admob.plus.cordova

object Actions {
${linesActions}
}

object Events {
${linesEvents}
}
`;
  }

  buildProxyJs() {
    const linesActions = Object.entries(this.cordovaActions)
      .map(([k, v]) => `  ${k}() {},`)
      .sort()
      .join("\n");

    return `// ${warnMessage}
'use strict';

const AdMob = {
${linesActions}
};

// eslint-disable-next-line
require('cordova/exec/proxy').add('AdMob', AdMob);
`;
  }

  async updatePluginXML() {
    const filename = path.join(this.ctx.rootDir, "packages/cordova/plugin.xml");
    const pluginXML = await fse.readFile(filename, "utf8");

    const m = pluginXML.match(
      /(PLAY_SERVICES_VERSION" default=")([\d.]+)("[\s\S]*<config-file target="\*-Info.plist" parent="SKAdNetworkItems">\s)([\s\S]+?)(\s+<\/config-file>[\s\S]+Google-Mobile-Ads-SDK" spec="~> )([\d.]+)(")/,
    );
    if (!m) throw new Error("Can not parse plugin.xml");
    const [m0, m1, _androidVersion, m3, _items, m5, _iosVersion, m7] = m;
    const latestItems = xmlFormat(this.ctx.adNetworkItems, {
      collapseContent: true,
      lineSeparator: "\n",
    }).replace(/^/gm, "            ");

    const s = [
      m1,
      await androidLatestVersion(),
      m3,
      latestItems,
      m5,
      await iosLatestVersion(),
      m7,
    ].join("");

    return {
      filename,
      before: pluginXML,
      after: pluginXML.replace(m0, s),
    };
  }

  async files() {
    return {
      ...changes(await this.updatePluginXML()),
      [this.pkgDir("src/android/cordova/Generated.kt")]: this.buildKotlin(),
      [this.pkgDir("src/browser/AdMobProxy.js")]: this.buildProxyJs(),
    };
  }
}

export default Generator;
