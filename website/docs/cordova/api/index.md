---
id: "index"
title: "admob-plus-cordova"
slug: "/cordova/api/"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [AdSizeType](enums/AdSizeType)
- [Events](enums/Events)
- [MaxAdContentRating](enums/MaxAdContentRating)
- [NativeActions](enums/NativeActions)
- [Platforms](enums/Platforms)
- [TrackingAuthorizationStatus](enums/TrackingAuthorizationStatus)

## Classes

- [AdMob](classes/AdMob)
- [AppOpenAd](classes/AppOpenAd)
- [BannerAd](classes/BannerAd)
- [InterstitialAd](classes/InterstitialAd)
- [MobileAd](classes/MobileAd)
- [NativeAd](classes/NativeAd)
- [RewardedAd](classes/RewardedAd)
- [RewardedInterstitialAd](classes/RewardedInterstitialAd)

## Interfaces

- [BannerAdOptions](interfaces/BannerAdOptions)
- [RewardedAdOptions](interfaces/RewardedAdOptions)
- [RewardedInterstitialAdOptions](interfaces/RewardedInterstitialAdOptions)
- [ServerSideVerificationOptions](interfaces/ServerSideVerificationOptions)

## References

### default

• **default**: `Object`

## Type aliases

### AdMobConfig

Ƭ **AdMobConfig**: { `appMuted?`: `boolean` ; `appVolume?`: `number`  } & [`RequestConfig`](#requestconfig)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:153

___

### MobileAdOptions

Ƭ **MobileAdOptions**: `Object`

**`internal`**

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adUnitId` | `string` |
| `contentUrl?` | `string` |
| `id?` | `number` |
| `keywords?` | `string`[] |
| `npa?` | ``"1"`` |

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:6

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

code/github/admob-plus/packages/cordova/ts/api.ts:133

## Functions

### execAsync

▸ `Const` **execAsync**(`action`, `args?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`NativeActions`](enums/NativeActions) |
| `args?` | `any`[] |

#### Returns

`Promise`<`unknown`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/generated.ts:79

___

### start

▸ **start**(): `Promise`<`Object`\>

**`internal`**

#### Returns

`Promise`<`Object`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:18
