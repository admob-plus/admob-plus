---
id: "AppOpenAd"
title: "Class: AppOpenAd"
sidebar_label: "AppOpenAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../#mobileadoptions) & { `orientation`: [`AppOpenAdOrientation`](../enums/AppOpenAdOrientation.md)  }\>

  ↳ **`AppOpenAd`**

## Constructors

### constructor

• **new AppOpenAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../#mobileadoptions) & { `orientation`: [`AppOpenAdOrientation`](../enums/AppOpenAdOrientation.md)  } |

#### Inherited from

[MobileAd](MobileAd.md).[constructor](MobileAd.md#constructor)

#### Defined in

packages/cordova/src/www/ads/base.ts:33

## Properties

### id

• `Readonly` **id**: `string`

#### Inherited from

[MobileAd](MobileAd.md).[id](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/ads/base.ts:27

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../#mobileadoptions) & { `orientation`: [`AppOpenAdOrientation`](../enums/AppOpenAdOrientation.md)  }

#### Inherited from

[MobileAd](MobileAd.md).[opts](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/ads/base.ts:29

___

### Orientation

▪ `Static` `Readonly` **Orientation**: typeof [`AppOpenAdOrientation`](../enums/AppOpenAdOrientation.md) = `AppOpenAdOrientation`

#### Defined in

packages/cordova/src/www/ads/app-open.ts:14

___

### cls

▪ `Static` `Readonly` **cls**: ``"AppOpenAd"``

#### Defined in

packages/cordova/src/www/ads/app-open.ts:13

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

### hide

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[MobileAd](MobileAd.md).[hide](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/ads/base.ts:79

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

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](MobileAd.md).[isLoaded](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/ads/app-open.ts:16

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](MobileAd.md).[load](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/ads/app-open.ts:20

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

▸ **show**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](MobileAd.md).[show](MobileAd.md#show)

#### Defined in

packages/cordova/src/www/ads/app-open.ts:24

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
