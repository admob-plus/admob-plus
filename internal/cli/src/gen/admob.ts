import fse from 'fs-extra'
import _ from 'lodash'
import { pkgsDirJoin } from '../utils'
import { AdEvents } from './capacitor'
import {
  buildUtils,
  renderJavaContants,
  renderSwiftContants,
  renderTsContants,
  warnMessage,
} from './shared'

const Actions = _.mapValues(
  {
    ready: null,
    configRequest: null,
    setAppMuted: null,
    setAppVolume: null,
    start: null,
    requestTrackingAuthorization: null,
    // Ad
    adCreate: null,
    adIsLoaded: null,
    adLoad: null,
    adShow: null,
    // BannerAd
    bannerConfig: null,
    bannerLoad: null,
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
    // RewardedInterstitialAd
    rewardedInterstitialIsLoaded: null,
    rewardedInterstitialLoad: null,
    rewardedInterstitialShow: null,
  },
  (v, k) => (v === null ? k : v) as string,
)

const EventsUnsorted = _.mapValues(
  {
    ready: null,
    ...AdEvents,
    bannerSize: 'banner.size',
  },
  (v, k) => `admob.${v === null ? k : v}`,
)
const Events = Object.keys(EventsUnsorted)
  .sort()
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: EventsUnsorted[key as never],
    }),
    {},
  )

const AdSizeTypes = [
  'BANNER',
  'LARGE_BANNER',
  'MEDIUM_RECTANGLE',
  'FULL_BANNER',
  'LEADERBOARD',
  'SMART_BANNER',
]

function buildJava(): string {
  const linesActions = renderJavaContants(Actions)
  const linesEvents = renderJavaContants(Events)

  return `// ${warnMessage}
package admob.plus.cordova;

public final class Generated {
    public static final class Actions {
${linesActions}
    }

    public static final class Events {
${linesEvents}
    }
}
`
}

function buildSwift(): string {
  const linesEvents = renderSwiftContants(Events)

  return `// ${warnMessage}
struct AMBBannerPosition {
    static let bottom = "bottom"
    static let top = "top"
}

struct AMBEvents {
${linesEvents}
}
`
}

function buildTypeScript(): string {
  const linesActions = renderTsContants(Actions)
  const linesEvents = renderTsContants(Events)

  const adSizeType = AdSizeTypes.map((s) => `  ${s},`).join('\n')

  return `// ${warnMessage}
export enum NativeActions {
${linesActions}
}

export enum Events {
${linesEvents}
}

export enum AdSizeType {
${adSizeType}
}
${buildUtils('AdMob', 'NativeActions')}
`
}

const buildProxyJs = () => {
  const linesActions = _.map(Actions, (v, k) => `  ${k}() {},`)
    .sort()
    .join('\n')

  return `// ${warnMessage}
'use strict'

const AdMob = {
${linesActions}
}

// eslint-disable-next-line node/no-missing-require
require('cordova/exec/proxy').add('AdMob', AdMob)
`
}

async function copyAndroidHelper() {
  const srcPath = pkgsDirJoin(
    'capacitor/android/src/main/java/admob/plus/AdMobHelper.java',
  )
  const content = await fse.readFile(srcPath, 'utf-8')
  await fse.outputFile(
    pkgsDirJoin('cordova/src/android/AdMobHelper.java'),
    `// ${warnMessage}\n${content}`,
  )
}

export default async () => {
  await copyAndroidHelper()
  return {
    files: [
      { path: 'cordova/src/android/cordova/Generated.java', f: buildJava },
      {
        path: 'cordova/src/ios/AMBGenerated.swift',
        f: buildSwift,
      },
      { path: 'cordova/ts/generated.ts', f: buildTypeScript },
      { path: 'cordova/src/browser/AdMobProxy.js', f: buildProxyJs },
    ],
    pkgDir: pkgsDirJoin('cordova'),
    targetDir: 'src/admob/plus',
  }
}
