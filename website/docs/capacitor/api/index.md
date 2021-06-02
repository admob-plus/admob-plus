---
id: "index"
title: "@admob-plus/capacitor"
slug: "/capacitor/api"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [MaxAdContentRating](enums/maxadcontentrating.md)
- [TrackingAuthorizationStatus](enums/trackingauthorizationstatus.md)

## Classes

- [BannerAd](classes/bannerad.md)
- [InterstitialAd](classes/interstitialad.md)
- [RewardedAd](classes/rewardedad.md)
- [RewardedInterstitialAd](classes/rewardedinterstitialad.md)

## Interfaces

- [AdMobPlusPlugin](interfaces/admobplusplugin.md)
- [BannerAdOptions](interfaces/banneradoptions.md)

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

### RequestConfig

Ƭ **RequestConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxAdContentRating?` | [MaxAdContentRating](enums/maxadcontentrating.md) |
| `tagForChildDirectedTreatment?` | `boolean` \| ``null`` |
| `tagForUnderAgeOfConsent?` | `boolean` \| ``null`` |
| `testDeviceIds?` | `string`[] |

#### Defined in

definitions.ts:16

## Variables

### AdMobPlus

• `Const` **AdMobPlus**: [AdMobPlusPlugin](interfaces/admobplusplugin.md)

#### Defined in

index.ts:4
