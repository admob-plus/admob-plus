import {
  AdBase,
  Events,
  execAsync,
  NativeActions,
  TestIds,
  waitEvent,
} from './base'

import { IAdRequest } from '@admob-plus/core'

const AD_ID = 2

export default class Interstitial extends AdBase {
  protected testIdForAndroid = TestIds.interstitial_android
  protected testIdForIOS = TestIds.interstitial_ios

  public isLoaded() {
    return execAsync(NativeActions.interstitial_is_loaded, [{ id: AD_ID }])
  }

  public async load(opts: IAdRequest = {}) {
    await execAsync(NativeActions.interstitial_load, [
      {
        ...opts,
        adUnitID: this.resolveAdUnitID(opts.id),
        id: AD_ID,
      },
    ])

    await waitEvent(Events.interstitial_load, Events.interstitial_load_fail)
  }

  public show() {
    return execAsync(NativeActions.interstitial_show, [{ id: AD_ID }])
  }
}
