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

• **new RewardedAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../index.md#mobileadoptions) |

#### Inherited from

MobileAd.constructor

#### Defined in

index.ts:30

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

MobileAd.id

#### Defined in

index.ts:24

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../index.md#mobileadoptions)

#### Inherited from

MobileAd.opts

#### Defined in

index.ts:26

___

### cls

▪ `Static` **cls**: `string` = `'RewardedAd'`

#### Defined in

index.ts:111

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

index.ts:54

## Methods

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

MobileAd.init

#### Defined in

index.ts:89

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

MobileAd.isLoaded

#### Defined in

index.ts:113

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.load

#### Defined in

index.ts:117

___

### on

▸ **on**(`eventType`, `listener`, `context?`): `EmitterSubscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventType` | `string` |
| `listener` | (`event`: `any`) => `void` |
| `context?` | `Record`<`string`, `unknown`\> |

#### Returns

`EmitterSubscription`

#### Inherited from

MobileAd.on

#### Defined in

index.ts:58

___

### show

▸ **show**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

MobileAd.show

#### Defined in

index.ts:121
