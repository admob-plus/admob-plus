import { registerPlugin } from '@capacitor/core'
import type { AdMobPlusPlugin, MobileAdOptions } from './definitions'

const AdMobPlus = registerPlugin<AdMobPlusPlugin>('AdMobPlus', {
  web: () => import('./web').then((m) => new m.AdMobPlusWeb()),
})

class MobileAd<T extends MobileAdOptions = MobileAdOptions> {
  private static allAds: { [s: number]: MobileAd } = {}
  private static idCounter = 0

  public readonly id: number

  protected readonly opts: T

  constructor(opts: T) {
    this.opts = opts

    this.id = MobileAd.nextId()
    MobileAd.allAds[this.id] = this
  }

  private static nextId() {
    MobileAd.idCounter += 1
    return MobileAd.idCounter
  }

  public get adUnitId() {
    return this.opts.adUnitId
  }
}
class GenericAd extends MobileAd {
  private _init: Promise<void> | null

  constructor(opts: MobileAdOptions) {
    super(opts)

    // NOTE `this.constructor.name` could be changed after minify
    const cls =
      (this.constructor as unknown as { cls?: string }).cls ??
      this.constructor.name

    this._init = AdMobPlus.adCreate({
      ...this.opts,
      id: this.id,
      cls,
    }).then(() => {
      this._init = null
    })
  }

  async isLoaded() {
    await this.init()
    return AdMobPlus.adIsLoaded({ id: this.id })
  }

  async load() {
    await this.init()
    return AdMobPlus.adLoad({ id: this.id })
  }

  async show() {
    await this.init()
    return AdMobPlus.adShow({ id: this.id })
  }

  async hide() {
    await this.init()
    return AdMobPlus.adHide({ id: this.id })
  }

  protected async init() {
    if (this._init !== null) await this._init
  }
}

type Position = 'top' | 'bottom'

export interface BannerAdOptions extends MobileAdOptions {
  position?: Position
}

class BannerAd extends GenericAd {
  static cls = 'BannerAd'
  _loaded = false

  constructor(opts: BannerAdOptions) {
    super({
      position: 'bottom',
      ...opts,
    })
  }

  async load() {
    await super.load()
    this._loaded = true
  }

  async show() {
    if (!this._loaded) await this.load()
    await super.show()
  }
}

class InterstitialAd extends GenericAd {
  static cls = 'InterstitialAd'
}

class RewardedAd extends GenericAd {
  static cls = 'RewardedAd'
}

class RewardedInterstitialAd extends GenericAd {
  static cls = 'RewardedInterstitialAd'
}

export * from './definitions'
export {
  AdMobPlus,
  BannerAd,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
}
