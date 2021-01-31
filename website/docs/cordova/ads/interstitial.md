---
title: Interstitial Ad
sidebar_label: Interstitial
---

Interstitial ads are full-screen ads that cover the interface of their host app. They're typically displayed at natural transition points in the flow of an app, such as between activities or during the pause between levels in a game. When an app shows an interstitial ad, the user has the choice to either tap on the ad and continue to its destination or close it and return to the app.

## Usage

```js
document.addEventListener('deviceready', async () => {
   const interstitial = new admob.InterstitialAd({
      adUnitId: 'ca-app-pub-xxx/yyy',
    })

    await interstitial.load()
    await interstitial.show()
}, false)
```
