import { Injectable } from '@angular/core'
import { cordova, IonicNativePlugin } from '@ionic-native/core'
import { fromEvent, Observable } from 'rxjs'

const plugin = 'admob-plus-cordova'
const pluginName = 'AdMob'

export class BannerAd extends IonicNativePlugin {
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.BannerAd'

  private _objectInstance: any

  constructor(opts: { adUnitId: string }) {
    super()

    this._objectInstance = new (BannerAd.getPlugin())(opts)
  }

  show(): Promise<unknown> {
    return this._objectInstance.show()
  }

  hide(): Promise<unknown> {
    return this._objectInstance.hide()
  }
}

export class InterstitialAd extends IonicNativePlugin {
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.InterstitialAd'

  private _objectInstance: any

  constructor(opts: { adUnitId: string }) {
    super()

    this._objectInstance = new (InterstitialAd.getPlugin())(opts)
  }

  public load() {
    return this._objectInstance.load()
  }

  public show() {
    return this._objectInstance.show()
  }
}

export class RewardedAd extends IonicNativePlugin {
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.RewardedAd'

  private _objectInstance: any

  constructor(opts: { adUnitId: string }) {
    super()

    this._objectInstance = new (RewardedAd.getPlugin())(opts)
  }

  public load() {
    return this._objectInstance.load()
  }

  public show() {
    return this._objectInstance.show()
  }
}

@Injectable()
export class AdMob extends IonicNativePlugin {
  public static platforms = ['Android', 'iOS']
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob'
  public static repo = 'https://github.com/admob-plus/admob-plus'

  public readonly BannerAd = BannerAd
  public readonly InterstitialAd = InterstitialAd
  public readonly RewardedAd = RewardedAd

  public start(): Promise<void> {
    return cordova(this, 'start', { otherPromise: true }, arguments)
  }

  public setAppMuted(value: boolean): Promise<any> {
    return cordova(this, 'setAppMuted', { otherPromise: true }, arguments)
  }

  public setAppVolume(value: number): Promise<any> {
    return cordova(this, 'setAppVolume', { otherPromise: true }, arguments)
  }

  public on(event: string): Observable<any> {
    return fromEvent(document, event)
  }
}
