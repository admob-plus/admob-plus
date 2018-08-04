import { Injectable } from '@angular/core'
import { Cordova, IonicNativePlugin, Plugin } from '@ionic-native/core'
import { Observable } from 'rxjs/Observable'
import { fromEvent } from 'rxjs/observable/fromEvent'

import { AdUnitIDOption } from './shared'

@Plugin({
  plugin: 'cordova-admob-plus',
  pluginName: 'AdMob',
  pluginRef: 'admob.banner',
})
export class Banner {
  @Cordova({ otherPromise: true })
  public show(opts: { id?: AdUnitIDOption }): Promise<any> {
    return Promise.resolve()
  }
}

@Plugin({
  plugin: 'cordova-admob-plus',
  pluginName: 'AdMob',
  pluginRef: 'admob.interstitial',
})
export class Interstitial {
  @Cordova({ otherPromise: true })
  public load(opts: { id?: AdUnitIDOption }): Promise<any> {
    return Promise.resolve()
  }

  @Cordova({ otherPromise: true })
  public show(): Promise<any> {
    return Promise.resolve()
  }
}

@Plugin({
  plugin: 'cordova-admob-plus',
  pluginName: 'AdMob',
  pluginRef: 'admob.rewardVideo',
})
export class RewardVideo {
  @Cordova({ otherPromise: true })
  public load(opts: { id?: AdUnitIDOption }): Promise<any> {
    return Promise.resolve()
  }

  @Cordova({ otherPromise: true })
  public show(): Promise<any> {
    return Promise.resolve()
  }
}

@Plugin({
  platforms: ['Android', 'iOS'],
  plugin: 'cordova-admob-plus',
  pluginName: 'AdMob',
  pluginRef: 'admob',
  repo: 'https://github.com/admob-plus/admob-plus',
})
@Injectable()
export class AdMob extends IonicNativePlugin {
  public banner = new Banner()
  public interstitial = new Interstitial()
  public rewardVideo = new RewardVideo()

  public on(event: string): Observable<any> {
    return fromEvent(document, event)
  }
}
