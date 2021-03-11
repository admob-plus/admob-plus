import BannerAd, { BannerAdOptions } from './banner'
import InterstitialAd from './interstitial'
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
  initPlugin,
  NativeActions,
  Platforms,
  RequestConfig,
  TrackingAuthorizationStatus
} from './shared'

export * from './api'
export {
  BannerAd,
  BannerAdOptions,
  InterstitialAd,
  RewardedAd,
  RewardedAdOptions,
  RewardedInterstitialAd,
  RewardedInterstitialAdOptions,
  ServerSideVerificationOptions,
}

export class AdMob {
  public readonly BannerAd = BannerAd
  public readonly InterstitialAd = InterstitialAd
  public readonly RewardedAd = RewardedAd
  public readonly RewardedInterstitialAd = RewardedInterstitialAd

  public readonly Events = Events
  public readonly TrackingAuthorizationStatus = TrackingAuthorizationStatus

  constructor() {
    initPlugin()
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
    return execAsync(NativeActions.start)
  }

  public async requestTrackingAuthorization(): Promise<
    TrackingAuthorizationStatus | false
  > {
    if (cordova.platformId === Platforms.ios) {
      const n = await execAsync(NativeActions.requestTrackingAuthorization)
      return TrackingAuthorizationStatus[
        TrackingAuthorizationStatus[n as number]
      ]
    }
    return false
  }
}

declare global {
  const admob: AdMob
}

export default AdMob
