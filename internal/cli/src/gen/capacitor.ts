import { AdMobPlusWeb } from '@admob-plus/capacitor/src/web'
import { pkgsDirJoin } from '../utils'
import {
  indent4,
  warnMessage,
  renderJavaContants,
  renderSwiftContants,
} from './shared'

export const AdEvents = {
  // BannerAd
  bannerLoad: 'banner.load',
  bannerLoadFail: 'banner.loadFail',
  bannerOpen: 'banner.open',
  bannerClose: 'banner.close',
  bannerImpression: 'banner.impression',
  bannerClick: 'banner.click',
  // InterstitialAd
  interstitialDismiss: 'interstitial.dismiss',
  interstitialLoad: 'interstitial.load',
  interstitialLoadFail: 'interstitial.loadFail',
  interstitialShow: 'interstitial.show',
  interstitialShowFail: 'interstitial.showFail',
  // RewardedAd
  rewardedDismiss: 'rewarded.dismiss',
  rewardedLoad: 'rewarded.load',
  rewardedLoadFail: 'rewarded.loadFail',
  rewardedReward: 'rewarded.reward',
  rewardedShow: 'rewarded.show',
  rewardedShowFail: 'rewarded.showFail',
  // RewardedInterstitialAd
  rewardedInterstitialDismiss: 'rewardedInterstitial.dismiss',
  rewardedInterstitialLoad: 'rewardedInterstitial.load',
  rewardedInterstitialLoadFail: 'rewardedInterstitial.loadFail',
  rewardedInterstitialReward: 'rewardedInterstitial.reward',
  rewardedInterstitialShow: 'rewardedInterstitial.show',
  rewardedInterstitialShowFail: 'rewardedInterstitial.showFail',
}

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
