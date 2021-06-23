---
id: "bannerad"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `GenericAd`

  ↳ **BannerAd**

## Constructors

### constructor

• **new BannerAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [BannerAdOptions](../interfaces/banneradoptions.md) |

#### Overrides

GenericAd.constructor

#### Defined in

index.ts:85

## Properties

### \_loaded

• **\_loaded**: `boolean` = false

#### Defined in

index.ts:85

___

### id

• `Readonly` **id**: `number`

#### Inherited from

GenericAd.id

#### Defined in

index.ts:12

___

### opts

• `Protected` `Readonly` **opts**: [MobileAdOptions](../index.md#mobileadoptions)

#### Inherited from

GenericAd.opts

#### Defined in

index.ts:14

___

### cls

▪ `Static` **cls**: `string` = 'BannerAd'

#### Defined in

index.ts:84

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

index.ts:28

## Methods

### hide

▸ **hide**(): `Promise`<void\>

#### Returns

`Promise`<void\>

#### Inherited from

GenericAd.hide

#### Defined in

index.ts:67

___

### init

▸ `Protected` **init**(): `Promise`<void\>

#### Returns

`Promise`<void\>

#### Inherited from

GenericAd.init

#### Defined in

index.ts:72

___

### isLoaded

▸ **isLoaded**(): `Promise`<boolean\>

#### Returns

`Promise`<boolean\>

#### Inherited from

GenericAd.isLoaded

#### Defined in

index.ts:52

___

### load

▸ **load**(): `Promise`<void\>

#### Returns

`Promise`<void\>

#### Overrides

GenericAd.load

#### Defined in

index.ts:94

___

### show

▸ **show**(): `Promise`<void\>

#### Returns

`Promise`<void\>

#### Overrides

GenericAd.show

#### Defined in

index.ts:99
