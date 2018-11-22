import {
  AdBase,
  AdUnitIDOption,
  execAsync,
  NativeActions,
  TestIds,
} from './base'

interface IBannerShowOptions {
  id?: AdUnitIDOption
}

const AD_ID = 1

export default class Banner extends AdBase {
  protected testIdForAndroid = TestIds.banner_android
  protected testIdForIOS = TestIds.banner_ios

  public show(opts: IBannerShowOptions = {}) {
    return execAsync(NativeActions.banner_show, [
      {
        ...opts,
        adUnitID: this.resolveAdUnitID(opts.id),
        id: AD_ID,
      },
    ])
  }

  public hide() {
    return execAsync(NativeActions.banner_hide, [{id: AD_ID}])
  }
}
