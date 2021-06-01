import AppOpenAd from './app-open'
import BannerAd, { BannerAdOptions } from './banner'
import InterstitialAd from './interstitial'
import NativeAd from './native'
import RewardedAd, {
  RewardedAdOptions,
  ServerSideVerificationOptions,
} from './rewarded'
import RewardedInterstitialAd, {
  RewardedInterstitialAdOptions,
} from './rewarded-interstitial'
import {
  createAd,
  Events,
  execAsync,
  fireDocumentEvent,
  MobileAd,
  NativeActions,
  Platforms,
  RequestConfig,
  TrackingAuthorizationStatus,
} from './shared'

export * from './api'
export {
  AppOpenAd,
  BannerAd,
  BannerAdOptions,
  InterstitialAd,
  NativeAd,
  RewardedAd,
  RewardedAdOptions,
  RewardedInterstitialAd,
  RewardedInterstitialAdOptions,
  ServerSideVerificationOptions,
}

export class AdMob {
  public readonly AppOpenAd = AppOpenAd
  public readonly BannerAd = BannerAd
  public readonly InterstitialAd = InterstitialAd
  public readonly NativeAd = NativeAd
  public readonly RewardedAd = RewardedAd
  public readonly RewardedInterstitialAd = RewardedInterstitialAd

  public readonly Events = Events
  public readonly TrackingAuthorizationStatus = TrackingAuthorizationStatus

  public readonly createAd = createAd

  constructor() {
    document.addEventListener(
      'deviceready',
      () => {
        cordova.exec(
          (event) => {
            const { data } = event
            if (data && data.adId) {
              data.ad = MobileAd.getAdById(data.adId)
            }
            fireDocumentEvent(event.type, data)
          },
          console.error,
          'AdMob',
          NativeActions.ready,
        )
      },
      false,
    )
  }

  public configRequest(requestConfig: RequestConfig) {
    return execAsync(NativeActions.configRequest, [requestConfig])
  }

  public setAppMuted(value: boolean) {
    return execAsync(NativeActions.setAppMuted, [value])
  }

  public setAppVolume(value: number) {
    return execAsync(NativeActions.setAppVolume, [value])
  }

  public start() {
    return execAsync(NativeActions.start) as Promise<{ version: string }>
  }

  public async requestTrackingAuthorization(): Promise<
    TrackingAuthorizationStatus | false
  > {
    if (cordova.platformId === Platforms.ios) {
      const n = await execAsync(NativeActions.requestTrackingAuthorization)
      if (n !== false) {
        return TrackingAuthorizationStatus[
          TrackingAuthorizationStatus[n as number]
        ]
      }
    }
    return false
  }
}

declare global {
  const admob: AdMob
}

export default AdMob
