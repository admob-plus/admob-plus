---
id: "mobilead"
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

  ↳ [`AppOpenAd`](appopenad.md)

  ↳ [`BannerAd`](bannerad.md)

  ↳ [`InterstitialAd`](interstitialad.md)

  ↳ [`NativeAd`](nativead.md)

  ↳ [`RewardedAd`](rewardedad.md)

  ↳ [`RewardedInterstitialAd`](rewardedinterstitialad.md)

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

code/github/admob-plus/packages/cordova/ts/api.ts:18

## Properties

### \_init

• `Private` **\_init**: ``null`` \| `Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:18

___

### id

• `Readonly` **id**: `number`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:15

___

### opts

• `Protected` `Readonly` **opts**: `T`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:17

___

### allAds

▪ `Static` `Private` **allAds**: `Object` = `{}`

#### Index signature

▪ [s: `number`]: [`MobileAd`](mobilead.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:12

___

### idCounter

▪ `Static` `Private` **idCounter**: `number` = `0`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:13

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:10

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:42

## Methods

### hide

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:78

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:82

___

### isLoaded

▸ `Protected` **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:61

___

### load

▸ `Protected` **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:68

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

code/github/admob-plus/packages/cordova/ts/api.ts:46

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

code/github/admob-plus/packages/cordova/ts/api.ts:73

___

### getAdById

▸ `Static` **getAdById**(`id`): [`MobileAd`](mobilead.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`MobileAd`](mobilead.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:33

___

### nextId

▸ `Static` `Private` **nextId**(): `number`

#### Returns

`number`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:37
