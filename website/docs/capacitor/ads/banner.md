---
title: Banner Ad
sidebar_label: Banner
---

## Usage

```ts
import { AdMobPlus, BannerAd } from '@admob-plus/capacitor'

(async () => {
  const banner = new BannerAd({
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
  })
  await banner.show()

  AdMobPlus.addListener('banner.impression', async () => {
    await banner.hide()
  })
})()
```

## Events

### `banner.load`

An ad is received and is ready for display.

### `banner.loadfail`

An ad request has been failed.

### `banner.impression`

An ad has been displayed.
