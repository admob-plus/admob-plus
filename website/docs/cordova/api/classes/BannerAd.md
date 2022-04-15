---
id: "BannerAd"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd.md)<[`BannerAdOptions`](../interfaces/BannerAdOptions.md)\>

  ↳ **`BannerAd`**

## Constructors

### constructor

• **new BannerAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`BannerAdOptions`](../interfaces/BannerAdOptions.md) |

#### Overrides

[MobileAd](MobileAd.md).[constructor](MobileAd.md#constructor)

#### Defined in

packages/cordova/src/www/banner.ts:64

## Properties

### \_loaded

• `Private` **\_loaded**: `boolean` = `false`

#### Defined in

packages/cordova/src/www/banner.ts:62

___

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](MobileAd.md).[id](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/api.ts:32

___

### opts

• `Protected` `Readonly` **opts**: [`BannerAdOptions`](../interfaces/BannerAdOptions.md)

#### Inherited from

[MobileAd](MobileAd.md).[opts](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/api.ts:34

___

### cls

▪ `Static` **cls**: `string` = `'BannerAd'`

#### Defined in

packages/cordova/src/www/banner.ts:60

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

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[hide](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/banner.ts:99

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

▸ `Protected` **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[MobileAd](MobileAd.md).[isLoaded](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/api.ts:80

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](MobileAd.md).[load](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/banner.ts:86

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

packages/cordova/src/www/banner.ts:91

___

### config

▸ `Static` **config**(`opts`): ``false`` \| `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.backgroundColor?` | `string` |
| `opts.marginBottom?` | `number` |
| `opts.marginTop?` | `number` |

#### Returns

``false`` \| `Promise`<`unknown`\>

#### Defined in

packages/cordova/src/www/banner.ts:72

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
