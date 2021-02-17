---
title: Rewarded Ad
sidebar_label: Rewarded
---

## Usage

```ts
import { AdMobPlus, RewardedAd } from '@admob-plus/capacitor'

(async () => {
  await AdMobPlus.start()

  const rewarded = new RewardedAd({
    adUnitId: 'ca-app-pub-3940256099942544/5224354917',
  })
  await rewarded.load()
  await rewarded.show()
})()
```
