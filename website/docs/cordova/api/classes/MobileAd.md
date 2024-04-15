---
id: "MobileAd"
title: "Class: MobileAd<T>"
sidebar_label: "MobileAd"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MobileAdOptions`](../#mobileadoptions) = [`MobileAdOptions`](../#mobileadoptions) |

## Hierarchy

- **`MobileAd`**

  ↳ [`AppOpenAd`](AppOpenAd.md)

  ↳ [`BannerAd`](BannerAd.md)

  ↳ [`InterstitialAd`](InterstitialAd.md)

  ↳ [`NativeAd`](NativeAd.md)

  ↳ [`RewardedAd`](RewardedAd.md)

  ↳ [`RewardedInterstitialAd`](RewardedInterstitialAd.md)

  ↳ [`WebViewAd`](WebViewAd.md)

## Constructors

### constructor

• **new MobileAd**\<`T`\>(`opts`): [`MobileAd`](MobileAd.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MobileAdOptions`](../#mobileadoptions) = [`MobileAdOptions`](../#mobileadoptions) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `T` |

#### Returns

[`MobileAd`](MobileAd.md)\<`T`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:23

## Properties

### \_initPromise

• `Private` **\_initPromise**: `undefined` \| `Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:21

___

### id

• `Readonly` **id**: `string`

#### Defined in

packages/cordova/src/www/ads/base.ts:18

___

### opts

• `Protected` `Readonly` **opts**: `T`

#### Defined in

packages/cordova/src/www/ads/base.ts:20

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

packages/cordova/src/www/ads/base.ts:40

___

### allAds

• `get` **allAds**(): `Record`\<`string`, [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>\>

#### Returns

`Record`\<`string`, [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>\>

#### Defined in

packages/cordova/src/www/ads/base.ts:30

## Methods

### \_init

▸ **_init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:87

___

### hide

▸ **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:77

___

### init

▸ **init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:82

___

### isLoaded

▸ **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:61

___

### load

▸ **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:66

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

#### Defined in

packages/cordova/src/www/ads/base.ts:44

___

### show

▸ **show**(`opts?`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:72

___

### getAdById

▸ **getAdById**(`id`): [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>

#### Defined in

packages/cordova/src/www/ads/base.ts:36
