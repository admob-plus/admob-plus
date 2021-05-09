---
title: Interstitial Ad
sidebar_label: Interstitial
---

## Usage

```ts
import React from 'react'
import AdMob, { InterstitialAd } from '@admob-plus/react-native'

React.useEffect(async () => {
  await AdMob.start()

  const interstitial = new InterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/1033173712',
  })
  await interstitial.load()
  await interstitial.show()
}, [])
```

## Events

### `interstitial.load`

### `interstitial.loadfail`

### `interstitial.show`

### `interstitial.showfail`

### `interstitial.dismiss`

### `interstitial.impression`
