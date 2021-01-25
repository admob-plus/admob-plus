import BannerAd from './banner'
import InterstitialAd from './interstitial'
import RewardedAd from './rewarded'
import {
  execAsync,
  initPlugin,
  NativeActions,
  RequestConfig
} from './shared'

class AdMob {
  public readonly BannerAd = BannerAd
  public readonly InterstitialAd = InterstitialAd
  public readonly RewardedAd = RewardedAd

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
}

const admob = new AdMob()
export default admob
