import {
  Events,
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions,
  waitEvent,
} from './shared'

export default class RewardedAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public isLoaded() {
    return execAsync(NativeActions.rewardedIsLoaded, [{ id: this.id }])
  }

  public load() {
    return execAsync(NativeActions.rewardedLoad, [
      { adUnitId: this.adUnitId, id: this.id },
    ])
  }

  public show() {
    return execAsync(NativeActions.rewardedShow, [{ id: this.id }])
  }
}
