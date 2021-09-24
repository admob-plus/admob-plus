---
id: "index"
title: "@admob-plus/react-native"
slug: "/react-native/api/"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [MaxAdContentRating](enums/MaxAdContentRating)

## Classes

- [InterstitialAd](classes/InterstitialAd)
- [RewardedAd](classes/RewardedAd)
- [RewardedInterstitialAd](classes/RewardedInterstitialAd)

## Interfaces

- [AdMobPlusPlugin](interfaces/AdMobPlusPlugin)

## References

### default

• **default**: `Object`

## Type aliases

### AdMobConfig

Ƭ **AdMobConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `appMuted?` | `boolean` |
| `appVolume?` | `number` |
| `maxAdContentRating?` | [`MaxAdContentRating`](enums/MaxAdContentRating) |
| `sameAppKey?` | `boolean` |
| `tagForChildDirectedTreatment?` | `boolean` \| ``null`` |
| `tagForUnderAgeOfConsent?` | `boolean` \| ``null`` |
| `testDeviceIds?` | `string`[] |

#### Defined in

definitions.ts:10

___

### MobileAdOptions

Ƭ **MobileAdOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adUnitId` | `string` |

#### Defined in

definitions.ts:20

## Variables

### AdMobPlus

• **AdMobPlus**: [`AdMobPlusPlugin`](interfaces/AdMobPlusPlugin)

#### Defined in

index.ts:17

___

### eventEmitter

• **eventEmitter**: `NativeEventEmitter`

#### Defined in

index.ts:12
