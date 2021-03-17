---
title: Enabling Test Ads
sidebar_label: Test Ads
---

It is important to use test ads during development so that you can click on them without charging Google advertisers. If you click on too many ads without being in test mode, you risk your account being flagged for invalid activity.

## Add your test device programmatically

1. Load your ads-integrated app and make an ad request.
2. Copy your test device ID from console / logcat output to your clipboard.
3. Modify your code to call `admob.configRequest({testDeviceIds})` and pass in a list of your test device IDs.
  ```js
  admob.configRequest({
    testDeviceIds: ['33BE2250B43518CCDA7DE426D04EE231']
  })
  ```
4. Re-run your app. If the ad is a Google ad, you'll see a Test Ad label centered at the top of the ad.

Ads with this Test Ad label are safe to click. Requests, impressions, and clicks on test ads will not show up in your account's reports.

Android emulators / iOS simulators are automatically configured as test devices.

## References

* [Enabling test ads - Mobile Ads SDK (Android)](https://developers.google.com/admob/android/test-ads)
* [Enabling test ads - Mobile Ads SDK (iOS)](https://developers.google.com/admob/ios/test-ads)
