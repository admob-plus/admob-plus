import {
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions
} from './shared'

export default class InterstitialAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public isLoaded() {
    return execAsync(NativeActions.interstitialIsLoaded, [{ id: this.id }])
  }

  public  load() {
    return execAsync(NativeActions.interstitialLoad, [
      { adUnitId: this.adUnitId, id: this.id },
    ])
  }

  public show() {
    return execAsync(NativeActions.interstitialShow, [{ id: this.id }])
  }
}
