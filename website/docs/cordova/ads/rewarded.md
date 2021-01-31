---
title: Rewarded Ad
sidebar_label: Rewarded
---

Reward video ads are full-screen video ads that users have the option of watching in full in exchange for in-app rewards.

## Usage

```js
document.addEventListener('deviceready', async () => {
    const rewarded = new admob.RewardedAd({
      adUnitId: 'ca-app-pub-xxx/yyy',
    })

    await rewarded.load()
    await rewarded.show()
}, false)
```
