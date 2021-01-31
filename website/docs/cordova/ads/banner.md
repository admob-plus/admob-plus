---
title: Banner Ad
sidebar_label: Banner
---

Banner ads are rectangular image or text ads that occupy a spot within an app's layout. They stay on screen while users are interacting with the app, and can refresh automatically after a certain period of time.

## Usage

```js
document.addEventListener('deviceready', async () => {
  const banner = new admob.BannerAd({
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
  })

  await banner.load()
  await banner.show()

  await banner.hide()
}, false)
```
