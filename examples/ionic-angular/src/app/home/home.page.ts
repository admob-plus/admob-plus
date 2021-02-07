import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdMob } from '@admob-plus/ionic/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private platform: Platform, private admob: AdMob) {
    this.platform.ready().then(async () => {
      const banner = new admob.BannerAd({
        adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      });

      await banner.load();
      await banner.show();
    });
  }
}
