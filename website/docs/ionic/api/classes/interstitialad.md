---
id: "interstitialad"
title: "Class: InterstitialAd"
sidebar_label: "InterstitialAd"
custom_edit_url: null
---

# Class: InterstitialAd

## Hierarchy

* *IonicNativePlugin*

  ↳ **InterstitialAd**

## Implements

* *Omit*<IInterstitialAd, ``"opts"``\>

## Constructors

### constructor

\+ **new InterstitialAd**(`opts`: { `adUnitId`: *string*  }): [*InterstitialAd*](interstitialad.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.adUnitId` | *string* |

**Returns:** [*InterstitialAd*](interstitialad.md)

Overrides: IonicNativePlugin.constructor

Defined in: ionic/src/index.ts:63

## Properties

### \_objectInstance

• `Private` **\_objectInstance**: *default*

Defined in: ionic/src/index.ts:63

___

### plugin

▪ `Static` **plugin**: *string*

Overrides: IonicNativePlugin.plugin

Defined in: ionic/src/index.ts:59

___

### pluginName

▪ `Static` **pluginName**: *string*

Overrides: IonicNativePlugin.pluginName

Defined in: ionic/src/index.ts:60

___

### pluginRef

▪ `Static` **pluginRef**: *string*= 'admob.InterstitialAd'

Overrides: IonicNativePlugin.pluginRef

Defined in: ionic/src/index.ts:61

## Accessors

### adUnitId

• get **adUnitId**(): *string*

**Returns:** *string*

Defined in: ionic/src/index.ts:71

___

### id

• get **id**(): *number*

**Returns:** *number*

Defined in: ionic/src/index.ts:75

## Methods

### isLoaded

▸ **isLoaded**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Implementation of: Omit.isLoaded

Defined in: ionic/src/index.ts:79

___

### load

▸ **load**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Implementation of: Omit.load

Defined in: ionic/src/index.ts:83

___

### show

▸ **show**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Implementation of: Omit.show

Defined in: ionic/src/index.ts:87
