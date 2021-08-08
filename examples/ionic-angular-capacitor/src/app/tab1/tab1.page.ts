import { Component } from '@angular/core';
import {
  BannerAd,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
} from '@admob-plus/capacitor';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor() {}

  async showBannerAd() {
    const banner = new BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      position: 'top',
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
}
