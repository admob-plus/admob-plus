import {Component} from '@angular/core';
import {
  BannerAd,
  InterstitialAd,
  RewardedInterstitialAd,
  NativeAd,
  RewardedAd,
  Events,
} from 'admob-plus-cordova';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private platform: Platform) {
    // document.addEventListener('deviceready', async () => {
    this.platform.ready().then(async () => {
      await admob.start().catch(alert);

      Object.values(Events).forEach(eventName => {
        document.addEventListener(eventName, event => {
          console.log(eventName, JSON.stringify(event));
        });
      });
    });
  }

  async showBannerAd() {
    const banner = new BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    });
    await banner.show();
  }

  async showInterstitialAd() {
    const interstitial = new InterstitialAd({
      adUnitId: 'ca-app-pub-3940256099942544/1033173712',
    });
    await interstitial.load();
    await interstitial.show();
  }

  async showRewardedAd() {
    const rewarded = new RewardedAd({
      adUnitId: 'ca-app-pub-3940256099942544/5224354917',
    });
    await rewarded.load();
    await rewarded.show();
  }

  async showRewardedInterstitialAd() {
    const rewarded = new RewardedInterstitialAd({
      adUnitId: 'ca-app-pub-3940256099942544/6978759866',
    });
    await rewarded.load();
    await rewarded.show();
  }

  async showNativeAd() {
    const ad = new NativeAd({
      adUnitId: 'ca-app-pub-3940256099942544/3986624511',
    });

    await ad.load();

    await ad.show({
      x: 0,
      y: 30,
      width: window.screen.width,
      height: 300,
    });

    await new Promise(resolve =>
      setTimeout(() => {
        ad.hide();
        resolve(undefined);
      }, 5000)
    );

    await ad.showWith(document.getElementById('native-ad')!);
  }
}
