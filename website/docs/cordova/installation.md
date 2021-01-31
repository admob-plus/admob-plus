---
id: installation
title: Installation
sidebar_label: Installation
slug: /
---

Via [Cordova CLI](https://www.npmjs.com/package/cordova):

```sh
cordova plugin add admob-plus-cordova --variable APP_ID_ANDROID=ca-app-pub-xxx~xxx --variable APP_ID_IOS=ca-app-pub-xxx~xxx
```

For Android developer, `com.google.android.gms:play-services-ads:$PLAY_SERVICES_VERSION` is available for configuration, the default is `--PLAY_SERVICES_VERSION=19.7.0`.

When using with other plugins and encountering errors, try the following to fix.

* Add `<preference name="AndroidXEnabled" value="true" />` to `config.xml`.
* Or add the following plugins for `Cordova<9`,
```sh
cordova plugin add cordova-plugin-androidx
cordova plugin add cordova-plugin-androidx-adapter
```

For iOS developer,
* Add `<preference name="SwiftVersion" value="5.3" />` to the section `<platform name="ios">` in `config.xml`
* After adding this preference, you need to run `cordova platform remove ios` then `cordova platform add ios` to take effect
* Run `pod repo update` or `cd platforms/ios && pod install --repo-update` to ensure latest SDK is ready
