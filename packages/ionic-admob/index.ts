import { Injectable } from "@angular/core";
import { Cordova, IonicNativePlugin, Plugin } from "@ionic-native/core";

@Plugin({
  plugin: "cordova-admob-plus",
  pluginName: "AdMob",
  pluginRef: "admob.interstitial"
})
export class AdMobInterstitial {
  @Cordova()
  load(): Promise<any> {
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
}
