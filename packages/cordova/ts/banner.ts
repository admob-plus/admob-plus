import type { MobileAdOptions } from './base'
import { AdSizeType, execAsync, MobileAd, NativeActions } from './base'

enum Position {
  top = 'top',
  bottom = 'bottom',
}

type ShowOptions = {
  position?: Position
  size?: AdSizeType
}

export default class BannerAd extends MobileAd {
  public readonly Position = Position

  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public show(opts: ShowOptions) {
    return execAsync(NativeActions.bannerShow, [
      {
        position: Position.bottom,
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
