---
title: Rewarded Ad
sidebar_label: Rewarded
---

## Usage

```ts
import { AdMobPlus, RewardedAd } from '@admob-plus/capacitor'

(async () => {
  const rewarded = new RewardedAd({
    adUnitId: 'ca-app-pub-3940256099942544/5224354917',
  })
  await rewarded.load()
  await rewarded.show()
})()
```

## Events

### `rewarded.load`

### `rewarded.loadfail`

### `rewarded.show`

### `rewarded.showfail`

### `rewarded.reward`

User has earned reward.

```js
{
  reward: {
    amount: 10,
    type: "coins"
  }
}
```

### `rewarded.dismiss`

### `rewarded.impression`
