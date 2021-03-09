---
id: "mobilead"
title: "Class: MobileAd"
sidebar_label: "MobileAd"
custom_edit_url: null
hide_title: true
---

# Class: MobileAd

**`internal`** 

## Hierarchy

* **MobileAd**

  ↳ [*BannerAd*](bannerad.md)

  ↳ [*InterstitialAd*](interstitialad.md)

  ↳ [*RewardedAd*](rewardedad.md)

  ↳ [*RewardedInterstitialAd*](rewardedinterstitialad.md)

## Constructors

### constructor

\+ **new MobileAd**(`__namedParameters`: [*MobileAdOptions*](../index.md#mobileadoptions)): [*MobileAd*](mobilead.md)

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*MobileAdOptions*](../index.md#mobileadoptions) |

**Returns:** [*MobileAd*](mobilead.md)

Defined in: api.ts:12

## Properties

### adUnitId

• `Readonly` **adUnitId**: *string*

Defined in: api.ts:11

___

### id

• `Readonly` **id**: *number*

Defined in: api.ts:12

___

### allAds

▪ `Private` `Static` **allAds**: *object*

#### Type declaration:

Defined in: api.ts:8

___

### idCounter

▪ `Private` `Static` **idCounter**: *number*= 0

Defined in: api.ts:9

## Methods

### nextId

▸ `Private` `Static`**nextId**(): *number*

**Returns:** *number*

Defined in: api.ts:21
