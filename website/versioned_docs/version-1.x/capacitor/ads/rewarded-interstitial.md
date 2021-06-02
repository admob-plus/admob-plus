---
title: Rewarded Interstitial Ad
sidebar_label: Rewarded Interstitial
---

## Usage

```ts
import { AdMobPlus, RewardedInterstitialAd } from '@admob-plus/capacitor'

(async () => {
  await AdMobPlus.start()

  const rewarded = new RewardedInterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/6978759866',
  })
  await rewarded.load()
  await rewarded.show()
})()
```

## Events

### `rewardedi.load`

### `rewardedi.loadfail`

### `rewardedi.show`

### `rewardedi.showfail`

### `rewardedi.reward`

User has earned reward.

```js
{
  reward: {
    amount: 1,
    type: "Reward"
  }
}
```

### `rewardedi.dismiss`

### `rewardedi.impression`
