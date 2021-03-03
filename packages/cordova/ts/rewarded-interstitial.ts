import { execAsync, MobileAd, MobileAdOptions, NativeActions } from './shared'

export default class RewardedInterstitialAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public isLoaded() {
    return execAsync(NativeActions.rewardedInterstitialIsLoaded, [
      { id: this.id },
    ])
  }

  public load() {
    return execAsync(NativeActions.rewardedInterstitialLoad, [
      { adUnitId: this.adUnitId, id: this.id },
    ])
  }

  public show() {
    return execAsync(NativeActions.rewardedInterstitialShow, [{ id: this.id }])
  }
}
