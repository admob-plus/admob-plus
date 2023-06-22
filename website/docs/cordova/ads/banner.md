---
title: Banner Ad
sidebar_label: Banner
---

Banner ads are rectangular image or text ads that occupy a spot within an app's layout. They stay on screen while users are interacting with the app, and can refresh automatically after a certain period of time.

## Usage

```js
let banner

document.addEventListener('deviceready', async () => {
  banner = new admob.BannerAd({
    adUnitId: 'ca-app-pub-xxx/yyy',
  })

  banner.on('impression', async (evt) => {
    await banner.hide()
  })

  await banner.show()
}, false)
```

Banner ads is default using the Google-optimized automatic refresh rate, or you may [custom it](https://support.google.com/admob/answer/3245199?hl=en).

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

## Global Settings

### `backgroundColor`

```js
admob.BannerAd.config({ backgroundColor: 'black' })
```

### Margins

```js
admob.BannerAd.config({
  marginTop: 88,
  marginBottom: 34
})
```

## Events

### `load`

An ad is received and is ready for display.

### `loadfail`

An ad request has been failed.

### `impression`

An ad has been displayed.

### `admob.banner.size`

Event that return the ad size, this event is also fired when the ad is resized, for example by rotating the device.

```js
document.addEventListener('admob.banner.size', async (event) => {
  /* event:
  {
    adId: int,
    size: {
      width: int,
      height: int,
      widthInPixels: int,
      heightInPixels: int
    }
  }*/
})
```
