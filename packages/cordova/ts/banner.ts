import {
  AdSizeType,
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions,
} from './shared'

type Position = 'top' | 'bottom'

type Options = {
  position?: Position
  size?: AdSizeType
}

export default class BannerAd extends MobileAd {
  private opts: Options

  constructor({ adUnitId, ...opts }: MobileAdOptions & Options) {
    super({ adUnitId })

    this.opts = {
      position: 'bottom',
      size: AdSizeType.SMART_BANNER,
      ...opts,
    }
  }

  public show() {
    return execAsync(NativeActions.bannerShow, [
      {
        ...this.opts,
        adUnitId: this.adUnitId,
        id: this.id,
      },
    ])
  }

  public hide() {
    return execAsync(NativeActions.bannerHide, [{ id: this.id }])
  }
}
