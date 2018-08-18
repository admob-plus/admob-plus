---
id: show-interstitial
title: Showing Interstitial Ad
sidebar_label: Interstitial Ad
---

Interstitial ads are full-screen ads that cover the interface of their host app. They're typically displayed at natural transition points in the flow of an app, such as between activities or during the pause between levels in a game. When an app shows an interstitial ad, the user has the choice to either tap on the ad and continue to its destination or close it and return to the app.

## Usage

```js
document.addEventListener('deviceready', () => {
  admob.interstitial.load({
    id: {
      // replace with your ad unit IDs
      android: 'ca-app-pub-xxx/yyy',
      ios: 'ca-app-pub-xxx/zzz',
    },
  }).then(() => admob.interstitial.show())
}, false)
```

## Methods

### `admob.interstitial.load(config)`

Load interstitial ad.

Returns a `Promise` that resolves when ad request is loaded, rejects when ad request failed.

### `admob.interstitial.show()`

Displays loaded interstitial ad.

Returns a `Promise` that resolves as soon as interstitial ad is shown, rejects when there is a problem calling native code.

## Events

### Load Event

Called when interstitial ad is loaded.

```js
document.addEventListener('admob.interstitial.load', () => {
  // handle event
})
```

### Load Fail Event

Called when interstitial ad request failed.

```js
document.addEventListener('admob.interstitial.load_fail', () => {
  // handle event
})
```

### Open Event

Called when interstitial ad opens a overlay that covers the screen.

```js
document.addEventListener('admob.interstitial.open', () => {
  // handle event
})
```

### Close Event

Called when interstitial ad is closed.

```js
document.addEventListener('admob.interstitial.close', () => {
  // handle event
})
```

### Exit Application Event

Called when interstitial ad leaves the application (e.g., to go to the browser).

```js
document.addEventListener('admob.interstitial.exit_app', () => {
  // handle event
})
```
