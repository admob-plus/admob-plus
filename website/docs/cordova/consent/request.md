---
title: Request User Consent
sidebar_label: Request Consent
slug: /cordova/consent
---

## Installation

```shell
cordova plugin add cordova-plugin-consent
```

## Prerequisites

You must have a [Funding Choices](https://support.google.com/fundingchoices/answer/9180084) account linked to your AdMob account.

To create a Funding Choices account, go to **Privacy & messaging** in the AdMob UI and select **Go to Funding Choices**. The Funding Choices account is then created automatically in the background.

## Usage

```js
document.addEventListener('deviceready', async () => {
  if (cordova.platformId === 'ios') {
    const status = await consent.trackingAuthorizationStatus()
    /*
      trackingAuthorizationStatus:
      0 = notDetermined
      1 = restricted
      2 = denied
      3 = authorized
    */
    const statusNew = await consent.requestTrackingAuthorization()
  }

  const consentStatus = await consent.getConsentStatus()
  if (consentStatus === consent.ConsentStatus.Required) {
    await consent.requestInfoUpdate()
  }

  await consent.loadAndShowIfRequired()

  if (await consent.canRequestAds()) {
    // request ads
  }
}, false)
```

## Forward consent

If a user has consented to receive only non-personalized ads, pass `npa="1"` when creating the ad, e.g.

```js {3}
new admob.BannerAd({
  adUnitId: 'ca-app-pub-xxx/yyy',
  npa: '1',
})
```

The `npa` parameter is applicable to all ad formats, e.g. [`BannerAd`](./api/classes/bannerad), [`InterstitialAd`](./api/classes/interstitialad), [`RewardedAd`](./api/classes/rewardedad), [`RewardedInterstitialAd`](./api/classes/rewardedinterstitialad).

## References

- [TrackingAuthorizationStatus](./api/enums/TrackingAuthorizationStatus.md)
- [UMP SDK for Android](https://developers.google.com/admob/ump/android/quick-start)
- [UMP SDK for iOS](https://developers.google.com/admob/ump/ios/quick-start)
- [AppTrackingTransparency Framework](https://developer.apple.com/documentation/apptrackingtransparency)
