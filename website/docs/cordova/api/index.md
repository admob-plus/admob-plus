---
id: "index"
title: "admob-plus-cordova"
slug: "/cordova/api"
sidebar_label: "Table of contents"
hide_table_of_contents: true
custom_edit_url: null
hide_title: true
---

# admob-plus-cordova

## Table of contents

### Enumerations

- [AdSizeType](enums/adsizetype.md)
- [Events](enums/events.md)
- [MaxAdContentRating](enums/maxadcontentrating.md)
- [NativeActions](enums/nativeactions.md)
- [Platforms](enums/platforms.md)
- [TrackingAuthorizationStatus](enums/trackingauthorizationstatus.md)

### Classes

- [AdMob](classes/admob.md)
- [BannerAd](classes/bannerad.md)
- [InterstitialAd](classes/interstitialad.md)
- [MobileAd](classes/mobilead.md)
- [RewardedAd](classes/rewardedad.md)
- [RewardedInterstitialAd](classes/rewardedinterstitialad.md)

### Interfaces

- [BannerAdOptions](interfaces/banneradoptions.md)
- [RewardedAdOptions](interfaces/rewardedadoptions.md)
- [RewardedInterstitialAdOptions](interfaces/rewardedinterstitialadoptions.md)
- [ServerSideVerificationOptions](interfaces/serversideverificationoptions.md)

## References

### default

Renames and exports: [AdMob](classes/admob.md)

## Type aliases

### MobileAdOptions

Ƭ **MobileAdOptions**: *object*

**`internal`** 

#### Type declaration:

Name | Type |
:------ | :------ |
`adUnitId` | *string* |
`npa`? | *1* |

Defined in: api.ts:4

___

### RequestConfig

Ƭ **RequestConfig**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`maxAdContentRating`? | [*MaxAdContentRating*](enums/maxadcontentrating.md) |
`tagForChildDirectedTreatment`? | *boolean* \| *null* |
`tagForUnderAgeOfConsent`? | *boolean* \| *null* |
`testDeviceIds`? | *string*[] |

Defined in: api.ts:40
