---
id: "RewardedInterstitialAd"
title: "Class: RewardedInterstitialAd"
sidebar_label: "RewardedInterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd.md)<[`RewardedInterstitialAdOptions`](../interfaces/RewardedInterstitialAdOptions.md)\>

  ↳ **`RewardedInterstitialAd`**

## Constructors

### constructor

• **new RewardedInterstitialAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`RewardedInterstitialAdOptions`](../interfaces/RewardedInterstitialAdOptions.md) |

#### Inherited from

[MobileAd](MobileAd.md).[constructor](MobileAd.md#constructor)

#### Defined in

packages/cordova/src/www/api.ts:38

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](MobileAd.md).[id](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/api.ts:32

___

### opts

• `Protected` `Readonly` **opts**: [`RewardedInterstitialAdOptions`](../interfaces/RewardedInterstitialAdOptions.md)

#### Inherited from

[MobileAd](MobileAd.md).[opts](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/api.ts:34

___

### cls

▪ `Static` **cls**: `string` = `'RewardedInterstitialAd'`

#### Defined in

packages/cordova/src/www/rewarded-interstitial.ts:7

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Inherited from

[MobileAd](MobileAd.md).[type](MobileAd.md#type)

#### Defined in

packages/cordova/src/www/api.ts:27

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Inherited from

MobileAd.adUnitId

#### Defined in

packages/cordova/src/www/api.ts:61

## Methods

### hide

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[MobileAd](MobileAd.md).[hide](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/api.ts:98

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](MobileAd.md).[init](MobileAd.md#init)

#### Defined in

packages/cordova/src/www/api.ts:102

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](MobileAd.md).[isLoaded](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/rewarded-interstitial.ts:9

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](MobileAd.md).[load](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/rewarded-interstitial.ts:13

___

### on

▸ **on**(...`args`): () => `void`

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

packages/cordova/src/www/api.ts:65

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[show](MobileAd.md#show)

#### Defined in

packages/cordova/src/www/rewarded-interstitial.ts:17

___

### getAdById

▸ `Static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../#mobileadoptions)\>

#### Inherited from

[MobileAd](MobileAd.md).[getAdById](MobileAd.md#getadbyid)

#### Defined in

packages/cordova/src/www/api.ts:45
