import { IAdRequest } from '@admob-plus/core'

import { AdBase, execAsync, NativeActions, TestIds } from './base'

const AD_ID = 1

export default class Banner extends AdBase {
  protected testIdForAndroid = TestIds.banner_android
  protected testIdForIOS = TestIds.banner_ios

  public show(opts: IAdRequest = {}) {
    return execAsync(NativeActions.banner_show, [
      {
        ...opts,
        adUnitID: this.resolveAdUnitID(opts.id),
        id: AD_ID,
      },
    ])
  }

  public hide() {
    return execAsync(NativeActions.banner_hide, [{ id: AD_ID }])
  }
}
