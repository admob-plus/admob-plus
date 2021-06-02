---
title: App Open Ad
sidebar_label: App Open
---

App open ads are a special ad format intended for publishers wishing to monetize their app load screens. App open ads can be closed by your users at any time. App open ads can be shown when users bring your app to the foreground.

## Usage

```js
document.addEventListener('deviceready', async () => {
  await admob.start()

  const ad = new admob.AppOpenAd({
    adUnitId: 'ca-app-pub-xxx/yyy',
  })

  document.addEventListener(
    'resume',
    async () => {
      if (!await ad.show()) {
        await ad.load()
      })
    },
    false,
  )
}, false)

document.addEventListener('admob.ad.show', async (evt) => {
  if (evt.ad instanceof admob.AppOpenAd) {
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

## Best practices

App open ads help you monetize your app's loading screen, but it's important to keep best practices in mind so that your users enjoy using your app. Make sure to:

- Wait to show your first app open ad until after your users have used your app a few times.
- Show app open ads during times when your users would otherwise be waiting for your app to load.
- If you have a loading screen under the app open ad, and your loading screen completes loading before the ad is dismissed, you may want to dismiss your loading screen in the adDidDismissFullScreenContent method.

## References

- [App Open Ads - Mobile Ads SDK (Android)](https://developers.google.com/admob/android/app-open-ads)
- [App Open Ads - Mobile Ads SDK (iOS)](https://developers.google.com/admob/ios/app-open-ads)
