---
title: Request User Consent
sidebar_label: Request Consent
slug: /cordova/consent
---

## Installation

```shell
cordova plugin add cordova-plugin-consent
```

## Usage

```js
document.addEventListener('deviceready', async () => {
  if (cordova.platformId === 'ios') {
    await admob.requestTrackingAuthorization()
  }

  const consentStatus = await consent.getConsentStatus()
  if (consentStatus === consent.ConsentStatus.Required) {
    await consent.requestInfoUpdate()
  }

  const formStatus = await consent.getFormStatus()
  if (formStatus === consent.FormStatus.Available) {
      const form = await consent.loadForm()
      form.show()
  }
}, false)
```

## References

- [UMP SDK for Android](https://developers.google.com/admob/ump/android/quick-start)
- [UMP SDK for iOS](https://developers.google.com/admob/ump/ios/quick-start)
