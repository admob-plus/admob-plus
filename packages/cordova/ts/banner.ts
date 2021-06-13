import {
  AdSizeType,
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions,
  Platforms,
} from './shared'

type Position = 'top' | 'bottom'

const colorToRGBA = (function () {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => undefined

  return function (
    col: string,
  ): { r: number; g: number; b: number; a: number } | undefined {
    ctx.clearRect(0, 0, 1, 1)
    // In order to detect invalid values,
    // we can't rely on col being in the same format as what fillStyle is computed as,
    // but we can ask it to implicitly compute a normalized value twice and compare.
    ctx.fillStyle = '#000'
    ctx.fillStyle = col
    const computed = ctx.fillStyle
    ctx.fillStyle = '#fff'
    ctx.fillStyle = col
    if (computed !== ctx.fillStyle) {
      return // invalid color
    }
    ctx.fillRect(0, 0, 1, 1)
    const { data } = ctx.getImageData(0, 0, 1, 1)
    return { r: data[0], g: data[1], b: data[2], a: data[3] }
  }
})()

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

  public static config(opts: {
    backgroundColor?: string
    marginTop?: number
    marginBottom?: number
  }) {
    if (cordova.platformId === Platforms.ios) {
      const { backgroundColor: bgColor } = opts
      return execAsync(NativeActions.bannerConfig, [
        { ...opts, backgroundColor: bgColor ? colorToRGBA(bgColor) : bgColor },
      ])
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

  public destroy() {
    return execAsync(NativeActions.bannerDestroy, [{ id: this.id }])
  }
}