---
id: "nativead"
title: "Class: NativeAd"
sidebar_label: "NativeAd"
sidebar_position: 0
custom_edit_url: null
---

# Class: NativeAd

## Hierarchy

- [*MobileAd*](mobilead.md)

  ↳ **NativeAd**

## Constructors

### constructor

\+ **new NativeAd**(`opts`: [*MobileAdOptions*](../index.md#mobileadoptions)): [*NativeAd*](nativead.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [*MobileAdOptions*](../index.md#mobileadoptions) |

**Returns:** [*NativeAd*](nativead.md)

Overrides: [MobileAd](mobilead.md)

Defined in: native.ts:13

## Properties

### \_init

• **\_init**: ``null`` \| *Promise*<void\>

Defined in: native.ts:13

___

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

### load

▸ **load**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: native.ts:43

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
