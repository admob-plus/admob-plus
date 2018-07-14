---
id: show-interstitial
title: Showing Interstitial Ad
sidebar_label: Showing Interstitial Ad
---

```js
document.addEventListener('deviceready', () => {
  admob.interstitial.load({
    id: {
      android: 'ca-app-pub-xxx/yyy',  // replace with your ad unit ID for android
      ios: 'ca-app-pub-xxx/zzz',  // replace with your ad unit ID for ios
    },
  }).then(() => admob.interstitial.show())
}, false)
```
