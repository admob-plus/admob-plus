import AppOpenAd from './app-open'
import BannerAd, { BannerAdOptions } from './banner'
import InterstitialAd from './interstitial'
import NativeAd, { ManagedNativeAd } from './native'
import RewardedAd, {
  RewardedAdOptions,
  ServerSideVerificationOptions
} from './rewarded'
import RewardedInterstitialAd, {
  RewardedInterstitialAdOptions
} from './rewarded-interstitial'
import {
  Events,
  execAsync,
  fireDocumentEvent,
  MobileAd, NativeActions,
  Platforms,
  RequestConfig,
  TrackingAuthorizationStatus
} from './shared'

export * from './api'
export {
  AppOpenAd,
  BannerAd,
  BannerAdOptions,
  InterstitialAd,
  ManagedNativeAd,
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
  public readonly ManagedNativeAd = ManagedNativeAd
  public readonly NativeAd = NativeAd
  public readonly RewardedAd = RewardedAd
  public readonly RewardedInterstitialAd = RewardedInterstitialAd

  public readonly Events = Events
  public readonly TrackingAuthorizationStatus = TrackingAuthorizationStatus

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

  public async createAd<
    Ad extends MobileAd,
    O = ConstructorParameters<typeof Ad>[0],
  >(
    cls: { new (opts: O): Ad; type: string },
    opts: O,
  ): Promise<InstanceType<typeof MobileAd>> {
    const Ad = cls
    if (Ad.type === '') {
      throw new Error('Not implemented')
    }
    const ad = new Ad({ ...opts, _noinit: true })
    await execAsync(NativeActions.adCreate, [
      { ...opts, id: ad.id, type: Ad.type },
    ])
    return ad
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
