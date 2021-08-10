---
id: "index"
title: "admob-plus-cordova"
slug: "/cordova/api"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [AdSizeType](enums/AdSizeType.md)
- [Events](enums/Events.md)
- [MaxAdContentRating](enums/MaxAdContentRating.md)
- [NativeActions](enums/NativeActions.md)
- [Platforms](enums/Platforms.md)
- [TrackingAuthorizationStatus](enums/TrackingAuthorizationStatus.md)

## Classes

- [AdMob](classes/AdMob.md)
- [AppOpenAd](classes/AppOpenAd.md)
- [BannerAd](classes/BannerAd.md)
- [InterstitialAd](classes/InterstitialAd.md)
- [MobileAd](classes/MobileAd.md)
- [NativeAd](classes/NativeAd.md)
- [RewardedAd](classes/RewardedAd.md)
- [RewardedInterstitialAd](classes/RewardedInterstitialAd.md)

## Interfaces

- [BannerAdOptions](interfaces/BannerAdOptions.md)
- [RewardedAdOptions](interfaces/RewardedAdOptions.md)
- [RewardedInterstitialAdOptions](interfaces/RewardedInterstitialAdOptions.md)
- [ServerSideVerificationOptions](interfaces/ServerSideVerificationOptions.md)

## References

### default

Renames and exports: [AdMob](classes/AdMob.md)

## Type aliases

### AdMobConfig

Ƭ **AdMobConfig**: { `appMuted?`: `boolean` ; `appVolume?`: `number`  } & [`RequestConfig`](index.md#requestconfig)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:151

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
| `maxAdContentRating?` | [`MaxAdContentRating`](enums/MaxAdContentRating.md) |
| `tagForChildDirectedTreatment?` | `boolean` \| ``null`` |
| `tagForUnderAgeOfConsent?` | `boolean` \| ``null`` |
| `testDeviceIds?` | `string`[] |

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:132

## Functions

### execAsync

▸ `Const` **execAsync**(`action`, `args?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`NativeActions`](enums/NativeActions.md) |
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
