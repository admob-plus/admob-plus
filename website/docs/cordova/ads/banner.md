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

## Offset

By setting `offset` to a positive integer, the banner will overlay on the webview with the offset number of pixels relative to its `position`.

```js {4}
new admob.BannerAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  position: 'top',
  offset: 100,
})
```

It is possible to set `offset` to `0` for just overlapping the banner on top of the content.

```js {3}
new admob.BannerAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  offset: 0,  // overlap with content
})
```

## Events

### `admob.banner.load`

An ad is received and is ready for display.

### `admob.banner.loadfail`

An ad request has been failed.

### `admob.banner.impression`

An ad has been displayed.
