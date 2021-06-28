---
title: Rewarded Interstitial Ad
sidebar_label: Rewarded Interstitial
---

Rewarded interstitial is a type of incentivized ad format that allows you offer rewards for ads that appear automatically during natural app transitions. Unlike rewarded ads, users aren't required to opt-in to view a rewarded interstitial.

## Usage

```js
let rewarded

document.addEventListener('deviceready', async () => {
  await admob.start()

  rewarded = new admob.RewardedInterstitialAd({
    adUnitId: 'ca-app-pub-xxx/yyy',
  })

  rewarded.on('load', (evt) => {
    // evt.ad
  })

  await rewarded.load()
  await rewarded.show()
}, false)

document.addEventListener('admob.rewardedi.dismiss', async () => {
  await rewarded.load()
})
```

## Events

### `admob.rewardedi.load`

### `admob.rewardedi.loadfail`

### `admob.rewardedi.show`

### `admob.rewardedi.showfail`

### `admob.rewardedi.reward`

User has earned reward.

```js
{
  reward: {
    amount: 1,
    type: "Reward"
  }
}
```

### `admob.rewardedi.dismiss`

### `admob.rewardedi.impression`

## Server-side Verification

- [Rewarded Ads Server-side Verification](../rewarded-ads-ssv.md)
