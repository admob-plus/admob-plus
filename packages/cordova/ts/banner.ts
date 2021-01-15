import { AdUnitIDOption, IBannerRequest } from '@admob-plus/core'
import type { MobileAdOptions } from './base'
import { AdBase, AdSizeType, execAsync, MobileAd, NativeActions, TestIds } from './base'


enum BannerPosition {
  top = 'top',
  bottom = 'bottom',
}

type ShowOptions = {
  position?: BannerPosition
  size?: AdSizeType
}

export class BannerAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public show(opts: ShowOptions) {
    return execAsync(NativeActions.bannerShow, [
      {
        position: BannerPosition.bottom,
        size: AdSizeType.SMART_BANNER,
        ...opts,
        adUnitID: this.adUnitId,
        id: this.id,
      },
    ])
  }

  public hide() {
    return execAsync(NativeActions.bannerHide, [{ id: this.id }])
  }
}

export default class Banner extends AdBase {
  protected testIdForAndroid = TestIds.banner_android
  protected testIdForIOS = TestIds.banner_ios

  public show(opts: IBannerRequest) {
    const adUnitID = this.resolveAdUnitID(opts.id)
    return execAsync(NativeActions.bannerShow, [
      {
        position: 'bottom',
        size: AdSizeType.SMART_BANNER,
        ...opts,
        adUnitID,
        id: this.state.getAdId(adUnitID),
      },
    ])
  }

  public hide(id: AdUnitIDOption) {
    const adUnitID = this.resolveAdUnitID(id)
    return execAsync(NativeActions.bannerHide, [
      { id: this.state.getAdId(adUnitID) },
    ])
  }
}
