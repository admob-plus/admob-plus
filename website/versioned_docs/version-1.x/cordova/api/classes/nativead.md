---
id: "nativead"
title: "Class: NativeAd"
sidebar_label: "NativeAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `GenericAd`\<`Object`\>

  ↳ **NativeAd**

## Constructors

### constructor

• **new NativeAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [MobileAdOptions](../index.md#mobileadoptions) & \{ `_noinit?`: `boolean` ; `type`: `string`  } |

#### Inherited from

GenericAd\<\{
  x: number
  y: number
  width: number
  height: number
}\>.constructor

#### Defined in

app-open.ts:4

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

GenericAd.id

#### Defined in

api.ts:13

___

### opts

• `Protected` `Readonly` **opts**: [MobileAdOptions](../index.md#mobileadoptions)

#### Inherited from

GenericAd.opts

#### Defined in

api.ts:15

___

### type

▪ `Static` `Readonly` **type**: ``"native"``

#### Overrides

GenericAd.type

#### Defined in

native.ts:10

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

api.ts:33

## Methods

### hide

▸ **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

native.ts:12

___

### init

▸ `Protected` **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

GenericAd.init

#### Defined in

app-open.ts:40

___

### isLoaded

▸ **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

GenericAd.isLoaded

#### Defined in

app-open.ts:21

___

### load

▸ **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

GenericAd.load

#### Defined in

app-open.ts:28

___

### show

▸ **show**(`opts?`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Object` |
| `opts.height` | `number` |
| `opts.width` | `number` |
| `opts.x` | `number` |
| `opts.y` | `number` |

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

GenericAd.show

#### Defined in

app-open.ts:33

___

### getAdById

▸ `Static` **getAdById**(`id`): [MobileAd](mobilead.md)\<[MobileAdOptions](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[MobileAd](mobilead.md)\<[MobileAdOptions](../index.md#mobileadoptions)\>

#### Inherited from

GenericAd.getAdById

#### Defined in

api.ts:24
