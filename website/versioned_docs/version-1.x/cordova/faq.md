---
title: Frequently Asked Questions
sidebar_label: FAQ
---

:::info
Refer to [Troubleshooting FAQ](../troubleshooting) for other general questions.
:::

## General

### What does `{isTrusted: false}` event message means?

`Event.isTrusted` is [a part of the Web API](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted), `false` indicates that the event was created or modified by a script or dispatched via `dispatchEvent()`.

### Why does the "close button" on my interstitial not work?

Sometimes you can't close an interstitial by using the "close button" and this can be caused by several both serverside and clientside issues.

One of the most common reasons for this unwanted behaviour is a setting in your `config.xml` [preferences file](https://cordova.apache.org/docs/en/10.x/config_ref/index.html).

Be sure to have the `KeepRunning` preference set to `true` (default), becausing turning this off (`false`) can freeze an interstitial when viewed.

The reason for this is that those type of ads are layered "above" the main app and can't be "reached" (interacted with) when the app stops running after leaving it's view.

Setting `KeepRunning` to `true` resolves the issue, but can have some negative inpact on battery usage and ofcourse all the existing (java-)scripts keep running in the background when the app is tombstoned.

### Why do old browsers / devices throw an "Uncaught SyntaxError"?

The examples for this plug-in are using a syntax introduced in ES6 ([ECMAScript version 6](https://en.wikipedia.org/wiki/ECMAScript)).

Some of those ES6 features are `async`, `promise` and `await` which makes development a lot easier and result in a more stable product. Almost every browser or device since 2015 [does support ES6](https://caniuse.com/async-functions), but older versions don't.

So if you are targetting devices like `Android 4.x` or even `Android 5.x` a syntax error in the script can occur and [throw messages](https://stackoverflow.com/questions/40492609) in the console like `Uncaught SyntaxError: Unexpected token function (async)`.

If you need to support those older devices, you can savely rewrite the example code to basic Javascript, without any of those asynchronous functions.

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
