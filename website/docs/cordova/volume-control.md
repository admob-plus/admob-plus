---
title: Video Ad Volume Control
sidebar_label: Volume Control
---

The device volume, controlled through volume buttons or OS-level volume slider, determines the volume for device audio output. However, apps can independently adjust volume levels relative to the device volume to tailor the audio experience.

## Set App Volume

Valid ad volume values range from 0.0 (silent) to 1.0 (current device volume).

By default, the app volume is set to 1 (the current device volume).

```js
admob.configure({ appVolume: 0.5 })
```

## Mute App Volume

```js
admob.configure({ appMuted: true })
```
