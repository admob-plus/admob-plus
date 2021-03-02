import { execAsync, MobileAd, MobileAdOptions, NativeActions } from './shared'

export default class InterstitialAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public isLoaded() {
    return execAsync(NativeActions.interstitialIsLoaded, [
      { id: this.id },
    ]) as Promise<boolean>
  }

  public load() {
    return execAsync(NativeActions.interstitialLoad, [
      { adUnitId: this.adUnitId, id: this.id },
    ]) as Promise<void>
  }

  public show() {
    return execAsync(NativeActions.interstitialShow, [
      { id: this.id },
    ]) as Promise<void>
  }
}
