---
id: "index"
title: "community-admob-plus-cordova"
slug: "/cordova/api"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [AdSizeType](enums/adsizetype.md)
- [Events](enums/events.md)
- [MaxAdContentRating](enums/maxadcontentrating.md)
- [NativeActions](enums/nativeactions.md)
- [Platforms](enums/platforms.md)
- [TrackingAuthorizationStatus](enums/trackingauthorizationstatus.md)

## Classes

- [AdMob](classes/admob.md)
- [AppOpenAd](classes/appopenad.md)
- [BannerAd](classes/bannerad.md)
- [InterstitialAd](classes/interstitialad.md)
- [MobileAd](classes/mobilead.md)
- [NativeAd](classes/nativead.md)
- [RewardedAd](classes/rewardedad.md)
- [RewardedInterstitialAd](classes/rewardedinterstitialad.md)

## Interfaces

- [BannerAdOptions](interfaces/banneradoptions.md)
- [RewardedAdOptions](interfaces/rewardedadoptions.md)
- [RewardedInterstitialAdOptions](interfaces/rewardedinterstitialadoptions.md)
- [ServerSideVerificationOptions](interfaces/serversideverificationoptions.md)

## References

### default

Renames and exports: [AdMob](classes/admob.md)

## Type aliases

### MobileAdOptions

Ƭ **MobileAdOptions**: `Object`

**`internal`**

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adUnitId` | `string` |
| `id?` | `number` |
| `npa?` | ``"1"`` |

#### Defined in

api.ts:4

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

api.ts:46

## Functions

### execAsync

▸ `Const` **execAsync**(`action`, `args?`): `Promise`<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [NativeActions](enums/nativeactions.md) |
| `args?` | `any`[] |

#### Returns

`Promise`<unknown\>

#### Defined in

generated.ts:76
