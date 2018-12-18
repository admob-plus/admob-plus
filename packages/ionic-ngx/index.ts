import { Injectable } from '@angular/core'
import { cordova, IonicNativePlugin } from '@ionic-native/core'
import { fromEvent, Observable } from 'rxjs'

import { AdUnitIDOption, IAdRequest, IBannerRequest } from '@admob-plus/core'

export class Banner extends IonicNativePlugin {
  public static plugin = 'cordova-admob-plus'
  public static pluginName = 'AdMob'
  public static pluginRef = 'admob.banner'

  public hide(id: AdUnitIDOption): Promise<any> {
    return cordova(this, 'hide', { otherPromise: true }, arguments)
  }

  public show(opts: IBannerRequest): Promise<any> {
    return cordova(this, 'show', { otherPromise: true }, arguments)
  }
}

export class Interstitial extends IonicNativePlugin {
  public static plugin = 'cordova-admob-plus'
  public static pluginName = 'AdMob'
  public static pluginRef = 'admob.interstitial'

  public load(opts: IAdRequest): Promise<any> {
    return cordova(this, 'load', { otherPromise: true }, arguments)
  }

  public show(): Promise<any> {
    return cordova(this, 'show', { otherPromise: true }, arguments)
  }
}

export class RewardVideo extends IonicNativePlugin {
  public static plugin = 'cordova-admob-plus'
  public static pluginName = 'AdMob'
  public static pluginRef = 'admob.rewardVideo'

  public load(opts: IAdRequest): Promise<any> {
    return cordova(this, 'load', { otherPromise: true }, arguments)
  }

  public show(): Promise<any> {
    return cordova(this, 'show', { otherPromise: true }, arguments)
  }
}

@Injectable()
export class AdMob extends IonicNativePlugin {
  public static platforms = ['Android', 'iOS']
  public static plugin = 'cordova-admob-plus'
  public static pluginName = 'AdMob'
  public static pluginRef = 'admob'
  public static repo = 'https://github.com/admob-plus/admob-plus'

  public banner = new Banner()
  public interstitial = new Interstitial()
  public rewardVideo = new RewardVideo()

  public setAppMuted(value: boolean): Promise<any> {
    return cordova(this, 'setAppMuted', { otherPromise: true }, arguments)
  }

  public setAppVolume(value: number): Promise<any> {
    return cordova(this, 'setAppVolume', { otherPromise: true }, arguments)
  }

  public setDevMode(value: boolean): void {
    return cordova(this, 'setDevMode', { sync: true }, arguments)
  }

  public on(event: string): Observable<any> {
    return fromEvent(document, event)
  }
}
