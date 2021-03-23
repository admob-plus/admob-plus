---
title: Frequently Asked Questions
sidebar_label: FAQ
---

## General

### Why are ads not showing?

Beside programming error, a common report is [no fill error](https://developers.google.com/android/reference/com/google/android/gms/ads/AdRequest#ERROR_CODE_NO_FILL) ([explanation post](https://support.google.com/admob/thread/3494603)),
which many users think it is the problem of the library.

It is common that for the first time requesting newly created ad unit, there is a delay to have available ads start serving.

Also, some country or targeted deivce could have less ads to serve due to publisher / user settings.

### Why Google report shows less impressions than the number of Ad request calls?

First of all, make sure your Ad request and display code are correct.

The Ad server may not have ads to serve for every request, which returns `NO_FILL` response.

It is receommended to track the impressions via event API instead of just the API calls, as it is not necessary result in showing Ads.

### What does `{isTrusted: false}` event message means?

`Event.isTrusted` is [a part of the Web API](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted), `false` indicates that the event was created or modified by a script or dispatched via `dispatchEvent()`.

### How to handle "Add or update app-ads.txt" in AdMob console?

It does not relate to the plugin, see ["Set up an app-ads.txt file for your app"](https://support.google.com/admob/answer/9363762?hl=en).

### Why does the "close button" on my interstitial not work?

Sometimes you can't close a interstitial by using the "close button" and this can be caused by several serverside and clientside issues.

One of the most common reasons for this unwanted behaviour is a settings in your `config.xml` [preferences file](https://cordova.apache.org/docs/en/10.x/config_ref/index.html).

Be sure to have the `KeepRunning` preference set to `true` (default), becausing turning this off, will freeze any interstitial.

The reason for this is that those ads are layered "above" the app and can't be reached when the app stops running after leaving it.

Setting `KeepRunning` to `false` resolves the issue, but can have some negative inpact on battery usage and ofcourse all the (java-)scripts keep running in the background when the app is tombstoned.

## Android

### How to use with `cordova-android-play-services-gradle-release`?

`cordova-android-play-services-gradle-release` uses [an old version of SDK](https://github.com/dpa99c/cordova-android-play-services-gradle-release/blob/master/plugin.xml#L21) by default.

Edit `pacakge.json` to fix:
```json
{
  "cordova": {
    "plugins": {
      "cordova-android-play-services-gradle-release": {
        "PLAY-SERVICES-ADS": "19.8.0"
      }
    }
  }
}
```

## iOS

### Why `.ipa` file is increased so much after including the plugin?

Google AdMob requires [Google Mobile Ads SDK](https://developers.google.com/admob/ios/download) for iOS, which will contribute ~60MB to the app size.

### How to fix `'sendSubviewToBack' has been renamed to 'sendSubview(toBack:)'` error?

This is probally caused by using outdated version of Swift to build the project.

Please ensusre `<preference name="SwiftVersion" value="5.3" />` is added to the section `<platform name="ios">` in `config.xml`, then clean build the project.

### Do I need to enable [SKAdNetwork](https://developers.google.com/admob/ios/ios14#skadnetwork) manually?

No, [`SKAdNetworkItems`](https://github.com/admob-plus/admob-plus/blob/master/packages/cordova/plugin.xml#L87) will be set by the plugin, which located in `platforms/ios/<PROJECT>/<PROJECT>-Info.plist`.

### How to fix `'GoogleMobileAds/GoogleMobileAds.h' file not found` error?

This is likely caused by CocoaPods is not installing the dependencies correctly.

Run `pod repo update` and `cd platforms/ios && pod install --repo-update` to ensure latest SDK is ready.

A clean build / remove then re-add the plugin may be necessary.

### Shoud I use Apple’s ATT prompt?

As part of iOS 14, you may choose to employ the new [AppTrackingTransparency (ATT) framework](https://developer.apple.com/documentation/apptrackingtransparency) by calling `admob.requestTrackingAuthorization()`.

If your app is not using ATT, you need to state that during submission or your app [may be rejected](https://github.com/admob-plus/admob-plus/issues/241).

> If your app integrates AppTrackingTransparency, please indicate where in your app we can find the AppTrackingTransparency permission request.
>
> If your app does not integrate AppTrackingTransparency, please indicate this information in the Review Notes section for each version of your app in App Store Connect when submitting for review.
