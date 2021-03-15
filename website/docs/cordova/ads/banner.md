---
title: Banner Ad
sidebar_label: Banner
---

Banner ads are rectangular image or text ads that occupy a spot within an app's layout. They stay on screen while users are interacting with the app, and can refresh automatically after a certain period of time.

## Usage

```js
let banner

document.addEventListener('deviceready', async () => {
  await admob.start()

  banner = new admob.BannerAd({
    adUnitId: 'ca-app-pub-xxx/yyy',
  })

  await banner.show()
}, false)

document.addEventListener('admob.banner.impression', async () => {
  await banner.hide()
})
```

## Display Position

By default, banner ad is displayed at the `bottom` of screen.

It can be changed with `position` option when creating the ad instance,

```js {3}
new admob.BannerAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  position: 'top',  // display banner at the top of screen
})
```

## Events

### `admob.banner.load`

An ad is received and is ready for display.

### `admob.banner.loadFail`

An ad request has been failed.

### `admob.banner.impression`

An ad has been disaplayed.
