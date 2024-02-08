---
id: "interstitialad"
title: "Class: InterstitialAd"
sidebar_label: "InterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [MobileAd](mobilead.md)

  ↳ **InterstitialAd**

## Constructors

### constructor

• **new InterstitialAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [MobileAdOptions](../index.md#mobileadoptions) |

#### Inherited from

[MobileAd](mobilead.md).[constructor](mobilead.md#constructor)

#### Defined in

api.ts:15

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](mobilead.md).[id](mobilead.md#id)

#### Defined in

api.ts:13

___

### opts

• `Protected` `Readonly` **opts**: [MobileAdOptions](../index.md#mobileadoptions)

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

### isLoaded

▸ **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

interstitial.ts:4

___

### load

▸ **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

interstitial.ts:10

___

### show

▸ **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

interstitial.ts:16

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

[MobileAd](mobilead.md).[getAdById](mobilead.md#getadbyid)

#### Defined in

api.ts:24
