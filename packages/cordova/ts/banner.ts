import type { MobileAdOptions } from './base'
import { AdSizeType, execAsync, MobileAd, NativeActions } from './base'

enum Position {
  top = 'top',
  bottom = 'bottom',
}

type Options = {
  position?: Position
  size?: AdSizeType
}

export default class BannerAd extends MobileAd {
  public readonly Position = Position
  private opts: Options

  constructor({ adUnitId, ...opts }: MobileAdOptions & Options) {
    super({ adUnitId })

    this.opts = {
      position: Position.bottom,
      size: AdSizeType.SMART_BANNER,
      ...opts,
    }
  }

  public show(opts: Options) {
    return execAsync(NativeActions.bannerShow, [
      {
        ...this.opts,
        adUnitID: this.adUnitId,
        id: this.id,
      },
    ])
  }

  public hide() {
    return execAsync(NativeActions.bannerHide, [{ id: this.id }])
  }
}
