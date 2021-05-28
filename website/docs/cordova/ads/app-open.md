---
title: App Open Ad
sidebar_label: App Open
---

App open ads are a special ad format intended for publishers wishing to monetize their app load screens. App open ads can be closed by your users at any time. App open ads can be shown when users bring your app to the foreground.

## Usage

```js
document.addEventListener('deviceready', async () => {
  await admob.start()

  new admob.AppOpenAd({
    adUnitId: 'ca-app-pub-xxx/yyy',
  })
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
