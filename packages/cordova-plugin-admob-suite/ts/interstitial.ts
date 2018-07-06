import { AdBase, execAsync, NativeActions, Platforms } from './base'

interface IInterstitialPrepareOptions {
  adUnitID?: string
}

export default class Interstitial extends AdBase {
  public prepare(opts: IInterstitialPrepareOptions = {}) {
    return execAsync(NativeActions.interstitial_prepare, [
      {
        ...opts,
        adUnitID: this.getAdUnitID(opts.adUnitID),
      },
    ])
  }

  public show() {
    return execAsync(NativeActions.interstitial_show)
  }

  protected get testAdUnitID() {
    switch (this.state.platform) {
      case Platforms.android:
        return 'ca-app-pub-3940256099942544/1033173712'
      case Platforms.ios:
        return 'ca-app-pub-3940256099942544/4411468910'
    }
  }
}
