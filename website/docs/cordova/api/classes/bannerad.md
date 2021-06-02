---
id: "bannerad"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [MobileAd](mobilead.md)<[BannerAdOptions](../interfaces/banneradoptions.md)\>

  ↳ **BannerAd**

## Constructors

### constructor

• **new BannerAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [BannerAdOptions](../interfaces/banneradoptions.md) |

#### Overrides

[MobileAd](mobilead.md).[constructor](mobilead.md#constructor)

#### Defined in

banner.ts:46

## Properties

### \_loaded

• `Private` **\_loaded**: `boolean` = false

#### Defined in

banner.ts:46

___

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](mobilead.md).[id](mobilead.md#id)

#### Defined in

api.ts:13

___

### opts

• `Protected` `Readonly` **opts**: [BannerAdOptions](../interfaces/banneradoptions.md)

#### Inherited from

[MobileAd](mobilead.md).[opts](mobilead.md#opts)

#### Defined in

api.ts:15

___

### type

▪ `Static` `Readonly` **type**: `string` = ''

#### Inherited from

[MobileAd](mobilead.md).[type](mobilead.md#type)

#### Defined in

api.ts:8

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

api.ts:33

## Methods

### hide

▸ **hide**(): `Promise`<unknown\>

#### Returns

`Promise`<unknown\>

#### Defined in

banner.ts:86

___

### load

▸ **load**(): `Promise`<unknown\>

#### Returns

`Promise`<unknown\>

#### Defined in

banner.ts:70

___

### show

▸ **show**(): `Promise`<unknown\>

#### Returns

`Promise`<unknown\>

#### Defined in

banner.ts:78

___

### config

▸ `Static` **config**(`opts`): ``false`` \| `Promise`<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.backgroundColor?` | `string` |
| `opts.marginBottom?` | `number` |
| `opts.marginTop?` | `number` |

#### Returns

``false`` \| `Promise`<unknown\>

#### Defined in

banner.ts:56

___

### getAdById

▸ `Static` **getAdById**(`id`): [MobileAd](mobilead.md)<[MobileAdOptions](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[MobileAd](mobilead.md)<[MobileAdOptions](../index.md#mobileadoptions)\>

#### Inherited from

[MobileAd](mobilead.md).[getAdById](mobilead.md#getadbyid)

#### Defined in

api.ts:24
