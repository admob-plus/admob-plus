import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdMob, BannerAd } from '@admob-plus/ionic/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  banner: BannerAd

  constructor(public navCtrl: NavController, private admob: AdMob) {
  }

  async showBannerAd() {
    const banner = new this.admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    });
    this.banner = banner
    await banner.show();
  }

  async hideBannerAd() {
    await this.banner?.hide();
  }
}
