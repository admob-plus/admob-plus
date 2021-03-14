import { AdMob } from '@admob-plus/ionic/ngx';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private platform: Platform, private admob: AdMob) {
    this.platform.ready().then(async () => {
      await admob.start();

      const banner = new admob.BannerAd({
        adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      });
      await banner.show();

      const interstitial = new admob.InterstitialAd({
        adUnitId: 'ca-app-pub-3940256099942544/1033173712',
      });
      await interstitial.load();
      await interstitial.show();

      const rewarded = new admob.RewardedAd({
        adUnitId: 'ca-app-pub-3940256099942544/5224354917',
      });
      await rewarded.load();
      await rewarded.show();
    });
  }
}
