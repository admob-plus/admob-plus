---
id: installation
title: Installation
sidebar_label: Installation
---

Via [Cordova CLI](https://www.npmjs.com/package/cordova):

```sh
cordova plugin add cordova-admob-plus --variable APP_ID_ANDROID=ca-app-pub-xxx~xxx --variable APP_ID_IOS=ca-app-pub-xxx~xxx
```

For Android developer, `com.google.android.gms:play-services-ads:$PLAY_SERVICES_VERSION` is available for configuration, the default is `--PLAY_SERVICES_VERSION=19.4.0`.

When using with other plugins and encountering errors, try the following to fix.

```sh
cordova plugin add cordova-plugin-androidx
cordova plugin add cordova-plugin-androidx-adapter
```

For iOS developer, add `<preference name="UseSwiftLanguageVersion" value="5" />` to `config.xml` for using Swift 5.
* Add to the section `<platform name="ios">`
* After adding this preference, you need to run `cordova platform remove ios` then `cordova platform add ios` to take effect

## With Consent SDK

In order to fulfill GDPR, it is important to ask user's consent before displaying personalized ads.

Install `cordova-plugin-consent` and following [the example code](https://github.com/admob-plus/admob-plus/blob/master/examples/consent/www/js/index.js#L15).

```sh
cordova plugin add cordova-plugin-consent
```

## Using Ionic

Refer to the [ionic guide](ionic.md) to get started.
