---
title: Rewarded Ad
sidebar_label: Rewarded
---

Rewarded ads are ads that users have the option of interacting with in exchange for in-app rewards.

## Usage

```js
let rewarded

document.addEventListener('deviceready', async () => {
  await admob.start()

  rewarded = new admob.RewardedAd({
    adUnitId: 'ca-app-pub-xxx/yyy',
  })

  await rewarded.load()
  await rewarded.show()
}, false)

document.addEventListener('admob.rewarded.dismiss', async () => {
  // Once a rewarded ad is shown, it cannot be shown again.
  // Starts loading the next rewarded ad as soon as it is dismissed.
  await rewarded.load()
})
```
