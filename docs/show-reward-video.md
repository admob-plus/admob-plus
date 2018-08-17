---
id: show-reward-video
title: Showing Reward Video Ad
sidebar_label: Reward Video Ad
---

Reward video ads are full-screen video ads that users have the option of watching in full in exchange for in-app rewards.

## Usage

```js
document.addEventListener('deviceready', () => {
  admob.rewardVideo.load({
    id: {
      // replace with your ad unit IDs
      android: 'ca-app-pub-xxx/yyy',
      ios: 'ca-app-pub-xxx/zzz',
    },
  }).then(() => admob.rewardVideo.show())
}, false)
```

## Methods

### `admob.rewardVideo.load(config)`

Load reward video ad.

Returns a `Promise` that resolves when ad request is loaded, rejects when ad request failed.

### `admob.rewardVideo.show()`

Displays loaded reward video ad.

Returns a `Promise` that resolves as soon as reward video ad starts to play, rejects when there is a problem calling native code.

## Events

### Load Event

Called when reward video ad is loaded.

```js
document.addEventListener('admob.reward_video.load', () => {
  // handle event
})
```

### Load Fail Event

Called when reward video ad request failed.

```js
document.addEventListener('admob.reward_video.load_fail', () => {
  // handle event
})
```

### Open Event

Called when reward video ad opens a overlay that covers the screen.

```js
document.addEventListener('admob.reward_video.open', () => {
  // handle event
})
```

### Close Event

Called when reward video ad is closed.

```js
document.addEventListener('admob.reward_video.close', () => {
  // handle event
})
```

### Start Event

Called when reward video ad starts to play.

```js
document.addEventListener('admob.reward_video.start', () => {
  // handle event
})
```

### Complete Event

Called when reward video ad completes playing.

```js
document.addEventListener('admob.reward_video.complete', () => {
  // handle event
})
```

### Reward Event

Called when reward video ad has triggered a reward.

```js
document.addEventListener('admob.reward_video.reward', () => {
  // handle event
})
```

### Exit Application Event

Called when reward video ad leaves the application (e.g., to go to the browser).

```js
document.addEventListener('admob.reward_video.exit_app', () => {
  // handle event
})
```
