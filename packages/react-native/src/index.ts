import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import {AdMobPlusPlugin, MobileAdOptions} from './definitions';

const {AdMobPlusRN} = NativeModules;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const eventEmitter = Platform.select({
  ios: new NativeEventEmitter(AdMobPlusRN),
  android: DeviceEventEmitter,
})!;

export const AdMobPlus = AdMobPlusRN as AdMobPlusPlugin;

class MobileAd<T extends MobileAdOptions = MobileAdOptions> {
  private static allAds: {[s: number]: MobileAd} = {};

  private static idCounter = 0;

  public readonly id: number;

  protected readonly opts: T;

  private _init: Promise<void> | null;

  constructor(opts: T) {
    this.opts = opts;

    this.id = MobileAd.nextId();
    MobileAd.allAds[this.id] = this;

    const cls =
      (this.constructor as unknown as {cls?: string}).cls ??
      this.constructor.name;

    this._init = AdMobPlus.adCreate({
      ...this.opts,
      id: this.id,
      cls,
    }).then(() => {
      this._init = null;
    });
  }

  private static nextId() {
    MobileAd.idCounter += 1;
    return MobileAd.idCounter;
  }

  public get adUnitId() {
    return this.opts.adUnitId;
  }

  public on(
    eventType: string,
    listener: (event: any) => void,
    context?: Record<string, unknown> | undefined
  ) {
    return eventEmitter.addListener(
      `ad.${eventType}`,
      event => {
        if (event && event.adId === this.id) {
          listener(event);
        }
      },
      context
    );
  }

  protected async isLoaded() {
    await this.init();
    return AdMobPlus.adIsLoaded({id: this.id});
  }

  protected async load() {
    await this.init();
    return AdMobPlus.adLoad({id: this.id});
  }

  protected async show() {
    await this.init();
    return AdMobPlus.adShow({id: this.id});
  }

  protected async init() {
    if (this._init !== null) await this._init;
  }
}

class InterstitialAd extends MobileAd {
  static cls = 'InterstitialAd';

  public isLoaded() {
    return super.isLoaded();
  }

  public load() {
    return super.load();
  }

  public show() {
    return super.show();
  }
}

class RewardedAd extends MobileAd {
  static cls = 'RewardedAd';

  public isLoaded() {
    return super.isLoaded();
  }

  public load() {
    return super.load();
  }

  public show() {
    return super.show();
  }
}

class RewardedInterstitialAd extends MobileAd {
  static cls = 'RewardedInterstitialAd';

  public isLoaded() {
    return super.isLoaded();
  }

  public load() {
    return super.load();
  }

  public show() {
    return super.show();
  }
}

export * from './definitions';
export {InterstitialAd, RewardedAd, RewardedInterstitialAd};
export default AdMobPlus;
