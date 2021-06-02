---
title: Rewarded Ads Server-side Verification
---

Rewarded video SSV (server-side verification) callbacks provide an extra layer of protection against spoofing of client-side callbacks to reward users.

For the server-side implementation, please refer to the official guide for [Android](https://developers.google.com/admob/android/rewarded-video-ssv) and [iOS](https://developers.google.com/admob/ios/rewarded-video-ssv).

To set server-side verification options for [`RewardedAd`](./ads/rewarded),

```js {3-6}
new admob.RewardedAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  serverSideVerification: {
    customData: "SAMPLE_CUSTOM_DATA_STRING",
    userId: "1234567",
  }
})
```

To set server-side verification options for [`RewardedInterstitialAd`](./ads/rewarded-interstitial),

```js {3-6}
new admob.RewardedInterstitialAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  serverSideVerification: {
    customData: "SAMPLE_CUSTOM_DATA_STRING",
    userId: "1234567",
  }
})
```
