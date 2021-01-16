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

  public async load() {
    await execAsync(NativeActions.rewardedLoad, [
      { adUnitID: this.adUnitId, id: this.id },
    ])

    await waitEvent(Events.rewardedLoad, Events.rewardedLoadFail)
  }

  public show() {
    return execAsync(NativeActions.rewardedShow, [{ id: this.id }])
  }
}
