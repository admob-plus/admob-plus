---
id: "RewardedAd"
title: "Class: RewardedAd"
sidebar_label: "RewardedAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `IonicNativePlugin`

  ↳ **`RewardedAd`**

## Implements

- `Omit`<`IRewardedAd`, ``"opts"``\>

## Constructors

### constructor

• **new RewardedAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `RewardedAdOptions` |

#### Overrides

IonicNativePlugin.constructor

#### Defined in

ionic/src/ngx/index.ts:122

## Properties

### obj

• `Private` **obj**: `default`

#### Defined in

ionic/src/ngx/index.ts:120

___

### plugin

▪ `Static` **plugin**: `string` = `plugin`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:116

___

### pluginName

▪ `Static` **pluginName**: `string` = `pluginName`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:117

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob.RewardedAd'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:118

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Implementation of

Omit.adUnitId

#### Defined in

ionic/src/ngx/index.ts:128

___

### id

• `get` **id**(): `number`

#### Returns

`number`

#### Implementation of

Omit.id

#### Defined in

ionic/src/ngx/index.ts:132

## Methods

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

Omit.isLoaded

#### Defined in

ionic/src/ngx/index.ts:136

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.load

#### Defined in

ionic/src/ngx/index.ts:140

___

### on

▸ **on**(...`opts`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [type: string, listener: EventListenerOrEventListenerObject, options?: boolean \| AddEventListenerOptions] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Implementation of

Omit.on

#### Defined in

ionic/src/ngx/index.ts:148

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.show

#### Defined in

ionic/src/ngx/index.ts:144
