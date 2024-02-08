---
id: "mobilead"
title: "Class: MobileAd<T>"
sidebar_label: "MobileAd"
sidebar_position: 0
custom_edit_url: null
---

**`internal`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: [MobileAdOptions](../index.md#mobileadoptions) = [MobileAdOptions](../index.md#mobileadoptions) |

## Hierarchy

- **MobileAd**

  ↳ [BannerAd](bannerad.md)

  ↳ [InterstitialAd](interstitialad.md)

  ↳ [RewardedAd](rewardedad.md)

  ↳ [RewardedInterstitialAd](rewardedinterstitialad.md)

## Constructors

### constructor

• **new MobileAd**\<T\>(`opts`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: [MobileAdOptions](../index.md#mobileadoptions) = [MobileAdOptions](../index.md#mobileadoptions) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `T` |

#### Defined in

api.ts:15

## Properties

### id

• `Readonly` **id**: `number`

#### Defined in

api.ts:13

___

### opts

• `Protected` `Readonly` **opts**: `T`

#### Defined in

api.ts:15

___

### allAds

▪ `Static` `Private` **allAds**: `Object` = {}

#### Index signature

▪ [s: `number`]: [MobileAd](mobilead.md)

#### Defined in

api.ts:10

___

### idCounter

▪ `Static` `Private` **idCounter**: `number` = 0

#### Defined in

api.ts:11

___

### type

▪ `Static` `Readonly` **type**: `string` = ''

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

### getAdById

▸ `Static` **getAdById**(`id`): [MobileAd](mobilead.md)\<[MobileAdOptions](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[MobileAd](mobilead.md)\<[MobileAdOptions](../index.md#mobileadoptions)\>

#### Defined in

api.ts:24

___

### nextId

▸ `Static` `Private` **nextId**(): `number`

#### Returns

`number`

#### Defined in

api.ts:28
