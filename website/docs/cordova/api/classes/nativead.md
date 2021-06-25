---
id: "nativead"
title: "Class: NativeAd"
sidebar_label: "NativeAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](mobilead.md)<[`MobileAdOptions`](../index.md#mobileadoptions) & { `view?`: `string`  }\>

  ↳ **`NativeAd`**

## Constructors

### constructor

• **new NativeAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../index.md#mobileadoptions) & { `view?`: `string`  } |

#### Inherited from

[MobileAd](mobilead.md).[constructor](mobilead.md#constructor)

#### Defined in

api.ts:18

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](mobilead.md).[id](mobilead.md#id)

#### Defined in

api.ts:15

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../index.md#mobileadoptions) & { `view?`: `string`  }

#### Inherited from

[MobileAd](mobilead.md).[opts](mobilead.md#opts)

#### Defined in

api.ts:17

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Inherited from

[MobileAd](mobilead.md).[type](mobilead.md#type)

#### Defined in

api.ts:10

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

api.ts:42

## Methods

### hide

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](mobilead.md).[hide](mobilead.md#hide)

#### Defined in

native.ts:12

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](mobilead.md).[init](mobilead.md#init)

#### Defined in

api.ts:67

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](mobilead.md).[isLoaded](mobilead.md#isloaded)

#### Defined in

native.ts:8

___

### load

▸ `Protected` **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](mobilead.md).[load](mobilead.md#load)

#### Defined in

api.ts:53

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

[MobileAd](mobilead.md).[show](mobilead.md#show)

#### Defined in

native.ts:16

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

native.ts:26

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

api.ts:33
