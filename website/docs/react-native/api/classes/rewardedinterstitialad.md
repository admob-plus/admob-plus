---
id: "rewardedinterstitialad"
title: "Class: RewardedInterstitialAd"
sidebar_label: "RewardedInterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `GenericAd`

  ↳ **`RewardedInterstitialAd`**

## Constructors

### constructor

• **new RewardedInterstitialAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../index.md#mobileadoptions) |

#### Inherited from

GenericAd.constructor

#### Defined in

index.ts:61

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

GenericAd.id

#### Defined in

index.ts:23

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../index.md#mobileadoptions)

#### Inherited from

GenericAd.opts

#### Defined in

index.ts:25

___

### cls

▪ `Static` **cls**: `string` = `'RewardedInterstitialAd'`

#### Defined in

index.ts:108

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

index.ts:39

## Methods

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

GenericAd.init

#### Defined in

index.ts:94

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

GenericAd.isLoaded

#### Defined in

index.ts:79

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

GenericAd.load

#### Defined in

index.ts:84

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

GenericAd.on

#### Defined in

index.ts:43

___

### show

▸ **show**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

GenericAd.show

#### Defined in

index.ts:89
