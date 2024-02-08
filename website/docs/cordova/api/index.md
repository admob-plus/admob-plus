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
- [Platform](enums/Platform.md)

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

- [AdMobConfig](interfaces/AdMobConfig.md)
- [BannerAdOptions](interfaces/BannerAdOptions.md)
- [NativeAdOptions](interfaces/NativeAdOptions.md)
- [RequestConfig](interfaces/RequestConfig.md)
- [RewardedAdOptions](interfaces/RewardedAdOptions.md)
- [ServerSideVerificationOptions](interfaces/ServerSideVerificationOptions.md)
- [WebViewAdOptions](interfaces/WebViewAdOptions.md)

## References

### default

Renames and re-exports [AdMob](classes/AdMob.md)

## Type Aliases

### CordovaAction

Ƭ **CordovaAction**: ``"adCreate"`` \| ``"adHide"`` \| ``"adIsLoaded"`` \| ``"adLoad"`` \| ``"adShow"`` \| ``"bannerConfig"`` \| ``"configure"`` \| ``"ready"`` \| ``"start"`` \| ``"webviewGoto"``

#### Defined in

packages/cordova/src/www/common.ts:3

___

### MobileAdOptions

Ƭ **MobileAdOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adUnitId` | `string` |
| `contentUrl?` | `string` |
| `id?` | `string` |
| `keywords?` | `string`[] |
| `npa?` | ``"1"`` |

#### Defined in

packages/cordova/src/www/ads/base.ts:4

___

### RewardedInterstitialAdOptions

Ƭ **RewardedInterstitialAdOptions**: [`RewardedAdOptions`](interfaces/RewardedAdOptions.md)

#### Defined in

packages/cordova/src/www/ads/rewarded-interstitial.ts:4

## Variables

### CordovaService

• `Const` **CordovaService**: ``"AdMob"``

#### Defined in

packages/cordova/src/www/common.ts:1

## Functions

### execAsync

▸ **execAsync**\<`T`\>(`action`, `args?`): `Promise`\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`CordovaAction`](#cordovaaction) |
| `args?` | `unknown`[] |

#### Returns

`Promise`\<`T`\>

#### Defined in

packages/cordova/src/www/common.ts:60
