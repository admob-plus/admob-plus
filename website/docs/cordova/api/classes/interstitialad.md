---
id: "interstitialad"
title: "Class: InterstitialAd"
sidebar_label: "InterstitialAd"
custom_edit_url: null
hide_title: true
---

# Class: InterstitialAd

## Hierarchy

* [*MobileAd*](mobilead.md)

  ↳ **InterstitialAd**

## Constructors

### constructor

\+ **new InterstitialAd**(`__namedParameters`: [*MobileAdOptions*](../index.md#mobileadoptions)): [*InterstitialAd*](interstitialad.md)

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*MobileAdOptions*](../index.md#mobileadoptions) |

**Returns:** [*InterstitialAd*](interstitialad.md)

Overrides: [MobileAd](mobilead.md)

Defined in: interstitial.ts:3

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

## Methods

### isLoaded

▸ **isLoaded**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Defined in: interstitial.ts:8

___

### load

▸ **load**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: interstitial.ts:14

___

### show

▸ **show**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: interstitial.ts:20
