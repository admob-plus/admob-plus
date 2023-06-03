import {Injectable} from '@angular/core';
import {IonicNativePlugin} from '@ionic-native/core';
import type {
  AdMob as IAdMob,
  BannerAd as IBannerAd,
  BannerAdOptions,
  InterstitialAd as IInterstitialAd,
  NativeAdOptions,
  RewardedAd as IRewardedAd,
  RewardedAdOptions,
  RewardedInterstitialAd as IRewardedInterstitialAd,
  NativeAd as INativeAd,
  RewardedInterstitialAdOptions,
} from 'admob-plus-cordova';
import {fromEvent, Observable} from 'rxjs';

const plugin = 'admob-plus-cordova';
const pluginName = 'AdMob';

// helper
const h = {
  get admob() {
    return (window as unknown as {admob: IAdMob}).admob;
  },
};

export class BannerAd
  extends IonicNativePlugin
  implements Omit<IBannerAd, 'opts'>
{
  public static plugin = plugin;
  public static pluginName = pluginName;
  public static pluginRef = 'admob.BannerAd';

  private obj: IBannerAd;

  constructor(opts: BannerAdOptions) {
    super();

    this.obj = new h.admob.BannerAd(opts);
  }

  get adUnitId() {
    return this.obj.adUnitId;
  }

  get id() {
    return this.obj.id;
  }

  load() {
    return this.obj.load();
  }

  show() {
    return this.obj.show();
  }

  hide() {
    return this.obj.hide();
  }

  on(...opts: Parameters<IBannerAd['on']>) {
    return this.obj.on(...opts);
  }
}

export class InterstitialAd
  extends IonicNativePlugin
  implements Omit<IInterstitialAd, 'opts'>
{
  public static plugin = plugin;
  public static pluginName = pluginName;
  public static pluginRef = 'admob.InterstitialAd';

  private obj: IInterstitialAd;

  constructor(opts: {adUnitId: string}) {
    super();

    this.obj = new h.admob.InterstitialAd(opts);
  }

  get adUnitId() {
    return this.obj.adUnitId;
  }

  get id() {
    return this.obj.id;
  }

  public isLoaded() {
    return this.obj.isLoaded();
  }

  public load() {
    return this.obj.load();
  }

  public show() {
    return this.obj.show();
  }

  on(...opts: Parameters<IInterstitialAd['on']>) {
    return this.obj.on(...opts);
  }
}

export class RewardedAd
  extends IonicNativePlugin
  implements Omit<IRewardedAd, 'opts'>
{
  public static plugin = plugin;
  public static pluginName = pluginName;
  public static pluginRef = 'admob.RewardedAd';

  private obj: IRewardedAd;

  constructor(opts: RewardedAdOptions) {
    super();

    this.obj = new h.admob.RewardedAd(opts);
  }

  get adUnitId() {
    return this.obj.adUnitId;
  }

  get id() {
    return this.obj.id;
  }

  public isLoaded() {
    return this.obj.isLoaded();
  }

  public load() {
    return this.obj.load();
  }

  public show() {
    return this.obj.show();
  }

  on(...opts: Parameters<IRewardedAd['on']>) {
    return this.obj.on(...opts);
  }
}

export class RewardedInterstitialAd
  extends IonicNativePlugin
  implements Omit<IRewardedInterstitialAd, 'opts'>
{
  public static plugin = plugin;
  public static pluginName = pluginName;
  public static pluginRef = 'admob.RewardedInterstitialAd';

  private obj: IRewardedInterstitialAd;

  constructor(opts: RewardedInterstitialAdOptions) {
    super();

    this.obj = new h.admob.RewardedInterstitialAd(opts);
  }

  get adUnitId() {
    return this.obj.adUnitId;
  }

  get id() {
    return this.obj.id;
  }

  public isLoaded() {
    return this.obj.isLoaded();
  }

  public load() {
    return this.obj.load();
  }

  public show() {
    return this.obj.show();
  }

  on(...opts: Parameters<IRewardedInterstitialAd['on']>) {
    return this.obj.on(...opts);
  }
}

export class NativeAd
  extends IonicNativePlugin
  implements Omit<INativeAd, 'opts'>
{
  public static plugin = plugin;
  public static pluginName = pluginName;
  public static pluginRef = 'admob.NativeAd';

  private obj: INativeAd;

  constructor(opts: NativeAdOptions) {
    super();

    this.obj = new h.admob.NativeAd(opts);
  }

  get adUnitId() {
    return this.obj.adUnitId;
  }

  get id() {
    return this.obj.id;
  }

  public isLoaded() {
    return this.obj.isLoaded();
  }

  public load() {
    return this.obj.load();
  }

  public show(...args: Parameters<INativeAd['show']>) {
    return this.obj.show(...args);
  }

  hide() {
    return this.obj.hide();
  }

  showWith(...args: Parameters<INativeAd['showWith']>) {
    return this.obj.showWith(...args);
  }

  on(...opts: Parameters<INativeAd['on']>) {
    return this.obj.on(...opts);
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
      | 'BannerAd'
      | 'configRequest'
      | 'Events'
      | 'InterstitialAd'
      | 'InterstitialAd'
      | 'NativeAd'
      | 'NativeAd'
      | 'requestTrackingAuthorization'
      | 'RewardedAd'
      | 'RewardedAd'
      | 'RewardedInterstitialAd'
      | 'RewardedInterstitialAd'
      | 'setAppMuted'
      | 'setAppVolume'
      | 'TrackingAuthorizationStatus'
      | 'WebViewAd'
    >
{
  public static platforms = ['Android', 'iOS'];
  public static plugin = plugin;
  public static pluginName = pluginName;
  public static pluginRef = 'admob';
  public static repo = 'https://github.com/admob-plus/admob-plus';

  public start() {
    return h.admob.start();
  }

  public configure(...opts: Parameters<IAdMob['configure']>) {
    return h.admob.configure(...opts);
  }

  public on(event: string): Observable<unknown> {
    return fromEvent(document, event);
  }
}
