---
id: "index"
title: "@admob-plus/capacitor"
slug: "/capacitor/api/"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [MaxAdContentRating](enums/MaxAdContentRating.md)
- [TrackingAuthorizationStatus](enums/TrackingAuthorizationStatus.md)

## Classes

- [BannerAd](classes/BannerAd.md)
- [InterstitialAd](classes/InterstitialAd.md)
- [RewardedAd](classes/RewardedAd.md)
- [RewardedInterstitialAd](classes/RewardedInterstitialAd.md)

## Interfaces

- [AdMobPlusPlugin](interfaces/AdMobPlusPlugin.md)
- [BannerAdOptions](interfaces/BannerAdOptions.md)

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
| `maxAdContentRating?` | [`MaxAdContentRating`](enums/MaxAdContentRating.md) |
| `sameAppKey?` | `boolean` |
| `tagForChildDirectedTreatment?` | `boolean` \| ``null`` |
| `tagForUnderAgeOfConsent?` | `boolean` \| ``null`` |
| `testDeviceIds?` | `string`[] |

#### Defined in

definitions.ts:16

## Variables

### AdMobPlus

• `Const` **AdMobPlus**: [`AdMobPlusPlugin`](interfaces/AdMobPlusPlugin.md)

#### Defined in

index.ts:4
