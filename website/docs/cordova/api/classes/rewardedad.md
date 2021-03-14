---
id: "rewardedad"
title: "Class: RewardedAd"
sidebar_label: "RewardedAd"
custom_edit_url: null
hide_title: true
---

# Class: RewardedAd

## Hierarchy

* [*MobileAd*](mobilead.md)

  ↳ **RewardedAd**

## Constructors

### constructor

\+ **new RewardedAd**(`opts`: [*RewardedAdOptions*](../interfaces/rewardedadoptions.md)): [*RewardedAd*](rewardedad.md)

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | [*RewardedAdOptions*](../interfaces/rewardedadoptions.md) |

**Returns:** [*RewardedAd*](rewardedad.md)

Overrides: [MobileAd](mobilead.md)

Defined in: rewarded.ts:18

## Properties

### adUnitId

• `Readonly` **adUnitId**: *string*

Inherited from: [MobileAd](mobilead.md).[adUnitId](mobilead.md#adunitid)

Defined in: api.ts:11

___

### id

• `Readonly` **id**: *number*

Inherited from: [MobileAd](mobilead.md).[id](mobilead.md#id)

Defined in: api.ts:12

___

### opts

• `Private` **opts**: [*RewardedAdOptions*](../interfaces/rewardedadoptions.md)

Defined in: rewarded.ts:18

## Methods

### isLoaded

▸ **isLoaded**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded.ts:26

___

### load

▸ **load**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded.ts:30

___

### show

▸ **show**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded.ts:36
