import { AdMobPlusWeb } from '@admob-plus/capacitor/src/web'
import assert from 'assert'
import _ from 'lodash'
import { pkgsDirJoin } from '../utils'
import {
  indent4,
  renderJavaContants,
  renderSwiftContants,
  warnMessage,
} from './shared'

export const AdEvents = {
  // BannerAd
  bannerLoad: 'banner.load',
  bannerLoadFail: 'banner.loadfail',
  bannerOpen: 'banner.open',
  bannerClose: 'banner.close',
  bannerImpression: 'banner.impression',
  bannerClick: 'banner.click',
  // InterstitialAd
  interstitialDismiss: 'interstitial.dismiss',
  interstitialLoad: 'interstitial.load',
  interstitialLoadFail: 'interstitial.loadfail',
  interstitialShow: 'interstitial.show',
  interstitialShowFail: 'interstitial.showfail',
  // RewardedAd
  rewardedDismiss: 'rewarded.dismiss',
  rewardedLoad: 'rewarded.load',
  rewardedLoadFail: 'rewarded.loadfail',
  rewardedReward: 'rewarded.reward',
  rewardedShow: 'rewarded.show',
  rewardedShowFail: 'rewarded.showfail',
  // RewardedInterstitialAd
  rewardedInterstitialDismiss: 'rewardedi.dismiss',
  rewardedInterstitialLoad: 'rewardedi.load',
  rewardedInterstitialLoadFail: 'rewardedi.loadfail',
  rewardedInterstitialReward: 'rewardedi.reward',
  rewardedInterstitialShow: 'rewardedi.show',
  rewardedInterstitialShowFail: 'rewardedi.showfail',
}
_.forEach(AdEvents, (v, k) => {
  assert.strictEqual(v, v.toLowerCase())
})

function buildJava(): string {
  const linesEvents = renderJavaContants(AdEvents)

  return `// ${warnMessage}
package admob.plus.capacitor;

public final class Generated {
    public final class Events {
${linesEvents}
    }
}
`
}

const buildIosMacro = () => {
  const methods = Object.getOwnPropertyNames(AdMobPlusWeb.prototype).filter(
    (x) => x !== 'constructor',
  )

  return `// ${warnMessage}
#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(AdMobPlusPlugin, "AdMobPlus",
${methods
    .map(
      (x) => `${indent4(2)}   CAP_PLUGIN_METHOD(${x}, CAPPluginReturnPromise);`,
    )
    .join('\n')}
)
`
}

function buildSwift(): string {
  const linesEvents = renderSwiftContants(AdEvents)

  return `// ${warnMessage}
struct AMBEvents {
${linesEvents}
}
`
}

export default async () => ({
  files: [
    {
      path:
        'capacitor/android/src/main/java/admob/plus/capacitor/Generated.java',
      f: buildJava,
    },
    {
      path: 'capacitor/ios/Plugin/AdMobPlusPlugin.m',
      f: buildIosMacro,
    },
    {
      path: 'capacitor/ios/Plugin/AMBGenerated.swift',
      f: buildSwift,
    },
  ],
  pkgDir: pkgsDirJoin('capacitor'),
  targetDir: '',
})
