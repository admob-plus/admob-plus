---
title: Frequently Asked Questions
sidebar_label: FAQ
---

## General

### Why are ads not showing?

Beside programming error, a common report is [no fill error](https://developers.google.com/android/reference/com/google/android/gms/ads/AdRequest#ERROR_CODE_NO_FILL),
which many users think it is the problem of the library.

It is common that for the first time requesting newly created ad unit, there is a delay to have available ads start serving.

Also, some country or targeted deivce could have less ads to serve due to publisher / user settings.

### Why Google report shows less impressions than the number of Ad request calls?

First of all, make sure your Ad request and display code are correct.

The Ad server may not have ads to serve for every request, which returns `NO_FILL` response.

It is receommended to track the impressions via event API instead of just the API calls, as it is not necessary result in showing Ads.

## Android

### How to use with `cordova-android-play-services-gradle-release`?

`cordova-android-play-services-gradle-release` uses [an old version of SDK](https://github.com/dpa99c/cordova-android-play-services-gradle-release/blob/master/plugin.xml#L21) by default.

Edit `pacakge.json` to fix:
```json
{
  "cordova": {
    "plugins": {
      "cordova-android-play-services-gradle-release": {
        "play-services-ads": "19.7.0"
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
