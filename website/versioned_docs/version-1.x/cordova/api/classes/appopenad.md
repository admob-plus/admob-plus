---
id: "appopenad"
title: "Class: AppOpenAd"
sidebar_label: "AppOpenAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `GenericAd`

  ↳ **AppOpenAd**

## Constructors

### constructor

• **new AppOpenAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [MobileAdOptions](../index.md#mobileadoptions) |

#### Overrides

GenericAd.constructor

#### Defined in

app-open.ts:46

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

▪ `Static` `Readonly` **type**: ``"app-open"``

#### Overrides

GenericAd.type

#### Defined in

app-open.ts:46

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

api.ts:33

## Methods

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
| `opts?` | `Record`\<string, any\> |

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
