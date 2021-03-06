---
id: "index"
title: "admob-plus-cordova"
slug: "/cordova/api"
sidebar_label: "Table of contents"
custom_edit_url: null
hide_title: true
---

# admob-plus-cordova

## Table of contents

### Enumerations

- [AdSizeType](enums/adsizetype.md)
- [ChildDirectedTreatmentTag](enums/childdirectedtreatmenttag.md)
- [Events](enums/events.md)
- [MaxAdContentRating](enums/maxadcontentrating.md)
- [Platforms](enums/platforms.md)
- [TrackingAuthorizationStatus](enums/trackingauthorizationstatus.md)
- [UnderAgeOfConsentTag](enums/underageofconsenttag.md)

### Classes

- [BannerAd](classes/bannerad.md)
- [InterstitialAd](classes/interstitialad.md)
- [MobileAd](classes/mobilead.md)
- [RewardedAd](classes/rewardedad.md)

## Type aliases

### MobileAdOptions

Ƭ **MobileAdOptions**: *object*

**`internal`** 

#### Type declaration:

Name | Type |
:------ | :------ |
`adUnitId` | *string* |

Defined in: api.ts:4

___

### RequestConfig

Ƭ **RequestConfig**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`maxAdContentRating`? | [*MaxAdContentRating*](enums/maxadcontentrating.md) |
`tagForChildDirectedTreatment`? | [*ChildDirectedTreatmentTag*](enums/childdirectedtreatmenttag.md) |
`tagForUnderAgeOfConsent`? | [*UnderAgeOfConsentTag*](enums/underageofconsenttag.md) |
`testDeviceIds`? | *string*[] |

Defined in: api.ts:41

## Variables

### default

• `Const` **default**: *AdMob*

Defined in: admob.ts:57
