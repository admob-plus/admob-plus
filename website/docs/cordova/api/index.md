---
id: "index"
title: "admob-plus-cordova"
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
- [WebViewAd](classes/WebViewAd.md)

## Interfaces

- [BannerAdOptions](interfaces/BannerAdOptions.md)
- [NativeAdOptions](interfaces/NativeAdOptions.md)
- [RewardedAdOptions](interfaces/RewardedAdOptions.md)
- [RewardedInterstitialAdOptions](interfaces/RewardedInterstitialAdOptions.md)
- [ServerSideVerificationOptions](interfaces/ServerSideVerificationOptions.md)

## References

### default

Renames and re-exports [AdMob](classes/AdMob.md)

## Type Aliases

### AdMobConfig

Ƭ **AdMobConfig**: { `appMuted?`: `boolean` ; `appVolume?`: `number`  } & [`RequestConfig`](#requestconfig)

#### Defined in

packages/cordova/src/www/api.ts:153

___

### MobileAdOptions

Ƭ **MobileAdOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adUnitId` | `string` |
| `contentUrl?` | `string` |
| `id?` | `number` |
| `keywords?` | `string`[] |
| `npa?` | ``"1"`` |

#### Defined in

packages/cordova/src/www/api.ts:6

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

packages/cordova/src/www/api.ts:133

## Functions

### execAsync

▸ **execAsync**(`action`, `args?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`NativeActions`](enums/NativeActions.md) |
| `args?` | `any`[] |

#### Returns

`Promise`<`unknown`\>

#### Defined in

packages/cordova/src/www/generated.ts:79

___

### start

▸ **start**(): `Promise`<{ `version`: `string`  }\>

#### Returns

`Promise`<{ `version`: `string`  }\>

#### Defined in

packages/cordova/src/www/api.ts:18
