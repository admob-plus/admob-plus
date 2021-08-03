import { registerPlugin } from '@capacitor/core'
import type { AdMobPlusPlugin, MobileAdOptions } from './definitions'

const AdMobPlus = registerPlugin<AdMobPlusPlugin>('AdMobPlus', {
  web: () => import('./web').then((m) => new m.AdMobPlusWeb()),
})

let started = false
let startPromise: ReturnType<typeof AdMobPlus.start> | null = null

const start = AdMobPlus.start
AdMobPlus.start = async () => {
  startPromise = start()
  const result = await startPromise
  started = true
  return result
}

class MobileAd<T extends MobileAdOptions = MobileAdOptions> {
  private static allAds: { [s: number]: MobileAd } = {}
  private static idCounter = 0

  public readonly id: number

  protected readonly opts: T

  private _created = false
  private _init: Promise<any> | null = null

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

  protected async isLoaded() {
    await this.init()
    return AdMobPlus.adIsLoaded({ id: this.id })
  }

  protected async load() {
    await this.init()
    return AdMobPlus.adLoad({ id: this.id })
  }

  protected async show() {
    await this.init()
    return AdMobPlus.adShow({ id: this.id })
  }

  protected async hide() {
    await this.init()
    return AdMobPlus.adHide({ id: this.id })
  }

  protected async init() {
    if (this._created) return

    if (!started) {
      if (startPromise === null) start()
      await startPromise
    }

    if (this._init === null) {
      const cls =
        (this.constructor as unknown as { cls?: string }).cls ??
        this.constructor.name

      this._init = AdMobPlus.adCreate({
        ...this.opts,
        id: this.id,
        cls,
      })
    }

    await this._init
    this._created = true
  }
}

type Position = 'top' | 'bottom'

export interface BannerAdOptions extends MobileAdOptions {
  position?: Position
}

class BannerAd extends MobileAd {
  static cls = 'BannerAd'
  _loaded = false

  constructor(opts: BannerAdOptions) {
    super({
      position: 'bottom',
      ...opts,
    })
  }

  isLoaded() {
    return super.isLoaded()
  }

  async load() {
    await super.load()
    this._loaded = true
  }

  async show() {
    if (!this._loaded) await this.load()
    await super.show()
  }

  hide() {
    return super.hide()
  }
}

class InterstitialAd extends MobileAd {
  static cls = 'InterstitialAd'

  isLoaded() {
    return super.isLoaded()
  }

  async load() {
    return super.load()
  }

  async show() {
    return super.show()
  }
}

class RewardedAd extends MobileAd {
  static cls = 'RewardedAd'

  isLoaded() {
    return super.isLoaded()
  }

  async load() {
    return super.load()
  }

  async show() {
    return super.show()
  }
}

class RewardedInterstitialAd extends MobileAd {
  static cls = 'RewardedInterstitialAd'

  isLoaded() {
    return super.isLoaded()
  }

  async load() {
    return super.load()
  }

  async show() {
    return super.show()
  }
}

export * from './definitions'
export {
  AdMobPlus,
  BannerAd,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
}
