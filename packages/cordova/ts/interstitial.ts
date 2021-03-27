import { execAsync, MobileAd, NativeActions } from './shared'

export default class InterstitialAd extends MobileAd {
  public isLoaded() {
    return execAsync(NativeActions.interstitialIsLoaded, [
      { id: this.id },
    ]) as Promise<boolean>
  }

  public load() {
    return execAsync(NativeActions.interstitialLoad, [
      { ...this.opts, id: this.id },
    ]) as Promise<void>
  }

  public show() {
    return execAsync(NativeActions.interstitialShow, [
      { id: this.id },
    ]) as Promise<void>
  }
}
