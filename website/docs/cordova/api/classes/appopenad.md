---
id: "appopenad"
title: "Class: AppOpenAd"
sidebar_label: "AppOpenAd"
sidebar_position: 0
custom_edit_url: null
---

# Class: AppOpenAd

## Hierarchy

- [*MobileAd*](mobilead.md)

  ↳ **AppOpenAd**

## Constructors

### constructor

\+ **new AppOpenAd**(`opts`: [*MobileAdOptions*](../index.md#mobileadoptions)): [*AppOpenAd*](appopenad.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [*MobileAdOptions*](../index.md#mobileadoptions) |

**Returns:** [*AppOpenAd*](appopenad.md)

Overrides: [MobileAd](mobilead.md)

Defined in: app-open.ts:3

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

Defined in: api.ts:31

## Methods

### showOrLoad

▸ **showOrLoad**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: app-open.ts:22

___

### getAdById

▸ `Static` **getAdById**(`id`: *number*): [*MobileAd*](mobilead.md)<[*MobileAdOptions*](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** [*MobileAd*](mobilead.md)<[*MobileAdOptions*](../index.md#mobileadoptions)\>

Inherited from: [MobileAd](mobilead.md)

Defined in: api.ts:22
