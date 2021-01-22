import _ from 'lodash'
import { pkgsDirJoin } from '../utils'
import { fireDocumentEventTs, indent4, warnMessage } from './shared'

export const Actions = _.mapValues(
  {
    ready: null,
    configRequest: null,
    setAppMuted: null,
    setAppVolume: null,
    // BannerAd
    bannerShow: null,
    bannerHide: null,
    // InterstitialAd
    interstitialIsLoaded: null,
    interstitialLoad: null,
    interstitialShow: null,
    // RewardedAd
    rewardedIsLoaded: null,
    rewardedLoad: null,
    rewardedShow: null,
  },
  (v, k) => (v === null ? k : v),
)

export const Events = _.mapValues(
  {
    initComplete: null,
    ready: null,
    // BannerAd
    bannerLoad: 'banner.load',
    bannerLoadFail: 'banner.loadFail',
    bannerOpen: 'banner.open',
    bannerClose: 'banner.close',
    bannerImpression: 'banner.impression',
    bannerClick: 'banner.click',
    // InterstitialAd
    interstitialLoad: 'interstitial.load',
    interstitialLoadFail: 'interstitial.loadFail',
    interstitialOpen: 'interstitial.open',
    interstitialClose: 'interstitial.close',
    interstitialImpression: 'interstitial.impression',
    interstitialClick: 'interstitial.click',
    // RewardedAd
    rewardedLoad: 'rewarded.load',
    rewardedLoadFail: 'rewarded.loadFail',
    rewardedOpen: 'rewarded.open',
    rewardedClose: 'rewarded.close',
    rewardedReward: 'rewarded.reward',
    rewardedShowFail: 'rewarded.showFail',
  },
  (v, k) => `admob.${v === null ? k : v}`,
)

export const AdSizeTypes = [
  'BANNER',
  'LARGE_BANNER',
  'MEDIUM_RECTANGLE',
  'FULL_BANNER',
  'LEADERBOARD',
  'SMART_BANNER',
]

function buildJava(): string {
  const linesActions = _.map(
    Actions,
    (v, k) =>
      `${indent4(2)}public static final String ${_.snakeCase(
        k,
      ).toUpperCase()} = "${v}";`,
  )
    .sort()
    .join('\n')

  const linesEvents = _.map(
    Events,
    (v, k) =>
      `${indent4(2)}public static final String ${_.snakeCase(
        k,
      ).toUpperCase()} = "${v}";`,
  )
    .sort()
    .join('\n')

  const linesAdSizeType = [
    `${indent4(2)}${AdSizeTypes.map((s) => `${s}`).join(', ')};`,
    '',
    `${indent4(2)}public static AdSize getAdSize(Object adSize) {`,
    ..._.flatMap(AdSizeTypes, (s) => [
      `${indent4(3)}if (AdSizeType.${s}.equals(adSize)) {`,
      `${indent4(4)}return AdSize.${s};`,
      `${indent4(3)}}`,
    ]),
    `${indent4(3)}return null;`,
    `${indent4(2)}}`,
  ].join('\n')

  return `// ${warnMessage}
package admob.plugin;

import com.google.android.gms.ads.AdSize;

public final class Generated {
    public final class Actions {
${linesActions}
    }

    public final class Events {
${linesEvents}
    }

    public enum AdSizeType {
${linesAdSizeType}
    }
}
`
}

function buildSwift(): string {
  const linesEvents = _.map(
    Events,
    (v, k) => `${indent4(1)}static let ${_.camelCase(k)} = "${v}"`,
  )
    .sort()
    .join('\n')

  return `// ${warnMessage}
struct AMSBannerPosition {
    static let bottom = "bottom"
    static let top = "top"
}

struct AMSEvents {
${linesEvents}
}
`
}

function buildTypeScript(): string {
  const linesActions = _.map(Actions, (v, k) => `  ${k} = '${v}',`)
    .sort()
    .join('\n')

  const linesEvents = _.map(Events, (v, k) => `  ${k} = '${v}',`)
    .sort()
    .join('\n')

  const adSizeType = AdSizeTypes.map((s) => `  ${s},`).join('\n')

  return `// ${warnMessage}
export enum NativeActions {
  Service = 'AdMob',
${linesActions}
}

export enum Events {
${linesEvents}
}

export enum AdSizeType {
${adSizeType}
}
${fireDocumentEventTs}
`
}

export default async () => ({
  files: [
    { path: 'cordova/src/android/Generated.java', f: buildJava },
    {
      path: 'cordova/src/ios/AMSGenerated.swift',
      f: buildSwift,
    },
    { path: 'cordova/ts/generated.ts', f: buildTypeScript },
  ],
  pkgDir: pkgsDirJoin('cordova'),
  tagertDir: 'src/admob/plugin',
})
