---
id: "MobileAd"
title: "Class: MobileAd<T>"
sidebar_label: "MobileAd"
sidebar_position: 0
custom_edit_url: null
---

**`internal`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MobileAdOptions`](../index.md#mobileadoptions)[`MobileAdOptions`](../index.md#mobileadoptions) |

## Hierarchy

- **`MobileAd`**

  ↳ [`AppOpenAd`](AppOpenAd.md)

  ↳ [`BannerAd`](BannerAd.md)

  ↳ [`InterstitialAd`](InterstitialAd.md)

  ↳ [`NativeAd`](NativeAd.md)

  ↳ [`RewardedAd`](RewardedAd.md)

  ↳ [`RewardedInterstitialAd`](RewardedInterstitialAd.md)

## Constructors

### constructor

• **new MobileAd**<`T`\>(`opts`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MobileAdOptions`](../index.md#mobileadoptions)[`MobileAdOptions`](../index.md#mobileadoptions) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `T` |

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:26

## Properties

### \_init

• `Private` **\_init**: ``null`` \| `Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:24

___

### id

• `Readonly` **id**: `number`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:21

___

### opts

• `Protected` `Readonly` **opts**: `T`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:23

___

### allAds

▪ `Static` `Private` **allAds**: `Object` = `{}`

#### Index signature

▪ [s: `number`]: [`MobileAd`](MobileAd.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:18

___

### idCounter

▪ `Static` `Private` **idCounter**: `number` = `0`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:19

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:16

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:52

## Methods

### hide

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:88

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:92

___

### isLoaded

▸ `Protected` **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:71

___

### load

▸ `Protected` **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:78

___

### on

▸ **on**(...`args`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [type: string, listener: function, useCapture?: boolean] |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:56

___

### show

▸ `Protected` **show**(`opts?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Record`<`string`, `any`\> |

#### Returns

`Promise`<`unknown`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:83

___

### getAdById

▸ `Static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`MobileAd`](MobileAd.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:43

___

### nextId

▸ `Static` `Private` **nextId**(): `number`

#### Returns

`number`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:47
