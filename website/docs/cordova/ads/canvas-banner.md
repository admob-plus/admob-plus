---
title: Canvas Banner Ad
sidebar_label: Canvas Banner
---

> **WARNING**: Be careful, `CanvasBannerAd` draws the `AdView` of an Banner ad on a canvas, the original `AdView` stays below cordova WebView and the clicks on the canvas are captured and simulated in the AdView, these two features could violate **AdMob Policy**, use this at your own risk.

Banner ads are rectangular image or text ads that occupy a spot within an app's layout. They stay on screen while users are interacting with the app, and can refresh automatically after a certain period of time.

The difference between `CanvasBannerAd` with `BannerAd` is that this it draws the `AdView` of a Banner on a canvas, having a rendering of the `AdView` inside cordova WebView.

The `CanvasBannerAd` is only available in Android. 

## Usage

The Banner created will be the current size of the canvas, make sure it is a normal size, and do not use `padding` or `border` on the canvas, this causes the canvas size to be measured incorrectly, you can add the canvas inside a `div` and apply the styles to it.

It is recommended to disable video ads to avoid potential performance issues.

```js
let canvasBanner

document.addEventListener('deviceready', async () => {
  if(window.cordova.platformId == 'android') {
    await admob.start()

    canvasBanner = new admob.CanvasBannerAd({
      adUnitId: 'ca-app-pub-xxx/yyy',
      canvas: document.querySelector('canvas'),
    })

    await canvasBanner.show()
  }
}, false)

```

## Auto Destroy

By default, the CanvasBannerAd is destroyed if the canvas is removed from the dom.

If you want to keep the ad (for example to use in another canvas), you can use `autoDestroy`.

```js {3}
var canvasBanner = new admob.CanvasBannerAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  canvas: document.querySelector('canvas'),
  autoDestroy: false,
})
```
You can destroy the `Banner` as follows.

```js {3}
canvasBanner.destroy();
```

## Background Color

By default, the color of AdView is Black, you can change this passing the property `backgroundColor` on create the ad.

The background color is only shown while the ad is loading, depending on the size of the ad, it is also applied on the border (1px black line).

```js {3}
var canvasBanner = new admob.CanvasBannerAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  canvas: document.querySelector('canvas'),
  backgroundColor: '#ffffff',
})
```

## Change Banner Canvas

You can change the ad canvas to another, it is preferable to use this before creating a new ad for each canvas, this avoid having many AdViews at the same time.

If the canvas has a different size, the `CanvasBannerAd` is automatically adapted. 

```js {3}
var canvasBanner = new admob.CanvasBannerAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  canvas: document.querySelector('canvas'),
  autoDestroy: false,
  cleanPrevCanvas: true,
})

setTimeout(() => {
  let cleanPrevCanvas = true; // The old canvas is cleaned, by default false
  canvasBanner.changeCanvas(document.querySelector('#another-canvas'), cleanPrevCanvas)
}, 5000)
```

## Global Settings

### `canvasDrawInterval`

Interval time in which the `AdView` will be draw on the canvas.

```js
admob.BannerAd.config({ canvasDrawInterval: 500 }) // In miliseconds, Default 100
```

### `preciseDrawInterval`

The setTimeout is executed at the end of the function, adding the time it takes to complete it, with preciseDrawInterval the elapsed time will be subtracted.

```js
admob.BannerAd.config({ preciseDrawInterval: true }) // Default false
```

### `requestAnimationFrameDraw`

This uses the `requestAnimationFrame` to update canvas, this disable `canvasDrawInterval` and `preciseDrawInterval`, this is recommended if you plan to use video banner ads.

```js
admob.BannerAd.config({ requestAnimationFrameDraw: true }) // Default false
```


## Events

### `admob.canvasbanner.load`

An ad is received and is ready for display.

### `admob.canvasbanner.loadfail`

An ad request has been failed.

### `admob.canvasbanner.impression`

An ad has been displayed.

### `admob.canvasbanner.size`

Event that return the ad size, this event is also fired when the ad is resized, for example by rotating the device.

```js
document.addEventListener('admob.canvasbanner.size', async (event) => {
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