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

code/github/admob-plus/packages/cordova/ts/api.ts:38

## Properties

### \_created

• `Private` **\_created**: `boolean` = `false`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:35

___

### \_init

• `Private` **\_init**: ``null`` \| `Promise`<`any`\> = `null`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:36

___

### id

• `Readonly` **id**: `number`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:32

___

### opts

• `Protected` `Readonly` **opts**: `T`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:34

___

### allAds

▪ `Static` `Private` **allAds**: `Object` = `{}`

#### Index signature

▪ [s: `number`]: [`MobileAd`](MobileAd.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:29

___

### idCounter

▪ `Static` `Private` **idCounter**: `number` = `0`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:30

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:27

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:61

## Methods

### hide

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:97

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:101

___

### isLoaded

▸ `Protected` **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:80

___

### load

▸ `Protected` **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:87

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

code/github/admob-plus/packages/cordova/ts/api.ts:65

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

code/github/admob-plus/packages/cordova/ts/api.ts:92

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

code/github/admob-plus/packages/cordova/ts/api.ts:45

___

### nextId

▸ `Static` `Private` **nextId**(): `number`

#### Returns

`number`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:49
