---
id: installation
title: Installation
sidebar_label: Installation
---

Via [Cordova CLI](https://www.npmjs.com/package/cordova):

```sh
cordova plugin add cordova-admob-plus --variable APP_ID_ANDROID=ca-app-pub-xxx~xxx --variable APP_ID_IOS=ca-app-pub-xxx~xxx
```

For Android developer, `com.google.android.gms:play-services-ads:$PLAY_SERVICES_VERSION` is available for configuration, the default is `--PLAY_SERVICES_VERSION=18.3.0`.

For iOS developer, add `<preference name="UseSwiftLanguageVersion" value="5" />` to `config.xml` for using Swift 5.


## Using Ionic

Refer to the [ionic guide](ionic.md) to get started.
