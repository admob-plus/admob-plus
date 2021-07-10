---
id: "rewardedad"
title: "Class: RewardedAd"
sidebar_label: "RewardedAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](mobilead.md)<[`RewardedAdOptions`](../interfaces/rewardedadoptions.md)\>

  ↳ **`RewardedAd`**

## Constructors

### constructor

• **new RewardedAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`RewardedAdOptions`](../interfaces/rewardedadoptions.md) |

#### Inherited from

[MobileAd](mobilead.md).[constructor](mobilead.md#constructor)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:24

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](mobilead.md).[id](mobilead.md#id)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:21

___

### opts

• `Protected` `Readonly` **opts**: [`RewardedAdOptions`](../interfaces/rewardedadoptions.md)

#### Inherited from

[MobileAd](mobilead.md).[opts](mobilead.md#opts)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:23

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Inherited from

[MobileAd](mobilead.md).[type](mobilead.md#type)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:16

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:48

## Methods

### hide

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[MobileAd](mobilead.md).[hide](mobilead.md#hide)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:84

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](mobilead.md).[init](mobilead.md#init)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:88

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](mobilead.md).[isLoaded](mobilead.md#isloaded)

#### Defined in

code/github/admob-plus/packages/cordova/ts/rewarded.ts:13

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](mobilead.md).[load](mobilead.md#load)

#### Defined in

code/github/admob-plus/packages/cordova/ts/rewarded.ts:17

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

#### Inherited from

[MobileAd](mobilead.md).[on](mobilead.md#on)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:52

___

### show

▸ **show**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Overrides

[MobileAd](mobilead.md).[show](mobilead.md#show)

#### Defined in

code/github/admob-plus/packages/cordova/ts/rewarded.ts:21

___

### getAdById

▸ `Static` **getAdById**(`id`): [`MobileAd`](mobilead.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

[`MobileAd`](mobilead.md)<[`MobileAdOptions`](../index.md#mobileadoptions)\>

#### Inherited from

[MobileAd](mobilead.md).[getAdById](mobilead.md#getadbyid)

#### Defined in

code/github/admob-plus/packages/cordova/ts/api.ts:39
