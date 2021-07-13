---
id: "InterstitialAd"
title: "Class: InterstitialAd"
sidebar_label: "InterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `MobileAd`

  ↳ **`InterstitialAd`**

## Constructors

### constructor

• **new InterstitialAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../index.md#mobileadoptions) |

#### Inherited from

MobileAd.constructor

#### Defined in

index.ts:18

## Properties

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

▪ `Static` **cls**: `string` = `'InterstitialAd'`

#### Defined in

index.ts:109

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

index.ts:43

## Methods

### hide

▸ `Protected` **hide**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

MobileAd.hide

#### Defined in

index.ts:62

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

index.ts:111

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.load

#### Defined in

index.ts:115

___

### show

▸ **show**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.show

#### Defined in

index.ts:119
