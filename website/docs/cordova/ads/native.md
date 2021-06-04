---
title: Native Ad
sidebar_label: Native
---

Native ads are ad assets that are presented to users via UI components that are native to the platform.

In addtion to installing `admob-plus-cordova`, you will need to install `admob-plus-cordova-native` for displaying native ads.

## Installation

```sh-session
cordova plugin add admob-plus-cordova-native --save
```

## Usage

```js
document.addEventListener('deviceready', async () => {
  const ad = admob.NativeAd({
    adUnitId: 'ca-app-pub-xxx/yyy',
  })
  await ad.load()
  await ad.show({
    x: 0,
    y: 50,
    width: window.screen.width,
    height: 300,
  })

  setTimeout(() => {
    ad.hide()
  }, 5000)
})

document.addEventListener('admob.ad.load', async (evt) => {
  if (evt.ad instanceof admob.NativeAd) {
    // handle event here
  }
})
```

## Events

### `admob.ad.load`

### `admob.ad.loadfail`

### `admob.ad.show`

### `admob.ad.showfail`

### `admob.ad.dismiss`

### `admob.ad.impression`

## References

- [Native Ads - Mobile Ads SDK (Android)](https://developers.google.com/admob/android/native/start)
- [Native Ads - Mobile Ads SDK (iOS)](https://developers.google.com/admob/ios/native/start)
