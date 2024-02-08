---
id: "RewardedInterstitialAd"
title: "Class: RewardedInterstitialAd"
sidebar_label: "RewardedInterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd.md)\<[`RewardedInterstitialAdOptions`](../#rewardedinterstitialadoptions)\>

  ↳ **`RewardedInterstitialAd`**

## Constructors

### constructor

• **new RewardedInterstitialAd**(`opts`): [`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`RewardedAdOptions`](../interfaces/RewardedAdOptions.md) |

#### Returns

[`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Inherited from

[MobileAd](MobileAd.md).[constructor](MobileAd.md#constructor)

#### Defined in

packages/cordova/src/www/ads/base.ts:23

## Properties

### id

• `Readonly` **id**: `string`

#### Inherited from

[MobileAd](MobileAd.md).[id](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/ads/base.ts:18

___

### opts

• `Protected` `Readonly` **opts**: [`RewardedAdOptions`](../interfaces/RewardedAdOptions.md)

#### Inherited from

[MobileAd](MobileAd.md).[opts](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/ads/base.ts:20

___

### cls

▪ `Static` `Readonly` **cls**: ``"RewardedInterstitialAd"``

#### Defined in

packages/cordova/src/www/ads/rewarded-interstitial.ts:7

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Inherited from

MobileAd.adUnitId

#### Defined in

packages/cordova/src/www/ads/base.ts:40

___

### allAds

• `get` **allAds**(): `Record`\<`string`, [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>\>

#### Returns

`Record`\<`string`, [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>\>

#### Inherited from

MobileAd.allAds

#### Defined in

packages/cordova/src/www/ads/base.ts:30

## Methods

### hide

▸ **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[MobileAd](MobileAd.md).[hide](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/ads/base.ts:76

___

### init

▸ **init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[MobileAd](MobileAd.md).[init](MobileAd.md#init)

#### Defined in

packages/cordova/src/www/ads/base.ts:81

___

### isLoaded

▸ **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[MobileAd](MobileAd.md).[isLoaded](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/ads/rewarded-interstitial.ts:9

___

### load

▸ **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[MobileAd](MobileAd.md).[load](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/ads/rewarded-interstitial.ts:13

___

### on

▸ **on**(`...args`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [type: string, listener: Function, useCapture?: boolean] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

[MobileAd](MobileAd.md).[on](MobileAd.md#on)

#### Defined in

packages/cordova/src/www/ads/base.ts:44

___

### show

▸ **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[show](MobileAd.md#show)

#### Defined in

packages/cordova/src/www/ads/rewarded-interstitial.ts:17

___

### getAdById

▸ **getAdById**(`id`): [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>

#### Inherited from

[MobileAd](MobileAd.md).[getAdById](MobileAd.md#getadbyid)

#### Defined in

packages/cordova/src/www/ads/base.ts:36
