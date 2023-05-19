---
id: "InterstitialAd"
title: "Class: InterstitialAd"
sidebar_label: "InterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `IonicNativePlugin`

  ↳ **`InterstitialAd`**

## Implements

- `Omit`<`IInterstitialAd`, ``"opts"``\>

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

packages/ionic/src/ngx/index.ts:81

## Properties

### obj

• `Private` **obj**: `default`

#### Defined in

packages/ionic/src/ngx/index.ts:79

___

### plugin

▪ `Static` **plugin**: `string` = `plugin`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

packages/ionic/src/ngx/index.ts:75

___

### pluginName

▪ `Static` **pluginName**: `string` = `pluginName`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

packages/ionic/src/ngx/index.ts:76

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob.InterstitialAd'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

packages/ionic/src/ngx/index.ts:77

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Implementation of

Omit.adUnitId

#### Defined in

packages/ionic/src/ngx/index.ts:87

___

### id

• `get` **id**(): `number`

#### Returns

`number`

#### Implementation of

Omit.id

#### Defined in

packages/ionic/src/ngx/index.ts:91

## Methods

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

Omit.isLoaded

#### Defined in

packages/ionic/src/ngx/index.ts:95

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.load

#### Defined in

packages/ionic/src/ngx/index.ts:99

___

### on

▸ **on**(`...opts`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [type: string, listener: Function, useCapture?: boolean] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Implementation of

Omit.on

#### Defined in

packages/ionic/src/ngx/index.ts:107

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.show

#### Defined in

packages/ionic/src/ngx/index.ts:103
