---
id: "bannerad"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](mobilead.md)<[`BannerAdOptions`](../interfaces/banneradoptions.md)\>

  ↳ **`BannerAd`**

## Constructors

### constructor

• **new BannerAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`BannerAdOptions`](../interfaces/banneradoptions.md) |

#### Overrides

[MobileAd](mobilead.md).[constructor](mobilead.md#constructor)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:43

## Properties

### \_loaded

• `Private` **\_loaded**: `boolean` = `false`

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:43

___

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](mobilead.md).[id](mobilead.md#id)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:15

___

### opts

• `Protected` `Readonly` **opts**: [`BannerAdOptions`](../interfaces/banneradoptions.md)

#### Inherited from

[MobileAd](mobilead.md).[opts](mobilead.md#opts)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:17

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Inherited from

[MobileAd](mobilead.md).[type](mobilead.md#type)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:10

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:42

## Methods

### hide

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](mobilead.md).[hide](mobilead.md#hide)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:80

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](mobilead.md).[init](mobilead.md#init)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:82

___

### isLoaded

▸ `Protected` **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[MobileAd](mobilead.md).[isLoaded](mobilead.md#isloaded)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:61

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](mobilead.md).[load](mobilead.md#load)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:67

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

[MobileAd](mobilead.md).[on](mobilead.md#on)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:46

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](mobilead.md).[show](mobilead.md#show)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:72

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

code/github/admob-plus/packages/cordova/ts/banner.ts:53

___

### getAdById

▸ `Static` **getAdById**(`id`): [`MobileAd`](mobilead.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`MobileAd`](mobilead.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Inherited from

[MobileAd](mobilead.md).[getAdById](mobilead.md#getadbyid)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:33
