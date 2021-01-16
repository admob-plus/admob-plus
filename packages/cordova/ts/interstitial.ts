import {
  Events,
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions,
  waitEvent,
} from './shared'

export default class InterstitialAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public isLoaded() {
    return execAsync(NativeActions.interstitialIsLoaded, [{ id: this.id }])
  }

  public async load() {
    await execAsync(NativeActions.interstitialLoad, [
      { adUnitID: this.adUnitId, id: this.id },
    ])

    await waitEvent(Events.interstitialLoad, Events.interstitialLoadFail)
  }

  public show() {
    return execAsync(NativeActions.interstitialShow, [{ id: this.id }])
  }
}
