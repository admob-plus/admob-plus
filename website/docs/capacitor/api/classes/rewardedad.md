---
id: "rewardedad"
title: "Class: RewardedAd"
sidebar_label: "RewardedAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `GenericAd`

  ↳ **`RewardedAd`**

## Constructors

### constructor

• **new RewardedAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../index.md#mobileadoptions) |

#### Inherited from

GenericAd.constructor

#### Defined in

index.ts:33

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

GenericAd.id

#### Defined in

index.ts:12

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../index.md#mobileadoptions)

#### Inherited from

GenericAd.opts

#### Defined in

index.ts:14

___

### cls

▪ `Static` **cls**: `string` = `'RewardedAd'`

#### Defined in

index.ts:110

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

index.ts:28

## Methods

### hide

▸ **hide**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

GenericAd.hide

#### Defined in

index.ts:67

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

GenericAd.init

#### Defined in

index.ts:72

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

GenericAd.isLoaded

#### Defined in

index.ts:52

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

GenericAd.load

#### Defined in

index.ts:57

___

### show

▸ **show**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

GenericAd.show

#### Defined in

index.ts:62
