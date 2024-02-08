---
id: "rewardedinterstitialad"
title: "Class: RewardedInterstitialAd"
sidebar_label: "RewardedInterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [MobileAd](mobilead.md)\<[RewardedInterstitialAdOptions](../interfaces/rewardedinterstitialadoptions.md)\>

  ↳ **RewardedInterstitialAd**

## Constructors

### constructor

• **new RewardedInterstitialAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [RewardedInterstitialAdOptions](../interfaces/rewardedinterstitialadoptions.md) |

#### Inherited from

[MobileAd](mobilead.md).[constructor](mobilead.md#constructor)

#### Defined in

api.ts:15

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](mobilead.md).[id](mobilead.md#id)

#### Defined in

api.ts:13

___

### opts

• `Protected` `Readonly` **opts**: [RewardedInterstitialAdOptions](../interfaces/rewardedinterstitialadoptions.md)

#### Inherited from

[MobileAd](mobilead.md).[opts](mobilead.md#opts)

#### Defined in

api.ts:15

___

### type

▪ `Static` `Readonly` **type**: `string` = ''

#### Inherited from

[MobileAd](mobilead.md).[type](mobilead.md#type)

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

### isLoaded

▸ **isLoaded**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

rewarded-interstitial.ts:7

___

### load

▸ **load**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

rewarded-interstitial.ts:13

___

### show

▸ **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

rewarded-interstitial.ts:19

___

### getAdById

▸ `Static` **getAdById**(`id`): [MobileAd](mobilead.md)\<[MobileAdOptions](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[MobileAd](mobilead.md)\<[MobileAdOptions](../index.md#mobileadoptions)\>

#### Inherited from

[MobileAd](mobilead.md).[getAdById](mobilead.md#getadbyid)

#### Defined in

api.ts:24
