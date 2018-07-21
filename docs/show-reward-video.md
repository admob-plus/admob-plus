---
id: show-reward-video
title: Showing Reward Video Ad
sidebar_label: Reward Video Ad
---

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
