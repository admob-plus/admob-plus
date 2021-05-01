---
id: "bannerad"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
custom_edit_url: null
---

# Class: BannerAd

## Hierarchy

* *IonicNativePlugin*

  ↳ **BannerAd**

## Implements

* *Omit*<IBannerAd, ``"opts"``\>

## Constructors

### constructor

\+ **new BannerAd**(`opts`: *BannerAdOptions*): [*BannerAd*](bannerad.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `opts` | *BannerAdOptions* |

**Returns:** [*BannerAd*](bannerad.md)

Overrides: IonicNativePlugin.constructor

Defined in: ionic/src/index.ts:27

## Properties

### \_objectInstance

• `Private` **\_objectInstance**: *default*

Defined in: ionic/src/index.ts:27

___

### plugin

▪ `Static` **plugin**: *string*

Overrides: IonicNativePlugin.plugin

Defined in: ionic/src/index.ts:23

___

### pluginName

▪ `Static` **pluginName**: *string*

Overrides: IonicNativePlugin.pluginName

Defined in: ionic/src/index.ts:24

___

### pluginRef

▪ `Static` **pluginRef**: *string*= 'admob.BannerAd'

Overrides: IonicNativePlugin.pluginRef

Defined in: ionic/src/index.ts:25

## Accessors

### adUnitId

• get **adUnitId**(): *string*

**Returns:** *string*

Defined in: ionic/src/index.ts:35

___

### id

• get **id**(): *number*

**Returns:** *number*

Defined in: ionic/src/index.ts:39

## Methods

### hide

▸ **hide**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Implementation of: Omit.hide

Defined in: ionic/src/index.ts:51

___

### load

▸ **load**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Implementation of: Omit.load

Defined in: ionic/src/index.ts:43

___

### show

▸ **show**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Implementation of: Omit.show

Defined in: ionic/src/index.ts:47
