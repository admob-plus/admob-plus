---
id: "RewardedInterstitialAd"
title: "Class: RewardedInterstitialAd"
sidebar_label: "RewardedInterstitialAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `IonicNativePlugin`

  ↳ **`RewardedInterstitialAd`**

## Implements

- `Omit`<`IRewardedInterstitialAd`, ``"opts"``\>

## Constructors

### constructor

• **new RewardedInterstitialAd**(`opts`): [`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `RewardedAdOptions` |

#### Returns

[`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Overrides

IonicNativePlugin.constructor

#### Defined in

ionic/src/ngx/index.ts:160

## Properties

### obj

• `Private` **obj**: `RewardedInterstitialAd`

#### Defined in

ionic/src/ngx/index.ts:158

___

### plugin

▪ `Static` **plugin**: `string` = `plugin`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:154

___

### pluginName

▪ `Static` **pluginName**: `string` = `pluginName`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:155

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob.RewardedInterstitialAd'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:156

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Implementation of

Omit.adUnitId

#### Defined in

ionic/src/ngx/index.ts:166

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Implementation of

Omit.id

#### Defined in

ionic/src/ngx/index.ts:170

## Methods

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

Omit.isLoaded

#### Defined in

ionic/src/ngx/index.ts:174

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.load

#### Defined in

ionic/src/ngx/index.ts:178

___

### on

▸ **on**(`...opts`): () => `void`

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

ionic/src/ngx/index.ts:186

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.show

#### Defined in

ionic/src/ngx/index.ts:182
