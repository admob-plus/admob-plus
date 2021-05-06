---
id: "interstitialad"
title: "Class: InterstitialAd"
sidebar_label: "InterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

# Class: InterstitialAd

## Hierarchy

- [*MobileAd*](mobilead.md)

  ↳ **InterstitialAd**

## Constructors

### constructor

\+ **new InterstitialAd**(`opts`: [*MobileAdOptions*](../index.md#mobileadoptions)): [*InterstitialAd*](interstitialad.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [*MobileAdOptions*](../index.md#mobileadoptions) |

**Returns:** [*InterstitialAd*](interstitialad.md)

Inherited from: [MobileAd](mobilead.md)

Defined in: api.ts:13

## Properties

### id

• `Readonly` **id**: *number*

Inherited from: [MobileAd](mobilead.md).[id](mobilead.md#id)

Defined in: api.ts:11

___

### opts

• `Protected` `Readonly` **opts**: [*MobileAdOptions*](../index.md#mobileadoptions)

Inherited from: [MobileAd](mobilead.md).[opts](mobilead.md#opts)

Defined in: api.ts:13

## Accessors

### adUnitId

• get **adUnitId**(): *string*

**Returns:** *string*

Defined in: api.ts:27

## Methods

### isLoaded

▸ **isLoaded**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Defined in: interstitial.ts:4

___

### load

▸ **load**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: interstitial.ts:10

___

### show

▸ **show**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: interstitial.ts:16
