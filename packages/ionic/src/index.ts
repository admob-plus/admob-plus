import { Injectable } from '@angular/core'
import { cordova, IonicNativePlugin } from '@ionic-native/core'
import { fromEvent, Observable } from 'rxjs'

const plugin = 'cordova-admob-plus'
const pluginName = 'AdMob'

export class BannerAd extends IonicNativePlugin {
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.BannerAd'
}

export class InterstitialAd extends IonicNativePlugin {
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.InterstitialAd'
}

export class RewardedAd extends IonicNativePlugin {
  public static plugin = plugin
  public static pluginName = pluginName
  public static pluginRef = 'admob.RewardedAd'
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
