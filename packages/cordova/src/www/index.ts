import AppOpenAd from './ads/app-open';
import BannerAd, {BannerAdOptions} from './ads/banner';
import InterstitialAd from './ads/interstitial';
import NativeAd, {NativeAdOptions} from './ads/native';
import RewardedAd, {
  RewardedAdOptions,
  ServerSideVerificationOptions,
} from './ads/rewarded';
import RewardedInterstitialAd, {
  RewardedInterstitialAdOptions,
} from './ads/rewarded-interstitial';
import {
  AdMobConfig,
  Events,
  NativeActions,
  RequestConfig,
  TrackingAuthorizationStatus,
  execAsync,
  start,
} from './shared';
import WebViewAd from './ads/webview';
import {Platform} from './common';

export * from './ads/base';
export {
  AppOpenAd,
  BannerAd,
  BannerAdOptions,
  InterstitialAd,
  NativeAd,
  NativeAdOptions,
  RewardedAd,
  RewardedAdOptions,
  RewardedInterstitialAd,
  RewardedInterstitialAdOptions,
  ServerSideVerificationOptions,
  WebViewAd,
};

export class AdMob {
  public readonly AppOpenAd = AppOpenAd;
  public readonly BannerAd = BannerAd;
  public readonly InterstitialAd = InterstitialAd;
  public readonly NativeAd = NativeAd;
  public readonly RewardedAd = RewardedAd;
  public readonly RewardedInterstitialAd = RewardedInterstitialAd;
  public readonly WebViewAd = WebViewAd;

  public readonly Events = Events;
  public readonly TrackingAuthorizationStatus = TrackingAuthorizationStatus;

  configure(config: AdMobConfig) {
    return execAsync(NativeActions.configure, [config]);
  }

  public configRequest(requestConfig: RequestConfig) {
    return execAsync(NativeActions.configRequest, [requestConfig]);
  }

  public setAppMuted(value: boolean) {
    return execAsync(NativeActions.setAppMuted, [value]);
  }

  public setAppVolume(value: number) {
    return execAsync(NativeActions.setAppVolume, [value]);
  }

  public start() {
    return start();
  }

  public async requestTrackingAuthorization(): Promise<
    TrackingAuthorizationStatus | false
  > {
    if (cordova.platformId === Platform.ios) {
      const n = await execAsync(NativeActions.requestTrackingAuthorization);
      if (n !== false) {
        return TrackingAuthorizationStatus[
          TrackingAuthorizationStatus[n as number]
        ];
      }
    }
    return false;
  }
}

declare global {
  const admob: AdMob;
}

export default AdMob;
