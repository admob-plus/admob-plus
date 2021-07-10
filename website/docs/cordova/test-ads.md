---
title: Enabling Test Ads
sidebar_label: Test Ads
---

It is important to use test ads during development so that you can click on them without charging Google advertisers. If you click on too many ads without being in test mode, you risk your account being flagged for invalid activity.

## Use the Google provided demo ad units

The quickest way to enable testing is to use Google-provided test ad units.

These ad units are **not** associated with your AdMob account, so there's no risk of your account generating invalid traffic when using these ad units.

|       Ad Format       |       Demo Ad Unit ID (Android)        |         Demo Ad Unit ID (iOS)          |
| --------------------- | -------------------------------------- | -------------------------------------- |
| App Open              | ca-app-pub-3940256099942544/3419835294 | ca-app-pub-3940256099942544/5662855259 |
| Banner                | ca-app-pub-3940256099942544/6300978111 | ca-app-pub-3940256099942544/2934735716 |
| Interstitial          | ca-app-pub-3940256099942544/1033173712 | ca-app-pub-3940256099942544/4411468910 |
| Interstitial Video    | ca-app-pub-3940256099942544/8691691433 | ca-app-pub-3940256099942544/5135589807 |
| Rewarded              | ca-app-pub-3940256099942544/5224354917 | ca-app-pub-3940256099942544/1712485313 |
| Rewarded Interstitial | ca-app-pub-3940256099942544/5354046379 | ca-app-pub-3940256099942544/6978759866 |
| Native Advanced       | ca-app-pub-3940256099942544/2247696110 | ca-app-pub-3940256099942544/3986624511 |
| Native Advanced Video | ca-app-pub-3940256099942544/1044960115 | ca-app-pub-3940256099942544/2521693316 |

_\*) Please note that not all formats are (yet) supported by this plug-in and don't forget to use your own ID when in production._

:::tip
Run `npx admob-plus test-ids` will print the above table.
:::

## Add your test device programmatically

1. Load your ads-integrated app and make an ad request.
2. Copy your test device ID from console / logcat output to your clipboard.
3. Modify your code to call `admob.configure({testDeviceIds})` and pass in a list of your test device IDs.

```js
admob.configure({
  testDeviceIds: ['33BE2250B43518CCDA7DE426D04EE231'],
})
```

4. Re-run your app. If the ad is a Google ad, you'll see a Test Ad label centered at the top of the ad.

Ads with this Test Ad label are safe to click. Requests, impressions, and clicks on test ads will not show up in your account's reports.

Android emulators / iOS simulators are automatically configured as test devices.

## References

- [Enabling test ads - Mobile Ads SDK (Android)](https://developers.google.com/admob/android/test-ads)
- [Enabling test ads - Mobile Ads SDK (iOS)](https://developers.google.com/admob/ios/test-ads)
