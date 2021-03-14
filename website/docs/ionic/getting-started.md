---
title: Getting Started
slug: /ionic
---

`@admob-plus/ionic` is a wrapper of [`admob-plus-cordova`](./cordova), and shares similar APIs.

It is recommended to first understand how the Cordova plugin works before installing this package.

## Installation

Read the [Getting Started](./cordova) guide of `admob-plus-cordova` for how to obtain the Application ID.

Follow the [installation guide](./ionic/installation) to add the plugin.

## Initialize AdMob SDK

```js {6-8}
import { AdMob } from '@admob-plus/ionic/ngx';
import { Platform } from '@ionic/angular';

export class HomePage {
  constructor(private platform: Platform, private admob: AdMob) {
    this.platform.ready().then(async () => {
      await this.admob.start();
    });
  }
}
```

## Display Ads

Following the guide of different ad types to display ads,

* [Banner Ad](./ionic/ads/banner)
* [Interstitial Ad](./ionic/ads/interstitial)
* [Rewarded Ad](./ionic/ads/rewarded)
* [Rewarded Interstitial Ad](./ionic/ads/rewarded-interstitial)
