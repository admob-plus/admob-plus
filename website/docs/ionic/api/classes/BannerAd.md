---
id: "BannerAd"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `IonicNativePlugin`

  ↳ **`BannerAd`**

## Implements

- `Omit`<`IBannerAd`, ``"opts"``\>

## Constructors

### constructor

• **new BannerAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `BannerAdOptions` |

#### Overrides

IonicNativePlugin.constructor

#### Defined in

packages/ionic/src/ngx/index.ts:40

## Properties

### obj

• `Private` **obj**: `default`

#### Defined in

packages/ionic/src/ngx/index.ts:38

___

### plugin

▪ `Static` **plugin**: `string` = `plugin`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

packages/ionic/src/ngx/index.ts:34

___

### pluginName

▪ `Static` **pluginName**: `string` = `pluginName`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

packages/ionic/src/ngx/index.ts:35

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob.BannerAd'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

packages/ionic/src/ngx/index.ts:36

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Implementation of

Omit.adUnitId

#### Defined in

packages/ionic/src/ngx/index.ts:46

___

### id

• `get` **id**(): `number`

#### Returns

`number`

#### Implementation of

Omit.id

#### Defined in

packages/ionic/src/ngx/index.ts:50

## Methods

### hide

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.hide

#### Defined in

packages/ionic/src/ngx/index.ts:62

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.load

#### Defined in

packages/ionic/src/ngx/index.ts:54

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

packages/ionic/src/ngx/index.ts:66

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.show

#### Defined in

packages/ionic/src/ngx/index.ts:58
