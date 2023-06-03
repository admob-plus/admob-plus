---
id: "WebViewAd"
title: "Class: WebViewAd"
sidebar_label: "WebViewAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd.md)<[`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)\>

  ↳ **`WebViewAd`**

## Constructors

### constructor

• **new WebViewAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`WebViewAdOptions`](../interfaces/WebViewAdOptions.md) |

#### Overrides

[MobileAd](MobileAd.md).[constructor](MobileAd.md#constructor)

#### Defined in

packages/cordova/src/www/ads/webview.ts:25

## Properties

### \_adsense

• `Private` **\_adsense**: `string` = `''`

#### Defined in

packages/cordova/src/www/ads/webview.ts:21

___

### \_historyCurrentHref

• `Private` **\_historyCurrentHref**: `string` = `''`

#### Defined in

packages/cordova/src/www/ads/webview.ts:23

___

### \_loaded

• `Private` **\_loaded**: `boolean` = `false`

#### Defined in

packages/cordova/src/www/ads/webview.ts:19

___

### \_originalHref

• `Private` **\_originalHref**: `any`

#### Defined in

packages/cordova/src/www/ads/webview.ts:22

___

### \_src

• `Private` **\_src**: `string` = `''`

#### Defined in

packages/cordova/src/www/ads/webview.ts:20

___

### id

• `Readonly` **id**: `string`

#### Inherited from

[MobileAd](MobileAd.md).[id](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/ads/base.ts:27

___

### opts

• `Protected` `Readonly` **opts**: [`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)

#### Inherited from

[MobileAd](MobileAd.md).[opts](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/ads/base.ts:29

___

### cls

▪ `Static` `Readonly` **cls**: ``"WebViewAd"``

#### Defined in

packages/cordova/src/www/ads/webview.ts:11

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Inherited from

MobileAd.adUnitId

#### Defined in

packages/cordova/src/www/ads/base.ts:44

## Methods

### addAd

▸ **addAd**(`opts`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.element` | `HTMLElement` |
| `opts.format?` | `string` |
| `opts.fullWidth?` | `boolean` |
| `opts.html?` | `string` |
| `opts.slot` | `string` |

#### Returns

`boolean`

#### Defined in

packages/cordova/src/www/ads/webview.ts:77

___

### hide

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[MobileAd](MobileAd.md).[hide](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/ads/base.ts:79

___

### historyCurrentHref

▸ `Private` **historyCurrentHref**(): `any`

#### Returns

`any`

#### Defined in

packages/cordova/src/www/ads/webview.ts:166

___

### historyOriginalHref

▸ `Private` **historyOriginalHref**(): `any`

#### Returns

`any`

#### Defined in

packages/cordova/src/www/ads/webview.ts:162

___

### historyReplaceState

▸ `Private` **historyReplaceState**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

packages/cordova/src/www/ads/webview.ts:141

___

### historyRestoreOriginalHref

▸ `Private` **historyRestoreOriginalHref**(): `void`

#### Returns

`void`

#### Defined in

packages/cordova/src/www/ads/webview.ts:170

___

### historySetPage

▸ `Private` **historySetPage**(`page`, `parameters?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `string` |
| `parameters` | `Object` |

#### Returns

`string`

#### Defined in

packages/cordova/src/www/ads/webview.ts:150

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](MobileAd.md).[init](MobileAd.md#init)

#### Defined in

packages/cordova/src/www/ads/base.ts:84

___

### isLoaded

▸ `Protected` **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[MobileAd](MobileAd.md).[isLoaded](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/ads/base.ts:63

___

### isNodeScript

▸ `Private` **isNodeScript**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `any` |

#### Returns

`boolean`

#### Defined in

packages/cordova/src/www/ads/webview.ts:137

___

### load

▸ `Protected` **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](MobileAd.md).[load](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/ads/base.ts:68

___

### nodeScriptClone

▸ `Private` **nodeScriptClone**(`node`): `HTMLScriptElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `any` |

#### Returns

`HTMLScriptElement`

#### Defined in

packages/cordova/src/www/ads/webview.ts:127

___

### nodeScriptReplace

▸ `Private` **nodeScriptReplace**(`node`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `any` |

#### Returns

`any`

#### Defined in

packages/cordova/src/www/ads/webview.ts:115

___

### on

▸ **on**(`...args`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [type: string, listener: Function, useCapture?: boolean] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

[MobileAd](MobileAd.md).[on](MobileAd.md#on)

#### Defined in

packages/cordova/src/www/ads/base.ts:48

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[show](MobileAd.md#show)

#### Defined in

packages/cordova/src/www/ads/webview.ts:174

___

### checkIntegration

▸ `Static` **checkIntegration**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

packages/cordova/src/www/ads/webview.ts:13

___

### getAdById

▸ `Static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../#mobileadoptions)\>

#### Inherited from

[MobileAd](MobileAd.md).[getAdById](MobileAd.md#getadbyid)

#### Defined in

packages/cordova/src/www/ads/base.ts:40
