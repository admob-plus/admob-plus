---
title: Banner Ad
sidebar_label: Banner
---

## Usage

```ts
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
      await this.admob.start();

      const banner = new this.admob.BannerAd({
        adUnitId: 'ca-app-pub-xxx/yyy',
      });
      await banner.show();

      this.admob.on('admob.banner.impression').subscribe(async () => {
        await banner.hide();
      });
    });
  }
}
```
