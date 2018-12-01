import { AdSizeType, IBannerRequest } from '@admob-plus/core'

import { AdBase, execAsync, NativeActions, TestIds } from './base'

const AD_ID = 1

export default class Banner extends AdBase {
  protected testIdForAndroid = TestIds.banner_android
  protected testIdForIOS = TestIds.banner_ios

  public show(opts: IBannerRequest) {
    return execAsync(NativeActions.banner_show, [
      {
        size: AdSizeType.SMART_BANNER,
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
