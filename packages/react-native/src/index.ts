import { NativeModules } from 'react-native'
import { AdMobPlusPlugin, MobileAdOptions } from './definitions'

const { RNAdMobPlus } = NativeModules

export const AdMobPlus = RNAdMobPlus as AdMobPlusPlugin

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

class InterstitialAd extends MobileAd {
  public load() {
    return AdMobPlus.interstitialLoad({ ...this.opts, id: this.id })
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
export { InterstitialAd, RewardedAd, RewardedInterstitialAd }
export default AdMobPlus
