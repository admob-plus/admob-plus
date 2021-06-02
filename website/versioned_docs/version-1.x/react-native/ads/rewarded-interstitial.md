---
title: Rewarded Interstitial Ad
sidebar_label: Rewarded Interstitial
---

## Usage

```ts
import React from 'react'
import AdMob, { RewardedInterstitialAd } from '@admob-plus/react-native'

React.useEffect((asyn () => {
  await AdMobPlus.start()

  const rewarded = new RewardedInterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/6978759866',
  })
  await rewarded.load()
  await rewarded.show()
}, [])
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
