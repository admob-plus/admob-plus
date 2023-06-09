---
title: Upgrade Guide
sidebar_label: Upgrade
---

## From V1 to V2

### Kotlin Required

Kotlin support is required for V2, make sure your project is enabled it.

```xml title="config.xml" {2}
<platform name="android">
    <preference name="GradlePluginKotlinEnabled" value="true" />
</platform>
```

### Ad `id` defaults to `adUnitId`

Instead of auto-generated `id` for the ad instance, it is now default to `adUnitId`.

The change is introduced to avoid new instances are being created after the webview is reloaded.

The `id` property is used to reference the same instance in the native code, so it should be the same between page reload.

You should set the `id` to a different value if you are displaying multiple ads with the same `adUnitId`.

### Remove ad-type specific events

The following events are removed.

- `admob.banner.load`
- `admob.banner.loadfail`
- `admob.banner.impression`
- `admob.interstitial.load`
- `admob.interstitial.loadfail`
- `admob.interstitial.show`
- `admob.interstitial.dismiss`
- `admob.rewarded.load`
- `admob.rewarded.loadfail`
- `admob.rewarded.reward`
- `admob.rewarded.show`
- `admob.rewarded.dismiss`

They are replaced with `admob.ad.*` events.

It is recommend to use `on` method provided by the ad class,

```js
banner = new admob.BannerAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
})

banner.on('impression', async (evt) => {
  await banner.hide()
})
```

To listen the event via `document.addEventListener`,

```js
document.addEventListener('admob.ad.load', async (evt) => {
  if (evt.ad instanceof admob.NativeAd) {
    // handle event here
  }
})
```
