---
id: "rewardedad"
title: "Class: RewardedAd"
sidebar_label: "RewardedAd"
custom_edit_url: null
hide_title: true
---

# Class: RewardedAd

## Hierarchy

* [*MobileAd*](mobilead.md)<[*RewardedAdOptions*](../interfaces/rewardedadoptions.md)\>

  ↳ **RewardedAd**

## Constructors

### constructor

\+ **new RewardedAd**(`opts`: [*RewardedAdOptions*](../interfaces/rewardedadoptions.md)): [*RewardedAd*](rewardedad.md)

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | [*RewardedAdOptions*](../interfaces/rewardedadoptions.md) |

**Returns:** [*RewardedAd*](rewardedad.md)

Inherited from: [MobileAd](mobilead.md)

Defined in: api.ts:13

## Properties

### id

• `Readonly` **id**: *number*

Inherited from: [MobileAd](mobilead.md).[id](mobilead.md#id)

Defined in: api.ts:11

___

### opts

• `Protected` `Readonly` **opts**: [*RewardedAdOptions*](../interfaces/rewardedadoptions.md)

Inherited from: [MobileAd](mobilead.md).[opts](mobilead.md#opts)

Defined in: api.ts:13

## Accessors

### adUnitId

• get **adUnitId**(): *string*

**Returns:** *string*

Defined in: api.ts:27

## Methods

### isLoaded

▸ **isLoaded**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded.ts:13

___

### load

▸ **load**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded.ts:17

___

### show

▸ **show**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded.ts:23
