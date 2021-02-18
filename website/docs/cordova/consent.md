---
title: Request User Consent
sidebar_label: User Consent
---

## Installation

```shell
cordova plugin add cordova-plugin-consent
```

## Usage

```js
document.addEventListener('deviceready', async () => {
  if (cordova.platformId === 'ios') {
    await consent.requestTrackingAuthorization()
  }
  await consent.requestInfoUpdate()

  if (await consent.isFormAvailable()) {
      const form = await consent.loadForm()
      form.show()
  }
}, false)
```
