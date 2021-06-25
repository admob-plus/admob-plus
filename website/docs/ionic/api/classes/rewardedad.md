---
id: "rewardedad"
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

ionic/src/ngx/index.ts:102

## Properties

### \_objectInstance

• `Private` **\_objectInstance**: `default`

#### Defined in

ionic/src/ngx/index.ts:102

___

### plugin

▪ `Static` **plugin**: `string`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:98

___

### pluginName

▪ `Static` **pluginName**: `string`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:99

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob.RewardedAd'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:100

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

ionic/src/ngx/index.ts:110

___

### id

• `get` **id**(): `number`

#### Returns

`number`

#### Defined in

ionic/src/ngx/index.ts:114

## Methods

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

Omit.isLoaded

#### Defined in

ionic/src/ngx/index.ts:118

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.load

#### Defined in

ionic/src/ngx/index.ts:122

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.show

#### Defined in

ionic/src/ngx/index.ts:126
