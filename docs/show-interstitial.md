---
id: show-interstitial
title: Showing Interstitial Ad
sidebar_label: Showing Interstitial Ad
---

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
