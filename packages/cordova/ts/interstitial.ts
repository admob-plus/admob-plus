import {
  AdBase,
  AdUnitIDOption,
  Events,
  execAsync,
  NativeActions,
  TestIds,
  waitEvent,
} from './base'

interface IInterstitialPrepareOptions {
  id?: AdUnitIDOption
}

export default class Interstitial extends AdBase {
  protected testIdForAndroid = TestIds.interstitial_android
  protected testIdForIOS = TestIds.interstitial_ios

  public async load(opts: IInterstitialPrepareOptions = {}) {
    await execAsync(NativeActions.interstitial_load, [
      {
        ...opts,
        adUnitID: this.resolveAdUnitID(opts.id),
      },
    ])

    await waitEvent(Events.interstitial_load, Events.interstitial_load_fail)
  }

  public show() {
    return execAsync(NativeActions.interstitial_show)
  }
}
