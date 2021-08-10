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

code/github/admob-plus/packages/cordova/ts/banner.ts:47

## Properties

### \_loaded

• `Private` **\_loaded**: `boolean` = `false`

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:45

___

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](MobileAd.md).[id](MobileAd.md#id)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:32

___

### opts

• `Protected` `Readonly` **opts**: [`BannerAdOptions`](../interfaces/BannerAdOptions.md)

#### Inherited from

[MobileAd](MobileAd.md).[opts](MobileAd.md#opts)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:34

___

### cls

▪ `Static` **cls**: `string` = `'BannerAd'`

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:43

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Inherited from

[MobileAd](MobileAd.md).[type](MobileAd.md#type)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:27

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:61

## Methods

### hide

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[hide](MobileAd.md#hide)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:82

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](MobileAd.md).[init](MobileAd.md#init)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:101

___

### isLoaded

▸ `Protected` **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[MobileAd](MobileAd.md).[isLoaded](MobileAd.md#isloaded)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:80

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](MobileAd.md).[load](MobileAd.md#load)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:69

___

### on

▸ **on**(...`args`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [type: string, listener: function, useCapture?: boolean] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

[MobileAd](MobileAd.md).[on](MobileAd.md#on)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:65

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[show](MobileAd.md#show)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:74

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

code/github/admob-plus/packages/cordova/ts/banner.ts:55

___

### getAdById

▸ `Static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Inherited from

[MobileAd](MobileAd.md).[getAdById](MobileAd.md#getadbyid)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:45
