---
id: "index"
title: "@admob-plus/capacitor"
slug: "/capacitor/api/"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [MaxAdContentRating](enums/MaxAdContentRating)
- [TrackingAuthorizationStatus](enums/TrackingAuthorizationStatus)

## Classes

- [BannerAd](classes/BannerAd)
- [InterstitialAd](classes/InterstitialAd)
- [RewardedAd](classes/RewardedAd)
- [RewardedInterstitialAd](classes/RewardedInterstitialAd)

## Interfaces

- [AdMobPlusPlugin](interfaces/AdMobPlusPlugin)
- [BannerAdOptions](interfaces/BannerAdOptions)

## Type aliases

### AdMobConfig

Ƭ **AdMobConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `appMuted?` | `boolean` |
| `appVolume?` | `number` |

#### Defined in

definitions.ts:11

___

### MobileAdOptions

Ƭ **MobileAdOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adUnitId` | `string` |

#### Defined in

definitions.ts:31

___

### RequestConfig

Ƭ **RequestConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxAdContentRating?` | [`MaxAdContentRating`](enums/MaxAdContentRating) |
| `sameAppKey?` | `boolean` |
| `tagForChildDirectedTreatment?` | `boolean` \| ``null`` |
| `tagForUnderAgeOfConsent?` | `boolean` \| ``null`` |
| `testDeviceIds?` | `string`[] |

#### Defined in

definitions.ts:16

## Variables

### AdMobPlus

• **AdMobPlus**: [`AdMobPlusPlugin`](interfaces/AdMobPlusPlugin)

#### Defined in

index.ts:4
