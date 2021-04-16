import {
  AdSizeType,
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions,
  Platforms,
} from './shared'

type Position = 'top' | 'bottom'

export interface BannerAdOptions extends MobileAdOptions {
  position?: Position
  size?: AdSizeType
  offset?: number
}

export default class BannerAd extends MobileAd<BannerAdOptions> {
  private _loaded = false

  constructor(opts: BannerAdOptions) {
    super({
      position: 'bottom',
      size: AdSizeType.SMART_BANNER,
      ...opts,
    })
  }

  public static config(opts: { marginTop: number; marginBottom: number }) {
    if (cordova.platformId === Platforms.ios) {
      return execAsync(NativeActions.bannerConfig, [opts])
    }
    return false
  }

  public async load() {
    const result = await execAsync(NativeActions.bannerLoad, [
      { ...this.opts, id: this.id },
    ])
    this._loaded = true
    return result
  }

  public async show() {
    if (!this._loaded) {
      await this.load()
    }

    return execAsync(NativeActions.bannerShow, [{ id: this.id }])
  }

  public hide() {
    return execAsync(NativeActions.bannerHide, [{ id: this.id }])
  }
}
