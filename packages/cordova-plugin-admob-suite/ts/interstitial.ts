import {
  AdBase,
  AdUnitIDOption,
  Events,
  execAsync,
  NativeActions,
  Platforms,
  waitEvent,
} from './base'

interface IInterstitialPrepareOptions {
  adUnitID?: AdUnitIDOption
}

export default class Interstitial extends AdBase {
  public async prepare(opts: IInterstitialPrepareOptions = {}) {
    await execAsync(NativeActions.interstitial_prepare, [
      {
        ...opts,
        adUnitID: this.getAdUnitID(opts.adUnitID),
      },
    ])

    await waitEvent(Events.interstitial_load, Events.interstitial_load_fail)
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
