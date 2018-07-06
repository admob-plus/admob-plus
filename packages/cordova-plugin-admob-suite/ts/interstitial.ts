import { AdBase, execAsync, NativeActions } from './base'

interface IInterstitialPrepareOptions {
  adUnitID?: string
}

export default class Interstitial extends AdBase {
  public prepare(opts: IInterstitialPrepareOptions = {}) {
    return execAsync(NativeActions.interstitial_prepare, [opts])
  }

  public show() {
    return execAsync(NativeActions.interstitial_show)
  }
}
