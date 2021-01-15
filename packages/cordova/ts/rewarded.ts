import type { MobileAdOptions } from './base'
import { Events, execAsync, MobileAd, NativeActions, waitEvent } from './base'

export default class RewardedAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public isReady() {
    return execAsync(NativeActions.rewardedIsReady, [{ id: this.id }])
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
