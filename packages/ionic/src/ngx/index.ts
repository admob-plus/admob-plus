import { Injectable } from '@angular/core'
import { IonicNativePlugin } from '@ionic-native/core'
import {
  AdMob as IAdMob,
  BannerAd as IBannerAd,
  BannerAdOptions,
  InterstitialAd as IInterstitialAd,
  MobileAd,
  NativeActions,
  RewardedAd as IRewardedAd,
  RewardedAdOptions,
  RewardedInterstitialAd as IRewardedInterstitialAd,
  RewardedInterstitialAdOptions,
  TrackingAuthorizationStatus
} from 'admob-plus-cordova'
import { fromEvent, Observable } from 'rxjs'

const plugin = 'admob-plus-cordova'
const pluginName = 'AdMob'

// helper
class h {
  static get admob(): IAdMob {
    return (window as any).admob
  }
}

export class BannerAd
  extends IonicNativePlugin
  implements Omit<IBannerAd, 'opts'>
{
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.BannerAd'

  #obj: IBannerAd

  constructor(opts: BannerAdOptions) {
    super()

    this.#obj = new h.admob.BannerAd(opts)
  }

  get adUnitId() {
    return this.#obj.adUnitId
  }

  get id() {
    return this.#obj.id
  }

  load() {
    return this.#obj.load()
  }

  show() {
    return this.#obj.show()
  }

  hide() {
    return this.#obj.hide()
  }

  on(...opts: Parameters<MobileAd["on"]>) {
    return this.#obj.on(...opts)
  }
}

export class InterstitialAd
  extends IonicNativePlugin
  implements Omit<IInterstitialAd, 'opts'>
{
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.InterstitialAd'

  #obj: IInterstitialAd

  constructor(opts: { adUnitId: string }) {
    super()

    this.#obj = new h.admob.InterstitialAd(opts)
  }

  get adUnitId() {
    return this.#obj.adUnitId
  }

  get id() {
    return this.#obj.id
  }

  public isLoaded() {
    return this.#obj.isLoaded()
  }

  public load() {
    return this.#obj.load()
  }

  public show() {
    return this.#obj.show()
  }

  on(...opts: Parameters<MobileAd["on"]>) {
    return this.#obj.on(...opts)
  }
}

export class RewardedAd
  extends IonicNativePlugin
  implements Omit<IRewardedAd, 'opts'>
{
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.RewardedAd'

  #obj: IRewardedAd

  constructor(opts: RewardedAdOptions) {
    super()

    this.#obj = new h.admob.RewardedAd(opts)
  }

  get adUnitId() {
    return this.#obj.adUnitId
  }

  get id() {
    return this.#obj.id
  }

  public isLoaded() {
    return this.#obj.isLoaded()
  }

  public load() {
    return this.#obj.load()
  }

  public show() {
    return this.#obj.show()
  }

  on(...opts: Parameters<MobileAd["on"]>) {
    return this.#obj.on(...opts)
  }
}

export class RewardedInterstitialAd
  extends IonicNativePlugin
  implements Omit<IRewardedInterstitialAd, 'opts'>
{
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.RewardedInterstitialAd'

  #obj: IRewardedInterstitialAd

  constructor(opts: RewardedInterstitialAdOptions) {
    super()

    this.#obj = new h.admob.RewardedInterstitialAd(opts)
  }

  get adUnitId() {
    return this.#obj.adUnitId
  }

  get id() {
    return this.#obj.id
  }

  public isLoaded() {
    return this.#obj.isLoaded()
  }

  public load() {
    return this.#obj.load()
  }

  public show() {
    return this.#obj.show()
  }

  on(...opts: Parameters<MobileAd["on"]>) {
    return this.#obj.on(...opts)
  }
}

@Injectable()
export class AdMob
  extends IonicNativePlugin
  implements
    Omit<
      IAdMob,
      | 'AppOpenAd'
      | 'BannerAd'
      | 'Events'
      | 'InterstitialAd'
      | 'NativeAd'
      | 'RewardedAd'
      | 'RewardedInterstitialAd'
      | 'TrackingAuthorizationStatus'
    >
{
  public static platforms = ['Android', 'iOS']
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob'
  public static repo = 'https://github.com/admob-plus/admob-plus'

  public readonly BannerAd = BannerAd
  public readonly InterstitialAd = InterstitialAd
  public readonly RewardedAd = RewardedAd
  public readonly RewardedInterstitialAd = RewardedInterstitialAd

  public configRequest(
    ...opts: Parameters<IAdMob[NativeActions.configRequest]>
  ) {
    return h.admob.configRequest(...opts)
  }

  public start() {
    return h.admob.start()
  }

  public configure(...opts: Parameters<IAdMob[NativeActions.configure]>) {
    return h.admob.configure(...opts)
  }

  public setAppMuted(...opts: Parameters<IAdMob[NativeActions.setAppMuted]>) {
    return h.admob.setAppMuted(...opts)
  }

  public setAppVolume(...opts: Parameters<IAdMob[NativeActions.setAppVolume]>) {
    return h.admob.setAppVolume(...opts)
  }

  public requestTrackingAuthorization() {
    return h.admob.requestTrackingAuthorization()
  }

  public on(event: string): Observable<any> {
    return fromEvent(document, event)
  }
}

export { TrackingAuthorizationStatus }
