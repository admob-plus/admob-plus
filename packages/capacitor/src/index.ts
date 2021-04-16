import { registerPlugin } from '@capacitor/core'
import type { AdMobPlusPlugin } from './definitions'

const AdMobPlus = registerPlugin<AdMobPlusPlugin>('AdMobPlus', {
  web: () => import('./web').then((m) => new m.AdMobPlusWeb()),
})

type MobileAdOptions = { adUnitId: string }

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

type Position = 'top' | 'bottom'

export interface BannerAdOptions extends MobileAdOptions {
  position?: Position
}

class BannerAd extends MobileAd<BannerAdOptions> {
  constructor(opts: BannerAdOptions) {
    super({
      position: 'bottom',
      ...opts,
    })
  }

  public show() {
    return AdMobPlus.bannerShow({ ...this.opts, id: this.id })
  }

  public hide() {
    return AdMobPlus.bannerHide({ id: this.id })
  }
}

class InterstitialAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public load() {
    return AdMobPlus.interstitialLoad({ id: this.id, adUnitId: this.adUnitId })
  }

  public show() {
    return AdMobPlus.interstitialShow({ id: this.id })
  }
}

class RewardedAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public load() {
    return AdMobPlus.rewardedLoad({ id: this.id, adUnitId: this.adUnitId })
  }

  public show() {
    return AdMobPlus.rewardedShow({ id: this.id })
  }
}

class RewardedInterstitialAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public load() {
    return AdMobPlus.rewardedInterstitialLoad({
      id: this.id,
      adUnitId: this.adUnitId,
    })
  }

  public show() {
    return AdMobPlus.rewardedInterstitialShow({ id: this.id })
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
