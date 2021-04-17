---
id: "bannerad"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
custom_edit_url: null
hide_title: true
---

# Class: BannerAd

## Hierarchy

* *MobileAd*<[*BannerAdOptions*](../interfaces/banneradoptions.md)\>

  ↳ **BannerAd**

## Constructors

### constructor

\+ **new BannerAd**(`opts`: [*BannerAdOptions*](../interfaces/banneradoptions.md)): [*BannerAd*](bannerad.md)

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | [*BannerAdOptions*](../interfaces/banneradoptions.md) |

**Returns:** [*BannerAd*](bannerad.md)

Overrides: MobileAd&lt;BannerAdOptions&gt;.constructor

Defined in: index.ts:41

## Properties

### id

• `Readonly` **id**: *number*

Inherited from: MobileAd.id

Defined in: index.ts:14

___

### opts

• `Protected` `Readonly` **opts**: [*BannerAdOptions*](../interfaces/banneradoptions.md)

Inherited from: MobileAd.opts

Defined in: index.ts:16

## Accessors

### adUnitId

• get **adUnitId**(): *string*

**Returns:** *string*

Defined in: index.ts:30

## Methods

### hide

▸ **hide**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: index.ts:53

___

### show

▸ **show**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: index.ts:49
