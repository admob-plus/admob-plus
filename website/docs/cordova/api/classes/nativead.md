---
id: "NativeAd"
title: "Class: NativeAd"
sidebar_label: "NativeAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../index.md#mobileadoptions) & { `view?`: `string`  }\>

  ↳ **`NativeAd`**

## Constructors

### constructor

• **new NativeAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../index.md#mobileadoptions) & { `view?`: `string`  } |

#### Inherited from

[MobileAd](MobileAd.md).[constructor](MobileAd.md#constructor)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:26

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](MobileAd.md).[id](MobileAd.md#id)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:21

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../index.md#mobileadoptions) & { `view?`: `string`  }

#### Inherited from

[MobileAd](MobileAd.md).[opts](MobileAd.md#opts)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:23

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Inherited from

[MobileAd](MobileAd.md).[type](MobileAd.md#type)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:16

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:48

## Methods

### hide

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[hide](MobileAd.md#hide)

#### Defined in

code/github/admob-plus/packages/cordova/ts/native.ts:12

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](MobileAd.md).[init](MobileAd.md#init)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:88

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](MobileAd.md).[isLoaded](MobileAd.md#isloaded)

#### Defined in

code/github/admob-plus/packages/cordova/ts/native.ts:8

___

### load

▸ `Protected` **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](MobileAd.md).[load](MobileAd.md#load)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:74

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

code/github/admob-plus/packages/cordova/ts/api.ts:52

___

### show

▸ **show**(`opts?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `ShowOptions` |

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[show](MobileAd.md#show)

#### Defined in

code/github/admob-plus/packages/cordova/ts/native.ts:16

___

### showWith

▸ **showWith**(`elm`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `elm` | `HTMLElement` |

#### Returns

`Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/native.ts:26

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

code/github/admob-plus/packages/cordova/ts/api.ts:39
