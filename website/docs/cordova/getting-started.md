---
title: Getting Started
slug: /cordova
---

## Installation

Go to the [AdMob portal](https://www.google.com/admob/) and add your app (if you haven't done so already).

So you have the Application ID to follow the [installation guide](./cordova/installation) to add the plugin.

## Initialize AdMob SDK

The plugin does not initialize AdMob SDK automatically.
This allows [requesting user consent](./cordova/consent) before contacting any AdMob services.

Therefore, `admob.start()` must be called before loading ads.

Note that `admob` is undeifned until [`deviceready`](https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready) event is fired.

```js
document.addEventListener('deviceready', async () => {
  await admob.start()

  // Load ads here
}, false)
```

## Create Ad Unit

Go to the [AdMob portal](https://www.google.com/admob/) and create a new ad unit for your app.

So you have the Ad Unit ID.

## Display Ads

Following the guide of different supported ad types to display ads,

* [Banner Ad](./cordova/ads/banner)
* [Interstitial Ad](./cordova/ads/interstitial)
* [Rewarded Ad](./cordova/ads/rewarded)
* [Rewarded Interstitial Ad](./cordova/ads/rewarded-interstitial)

`ca-app-pub-xxx/yyy` should be replaced with your Ad Unit ID.
