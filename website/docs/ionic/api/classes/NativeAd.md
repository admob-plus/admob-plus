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

• **new NativeAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `NativeAdOptions` |

#### Overrides

IonicNativePlugin.constructor

#### Defined in

packages/ionic/src/ngx/index.ts:204

## Properties

### obj

• `Private` **obj**: `default`

#### Defined in

packages/ionic/src/ngx/index.ts:202

___

### plugin

▪ `Static` **plugin**: `string` = `plugin`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

packages/ionic/src/ngx/index.ts:198

___

### pluginName

▪ `Static` **pluginName**: `string` = `pluginName`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

packages/ionic/src/ngx/index.ts:199

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob.NativeAd'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

packages/ionic/src/ngx/index.ts:200

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Implementation of

Omit.adUnitId

#### Defined in

packages/ionic/src/ngx/index.ts:210

___

### id

• `get` **id**(): `number`

#### Returns

`number`

#### Implementation of

Omit.id

#### Defined in

packages/ionic/src/ngx/index.ts:214

## Methods

### hide

▸ **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.hide

#### Defined in

packages/ionic/src/ngx/index.ts:230

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

Omit.isLoaded

#### Defined in

packages/ionic/src/ngx/index.ts:218

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.load

#### Defined in

packages/ionic/src/ngx/index.ts:222

___

### on

▸ **on**(...`opts`): () => `void`

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

packages/ionic/src/ngx/index.ts:238

___

### show

▸ **show**(...`args`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [opts?: ShowOptions] |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.show

#### Defined in

packages/ionic/src/ngx/index.ts:226

___

### showWith

▸ **showWith**(...`args`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [elm: HTMLElement] |

#### Returns

`Promise`<`void`\>

#### Implementation of

Omit.showWith

#### Defined in

packages/ionic/src/ngx/index.ts:234
