import { NativeModules } from 'react-native'
import { AdMobPlusPlugin, MobileAdOptions } from './definitions'

const { AdMobPlusRN } = NativeModules

export const AdMobPlus = AdMobPlusRN as AdMobPlusPlugin

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

    this._init = AdMobPlus.adCreate({
      ...this.opts,
      id: this.id,
      cls: this.constructor.name,
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

  protected async init() {
    if (this._init !== null) await this._init
  }
}

class InterstitialAd extends GenericAd {}

class RewardedAd extends GenericAd {}

class RewardedInterstitialAd extends GenericAd {}

export * from './definitions'
export { InterstitialAd, RewardedAd, RewardedInterstitialAd }
export default AdMobPlus
