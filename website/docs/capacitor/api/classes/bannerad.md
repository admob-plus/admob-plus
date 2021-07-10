---
id: "bannerad"
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
| `opts` | [`BannerAdOptions`](../interfaces/banneradoptions.md) |

#### Overrides

MobileAd.constructor

#### Defined in

index.ts:80

## Properties

### \_loaded

• **\_loaded**: `boolean` = `false`

#### Defined in

index.ts:80

___

### id

• `Readonly` **id**: `number`

#### Inherited from

MobileAd.id

#### Defined in

index.ts:12

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../index.md#mobileadoptions)

#### Inherited from

MobileAd.opts

#### Defined in

index.ts:14

___

### cls

▪ `Static` **cls**: `string` = `'BannerAd'`

#### Defined in

index.ts:79

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

index.ts:43

## Methods

### hide

▸ **hide**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.hide

#### Defined in

index.ts:103

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

MobileAd.init

#### Defined in

index.ts:67

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

MobileAd.isLoaded

#### Defined in

index.ts:89

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.load

#### Defined in

index.ts:93

___

### show

▸ **show**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.show

#### Defined in

index.ts:98
