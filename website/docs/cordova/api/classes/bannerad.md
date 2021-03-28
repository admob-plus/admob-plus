---
id: "bannerad"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
custom_edit_url: null
hide_title: true
---

# Class: BannerAd

## Hierarchy

* [*MobileAd*](mobilead.md)<[*BannerAdOptions*](../interfaces/banneradoptions.md)\>

  ↳ **BannerAd**

## Constructors

### constructor

\+ **new BannerAd**(`opts`: [*BannerAdOptions*](../interfaces/banneradoptions.md)): [*BannerAd*](bannerad.md)

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | [*BannerAdOptions*](../interfaces/banneradoptions.md) |

**Returns:** [*BannerAd*](bannerad.md)

Overrides: [MobileAd](mobilead.md)

Defined in: banner.ts:16

## Properties

### id

• `Readonly` **id**: *number*

Inherited from: [MobileAd](mobilead.md).[id](mobilead.md#id)

Defined in: api.ts:11

___

### opts

• `Protected` `Readonly` **opts**: [*BannerAdOptions*](../interfaces/banneradoptions.md)

Inherited from: [MobileAd](mobilead.md).[opts](mobilead.md#opts)

Defined in: api.ts:13

## Accessors

### adUnitId

• get **adUnitId**(): *string*

**Returns:** *string*

Defined in: api.ts:27

## Methods

### hide

▸ **hide**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: banner.ts:29

___

### show

▸ **show**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: banner.ts:25
