---
id: "BannerAd"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd)<[`BannerAdOptions`](../interfaces/BannerAdOptions)\>

  ↳ **`BannerAd`**

## Constructors

### constructor

• **new BannerAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`BannerAdOptions`](../interfaces/BannerAdOptions) |

#### Overrides

[MobileAd](MobileAd).[constructor](MobileAd#constructor)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:64

## Properties

### \_loaded

• `Private` **\_loaded**: `boolean` = `false`

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:62

___

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](MobileAd).[id](MobileAd#id)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:32

___

### opts

• `Protected` `Readonly` **opts**: [`BannerAdOptions`](../interfaces/BannerAdOptions)

#### Inherited from

[MobileAd](MobileAd).[opts](MobileAd#opts)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:34

___

### cls

▪ `Static` **cls**: `string` = `'BannerAd'`

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:60

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Inherited from

[MobileAd](MobileAd).[type](MobileAd#type)

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

[MobileAd](MobileAd).[hide](MobileAd#hide)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:99

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](MobileAd).[init](MobileAd#init)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:102

___

### isLoaded

▸ `Protected` **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[MobileAd](MobileAd).[isLoaded](MobileAd#isloaded)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:80

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](MobileAd).[load](MobileAd#load)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:86

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

[MobileAd](MobileAd).[on](MobileAd#on)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:65

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](MobileAd).[show](MobileAd#show)

#### Defined in

code/github/admob-plus/packages/cordova/ts/banner.ts:91

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

code/github/admob-plus/packages/cordova/ts/banner.ts:72

___

### getAdById

▸ `Static` **getAdById**(`id`): [`MobileAd`](MobileAd)<[`MobileAdOptions`](../#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`MobileAd`](MobileAd)<[`MobileAdOptions`](../#mobileadoptions)\>

#### Inherited from

[MobileAd](MobileAd).[getAdById](MobileAd#getadbyid)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:45
