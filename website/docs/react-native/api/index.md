---
id: "index"
title: "@admob-plus/react-native"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [MaxAdContentRating](enums/MaxAdContentRating.md)

## Classes

- [InterstitialAd](classes/InterstitialAd.md)
- [RewardedAd](classes/RewardedAd.md)
- [RewardedInterstitialAd](classes/RewardedInterstitialAd.md)

## Interfaces

- [AdMobPlusPlugin](interfaces/AdMobPlusPlugin.md)

## References

### default

Renames and re-exports [AdMobPlus](#admobplus)

## Type Aliases

### AdMobConfig

Ƭ **AdMobConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `appMuted?` | `boolean` |
| `appVolume?` | `number` |
| `maxAdContentRating?` | [`MaxAdContentRating`](enums/MaxAdContentRating.md) |
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

• `Const` **AdMobPlus**: [`AdMobPlusPlugin`](interfaces/AdMobPlusPlugin.md)

#### Defined in

index.ts:17

___

### eventEmitter

• `Const` **eventEmitter**: `NativeEventEmitter`

#### Defined in

index.ts:12
