import { RewardedAdOptions } from './rewarded'
import { execAsync, MobileAd, NativeActions } from './shared'

export interface RewardedInterstitialAdOptions extends RewardedAdOptions {}

export default class RewardedInterstitialAd extends MobileAd<RewardedInterstitialAdOptions> {
  public isLoaded() {
    return execAsync(NativeActions.rewardedInterstitialIsLoaded, [
      { id: this.id },
    ])
  }

  public load() {
    return execAsync(NativeActions.rewardedInterstitialLoad, [
      { ...this.opts, id: this.id },
    ])
  }

  public show() {
    return execAsync(NativeActions.rewardedInterstitialShow, [{ id: this.id }])
  }
}
