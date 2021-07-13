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

ionic/src/ngx/index.ts:31

## Properties

### \_objectInstance

• `Private` **\_objectInstance**: `default`

#### Defined in

ionic/src/ngx/index.ts:29

___

### plugin

▪ `Static` **plugin**: `string`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:25

___

### pluginName

▪ `Static` **pluginName**: `string`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:26

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob.BannerAd'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:27

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

ionic/src/ngx/index.ts:37

___

### id

• `get` **id**(): `number`

#### Returns

`number`

#### Defined in

ionic/src/ngx/index.ts:41

## Methods

### hide

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.hide

#### Defined in

ionic/src/ngx/index.ts:53

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.load

#### Defined in

ionic/src/ngx/index.ts:45

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

ionic/src/ngx/index.ts:57

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.show

#### Defined in

ionic/src/ngx/index.ts:49
