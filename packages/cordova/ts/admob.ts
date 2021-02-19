import BannerAd from './banner'
import InterstitialAd from './interstitial'
import RewardedAd from './rewarded'
import {
  Events,
  execAsync,
  initPlugin,
  NativeActions,
  Platforms,
  RequestConfig,
  TrackingAuthorizationStatus
} from './shared'

class AdMob {
  public readonly BannerAd = BannerAd
  public readonly InterstitialAd = InterstitialAd
  public readonly RewardedAd = RewardedAd

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

const admob = new AdMob()
export default admob
