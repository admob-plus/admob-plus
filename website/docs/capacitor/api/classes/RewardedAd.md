---
id: "RewardedAd"
title: "Class: RewardedAd"
sidebar_label: "RewardedAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `MobileAd`

  ↳ **`RewardedAd`**

## Constructors

### constructor

• **new RewardedAd**(`opts`): [`RewardedAd`](RewardedAd.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../#mobileadoptions) |

#### Returns

[`RewardedAd`](RewardedAd.md)

#### Inherited from

MobileAd.constructor

#### Defined in

index.ts:30

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

▪ `Static` **cls**: `string` = `'RewardedAd'`

#### Defined in

index.ts:144

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

#### Inherited from

MobileAd.hide

#### Defined in

index.ts:61

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

index.ts:146

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.load

#### Defined in

index.ts:150

___

### show

▸ **show**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.show

#### Defined in

index.ts:154
