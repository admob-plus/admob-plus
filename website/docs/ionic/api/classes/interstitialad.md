---
id: "interstitialad"
title: "Class: InterstitialAd"
sidebar_label: "InterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `IonicNativePlugin`

  ↳ **InterstitialAd**

## Implements

- `Omit`<IInterstitialAd, ``"opts"``\>

## Constructors

### constructor

• **new InterstitialAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.adUnitId` | `string` |

#### Overrides

IonicNativePlugin.constructor

#### Defined in

ionic/src/ngx/index.ts:65

## Properties

### \_objectInstance

• `Private` **\_objectInstance**: `default`

#### Defined in

ionic/src/ngx/index.ts:65

___

### plugin

▪ `Static` **plugin**: `string`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:61

___

### pluginName

▪ `Static` **pluginName**: `string`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:62

___

### pluginRef

▪ `Static` **pluginRef**: `string` = 'admob.InterstitialAd'

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:63

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

ionic/src/ngx/index.ts:73

___

### id

• `get` **id**(): `number`

#### Returns

`number`

#### Defined in

ionic/src/ngx/index.ts:77

## Methods

### isLoaded

▸ **isLoaded**(): `Promise`<boolean\>

#### Returns

`Promise`<boolean\>

#### Implementation of

Omit.isLoaded

#### Defined in

ionic/src/ngx/index.ts:81

___

### load

▸ **load**(): `Promise`<void\>

#### Returns

`Promise`<void\>

#### Implementation of

Omit.load

#### Defined in

ionic/src/ngx/index.ts:85

___

### show

▸ **show**(): `Promise`<void\>

#### Returns

`Promise`<void\>

#### Implementation of

Omit.show

#### Defined in

ionic/src/ngx/index.ts:89
