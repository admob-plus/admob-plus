---
id: "BannerAd"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `MobileAd`

  ↳ **`BannerAd`**

## Constructors

### constructor

• **new BannerAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`BannerAdOptions`](../interfaces/BannerAdOptions.md) |

#### Overrides

MobileAd.constructor

#### Defined in

index.ts:101

## Properties

### \_loaded

• **\_loaded**: `boolean` = `false`

#### Defined in

index.ts:99

___

### id

• `Readonly` **id**: `number`

#### Inherited from

MobileAd.id

#### Defined in

index.ts:23

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../index.md#mobileadoptions)

#### Inherited from

MobileAd.opts

#### Defined in

index.ts:25

___

### cls

▪ `Static` **cls**: `string` = `'BannerAd'`

#### Defined in

index.ts:98

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

index.ts:42

## Methods

### hide

▸ **hide**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.hide

#### Defined in

index.ts:122

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

MobileAd.init

#### Defined in

index.ts:66

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

MobileAd.isLoaded

#### Defined in

index.ts:108

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.load

#### Defined in

index.ts:112

___

### show

▸ **show**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.show

#### Defined in

index.ts:117
