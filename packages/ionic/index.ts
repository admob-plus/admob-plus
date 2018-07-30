import { Injectable } from "@angular/core";
import { Cordova, IonicNativePlugin, Plugin } from "@ionic-native/core";
import { Observable } from "rxjs/Observable";
import { fromEvent } from "rxjs/observable/fromEvent";

@Plugin({
  plugin: "cordova-admob-plus",
  pluginName: "AdMob",
  pluginRef: "admob.interstitial"
})
export class AdMobInterstitial {
  @Cordova({ otherPromise: true })
  load(opts: { id?: string }): Promise<any> {
    return Promise.resolve();
  }

  @Cordova()
  show(): Promise<any> {
    return Promise.resolve();
  }
}

@Plugin({
  platforms: ["Android", "iOS"],
  plugin: "cordova-admob-plus",
  pluginName: "AdMob",
  pluginRef: "admob",
  repo: "https://github.com/admob-plus/admob-plus"
})
@Injectable()
export class AdMob extends IonicNativePlugin {
  interstitial: AdMobInterstitial = new AdMobInterstitial();

  on(event: string): Observable<any> {
    return fromEvent(document, event);
  }
}
