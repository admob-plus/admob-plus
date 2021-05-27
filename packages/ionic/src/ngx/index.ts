import { Injectable } from '@angular/core'
import { IonicNativePlugin } from '@ionic-native/core'
import {
  AdMob as IAdMob,
  BannerAd as IBannerAd,
  BannerAdOptions,
  InterstitialAd as IInterstitialAd,
  NativeActions,
  RewardedAd as IRewardedAd,
  RewardedAdOptions,
  RewardedInterstitialAd as IRewardedInterstitialAd,
  RewardedInterstitialAdOptions,
  TrackingAuthorizationStatus,
} from 'admob-plus-cordova'
import { fromEvent, Observable } from 'rxjs'

const plugin = 'admob-plus-cordova'
const pluginName = 'AdMob'

export class BannerAd
  extends IonicNativePlugin
  implements Omit<IBannerAd, 'opts'>
{
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.BannerAd'

  private _objectInstance: IBannerAd

  constructor(opts: BannerAdOptions) {
    super()

    this._objectInstance = new (BannerAd.getPlugin())(opts)
  }

  get adUnitId() {
    return this._objectInstance.adUnitId
  }

  get id() {
    return this._objectInstance.id
  }

  load(): Promise<unknown> {
    return this._objectInstance.load()
  }

  show(): Promise<unknown> {
    return this._objectInstance.show()
  }

  hide(): Promise<unknown> {
    return this._objectInstance.hide()
  }
}

export class InterstitialAd
  extends IonicNativePlugin
  implements Omit<IInterstitialAd, 'opts'>
{
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.InterstitialAd'

  private _objectInstance: IInterstitialAd

  constructor(opts: { adUnitId: string }) {
    super()

    this._objectInstance = new (InterstitialAd.getPlugin())(opts)
  }

  get adUnitId() {
    return this._objectInstance.adUnitId
  }

  get id() {
    return this._objectInstance.id
  }

  public isLoaded() {
    return this._objectInstance.isLoaded()
  }

  public load() {
    return this._objectInstance.load()
  }

  public show() {
    return this._objectInstance.show()
  }
}

export class RewardedAd
  extends IonicNativePlugin
  implements Omit<IRewardedAd, 'opts'>
{
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.RewardedAd'

  private _objectInstance: IRewardedAd

  constructor(opts: RewardedAdOptions) {
    super()

    this._objectInstance = new (RewardedAd.getPlugin())(opts)
  }

  get adUnitId() {
    return this._objectInstance.adUnitId
  }

  get id() {
    return this._objectInstance.id
  }

  public isLoaded() {
    return this._objectInstance.isLoaded()
  }

  public load() {
    return this._objectInstance.load()
  }

  public show() {
    return this._objectInstance.show()
  }
}

export class RewardedInterstitialAd
  extends IonicNativePlugin
  implements Omit<IRewardedInterstitialAd, 'opts'>
{
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.RewardedInterstitialAd'

  private _objectInstance: IRewardedInterstitialAd

  constructor(opts: RewardedInterstitialAdOptions) {
    super()

    this._objectInstance = new (RewardedInterstitialAd.getPlugin())(opts)
  }

  get adUnitId() {
    return this._objectInstance.adUnitId
  }

  get id() {
    return this._objectInstance.id
  }

  public isLoaded() {
    return this._objectInstance.isLoaded()
  }

  public load() {
    return this._objectInstance.load()
  }

  public show() {
    return this._objectInstance.show()
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

  private get admob(): IAdMob {
    return AdMob.getPlugin()
  }

  public configRequest(
    ...opts: Parameters<IAdMob[NativeActions.configRequest]>
  ) {
    return this.admob.configRequest(...opts)
  }

  public start() {
    return this.admob.start()
  }

  public setAppMuted(...opts: Parameters<IAdMob[NativeActions.setAppMuted]>) {
    return this.admob.setAppMuted(...opts)
  }

  public setAppVolume(...opts: Parameters<IAdMob[NativeActions.setAppVolume]>) {
    return this.admob.setAppVolume(...opts)
  }

  public requestTrackingAuthorization() {
    return this.admob.requestTrackingAuthorization()
  }

  public on(event: string): Observable<any> {
    return fromEvent(document, event)
  }
}

export { TrackingAuthorizationStatus }
