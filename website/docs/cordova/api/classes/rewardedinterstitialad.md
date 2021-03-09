---
id: "rewardedinterstitialad"
title: "Class: RewardedInterstitialAd"
sidebar_label: "RewardedInterstitialAd"
custom_edit_url: null
hide_title: true
---

# Class: RewardedInterstitialAd

## Hierarchy

* [*MobileAd*](mobilead.md)

  ↳ **RewardedInterstitialAd**

## Constructors

### constructor

\+ **new RewardedInterstitialAd**(`opts`: [*RewardedInterstitialAdOptions*](../interfaces/rewardedinterstitialadoptions.md)): [*RewardedInterstitialAd*](rewardedinterstitialad.md)

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | [*RewardedInterstitialAdOptions*](../interfaces/rewardedinterstitialadoptions.md) |

**Returns:** [*RewardedInterstitialAd*](rewardedinterstitialad.md)

Inherited from: [MobileAd](mobilead.md)

Defined in: rewarded-interstitial.ts:7

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

Defined in: rewarded-interstitial.ts:7

## Methods

### isLoaded

▸ **isLoaded**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded-interstitial.ts:15

___

### load

▸ **load**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded-interstitial.ts:21

___

### show

▸ **show**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: rewarded-interstitial.ts:27
