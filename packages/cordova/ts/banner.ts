import {
  AdSizeType,
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions,
} from './shared'

type Position = 'top' | 'bottom'

interface BannerAdOptions extends MobileAdOptions {
  position?: Position
  size?: AdSizeType
}

export default class BannerAd extends MobileAd {
  private opts: BannerAdOptions

  constructor(opts: BannerAdOptions) {
    super({ adUnitId: opts.adUnitId })

    this.opts = {
      position: 'bottom',
      size: AdSizeType.SMART_BANNER,
      ...opts,
    }
  }

  public show() {
    return execAsync(NativeActions.bannerShow, [{ ...this.opts, id: this.id }])
  }

  public hide() {
    return execAsync(NativeActions.bannerHide, [{ id: this.id }])
  }
}
