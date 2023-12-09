---
id: "NativeAd"
title: "Class: NativeAd"
sidebar_label: "NativeAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `IonicNativePlugin`

  ↳ **`NativeAd`**

## Implements

- `Omit`<`INativeAd`, ``"opts"``\>

## Constructors

### constructor

• **new NativeAd**(`opts`): [`NativeAd`](NativeAd.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `NativeAdOptions` |

#### Returns

[`NativeAd`](NativeAd.md)

#### Overrides

IonicNativePlugin.constructor

#### Defined in

ionic/src/ngx/index.ts:201

## Properties

### obj

• `Private` **obj**: `NativeAd`

#### Defined in

ionic/src/ngx/index.ts:199

___

### plugin

▪ `Static` **plugin**: `string` = `plugin`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:195

___

### pluginName

▪ `Static` **pluginName**: `string` = `pluginName`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:196

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob.NativeAd'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:197

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Implementation of

Omit.adUnitId

#### Defined in

ionic/src/ngx/index.ts:207

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Implementation of

Omit.id

#### Defined in

ionic/src/ngx/index.ts:211

## Methods

### hide

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.hide

#### Defined in

ionic/src/ngx/index.ts:227

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

Omit.isLoaded

#### Defined in

ionic/src/ngx/index.ts:215

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.load

#### Defined in

ionic/src/ngx/index.ts:219

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

ionic/src/ngx/index.ts:235

___

### show

▸ **show**(`...args`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [opts?: ShowOptions] |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.show

#### Defined in

ionic/src/ngx/index.ts:223

___

### showWith

▸ **showWith**(`...args`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [elm: HTMLElement] |

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.showWith

#### Defined in

ionic/src/ngx/index.ts:231
