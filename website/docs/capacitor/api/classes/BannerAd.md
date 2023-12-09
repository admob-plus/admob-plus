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

• **new BannerAd**(`opts`): [`BannerAd`](BannerAd.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`BannerAdOptions`](../interfaces/BannerAdOptions.md) |

#### Returns

[`BannerAd`](BannerAd.md)

#### Overrides

MobileAd.constructor

#### Defined in

index.ts:101

## Properties

### #created

• `Private` **#created**: `boolean` = `false`

#### Inherited from

MobileAd.#created

#### Defined in

index.ts:27

___

### #init

• `Private` **#init**: ``null`` \| `Promise`<`any`\> = `null`

#### Inherited from

MobileAd.#init

#### Defined in

index.ts:28

___

### #loaded

• `Private` **#loaded**: `boolean` = `false`

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

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../#mobileadoptions)

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

#### Inherited from

MobileAd.adUnitId

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

▸ **init**(): `Promise`<`void`\>

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
