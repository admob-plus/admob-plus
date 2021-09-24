---
id: "InterstitialAd"
title: "Class: InterstitialAd"
sidebar_label: "InterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd)<[`MobileAdOptions`](../#mobileadoptions)\>

  ↳ **`InterstitialAd`**

## Constructors

### constructor

• **new InterstitialAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../#mobileadoptions) |

#### Inherited from

[MobileAd](MobileAd).[constructor](MobileAd#constructor)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:38

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](MobileAd).[id](MobileAd#id)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:32

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../#mobileadoptions)

#### Inherited from

[MobileAd](MobileAd).[opts](MobileAd#opts)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:34

___

### cls

▪ `Static` **cls**: `string` = `'InterstitialAd'`

#### Defined in

code/github/admob-plus/packages/cordova/ts/interstitial.ts:4

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

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[MobileAd](MobileAd).[hide](MobileAd#hide)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:98

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

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](MobileAd).[isLoaded](MobileAd#isloaded)

#### Defined in

code/github/admob-plus/packages/cordova/ts/interstitial.ts:6

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](MobileAd).[load](MobileAd#load)

#### Defined in

code/github/admob-plus/packages/cordova/ts/interstitial.ts:10

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

code/github/admob-plus/packages/cordova/ts/interstitial.ts:14

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
