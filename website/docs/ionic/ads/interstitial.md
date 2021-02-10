---
title: Interstitial Ad
sidebar_label: Interstitial
---

## Usage

```ts
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
      await admob.start();

      const interstitial = new admob.InterstitialAd({
        adUnitId: 'ca-app-pub-xxx/yyy',
      })

      await interstitial.load()
      await interstitial.show()
    });
  }
}
```
