---
id: "BannerAd"
title: "Class: BannerAd"
sidebar_label: "BannerAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](MobileAd.md)\<[`BannerAdOptions`](../interfaces/BannerAdOptions.md)\>

  ↳ **`BannerAd`**

## Constructors

### constructor

• **new BannerAd**(`opts`): [`BannerAd`](BannerAd.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`BannerAdOptions`](../interfaces/BannerAdOptions.md) |

#### Returns

[`BannerAd`](BannerAd.md)

#### Overrides

[MobileAd](MobileAd.md).[constructor](MobileAd.md#constructor)

#### Defined in

packages/cordova/src/www/ads/banner.ts:67

## Properties

### \_loaded

• `Private` **\_loaded**: `boolean` = `false`

#### Defined in

packages/cordova/src/www/ads/banner.ts:65

___

### id

• `Readonly` **id**: `string`

#### Inherited from

[MobileAd](MobileAd.md).[id](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/ads/base.ts:18

___

### opts

• `Protected` `Readonly` **opts**: [`BannerAdOptions`](../interfaces/BannerAdOptions.md)

#### Inherited from

[MobileAd](MobileAd.md).[opts](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/ads/base.ts:20

___

### cls

▪ `Static` `Readonly` **cls**: ``"BannerAd"``

#### Defined in

packages/cordova/src/www/ads/banner.ts:63

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Inherited from

MobileAd.adUnitId

#### Defined in

packages/cordova/src/www/ads/base.ts:40

___

### allAds

• `get` **allAds**(): `Record`\<`string`, [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>\>

#### Returns

`Record`\<`string`, [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>\>

#### Inherited from

MobileAd.allAds

#### Defined in

packages/cordova/src/www/ads/base.ts:30

## Methods

### hide

▸ **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[hide](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/ads/banner.ts:102

___

### init

▸ **init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[MobileAd](MobileAd.md).[init](MobileAd.md#init)

#### Defined in

packages/cordova/src/www/ads/base.ts:82

___

### isLoaded

▸ **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[MobileAd](MobileAd.md).[isLoaded](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/ads/base.ts:61

___

### load

▸ **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[MobileAd](MobileAd.md).[load](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/ads/banner.ts:89

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

packages/cordova/src/www/ads/base.ts:44

___

### show

▸ **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[MobileAd](MobileAd.md).[show](MobileAd.md#show)

#### Defined in

packages/cordova/src/www/ads/banner.ts:94

___

### config

▸ **config**(`opts`): ``false`` \| `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.backgroundColor?` | `string` |
| `opts.marginBottom?` | `number` |
| `opts.marginTop?` | `number` |

#### Returns

``false`` \| `Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/banner.ts:75

___

### getAdById

▸ **getAdById**(`id`): [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../#mobileadoptions)\>

#### Inherited from

[MobileAd](MobileAd.md).[getAdById](MobileAd.md#getadbyid)

#### Defined in

packages/cordova/src/www/ads/base.ts:36
