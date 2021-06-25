---
id: "appopenad"
title: "Class: AppOpenAd"
sidebar_label: "AppOpenAd"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MobileAd`](mobilead.md)<[`MobileAdOptions`](../index.md#mobileadoptions) & { `orientation`: `AppOpenAdOrientation`  }\>

  ↳ **`AppOpenAd`**

## Constructors

### constructor

• **new AppOpenAd**(`opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`MobileAdOptions`](../index.md#mobileadoptions) & { `orientation`: `AppOpenAdOrientation`  } |

#### Inherited from

[MobileAd](mobilead.md).[constructor](mobilead.md#constructor)

#### Defined in

api.ts:18

## Properties

### id

• `Readonly` **id**: `number`

#### Inherited from

[MobileAd](mobilead.md).[id](mobilead.md#id)

#### Defined in

api.ts:15

___

### opts

• `Protected` `Readonly` **opts**: [`MobileAdOptions`](../index.md#mobileadoptions) & { `orientation`: `AppOpenAdOrientation`  }

#### Inherited from

[MobileAd](mobilead.md).[opts](mobilead.md#opts)

#### Defined in

api.ts:17

___

### Orientation

▪ `Static` `Readonly` **Orientation**: typeof `AppOpenAdOrientation`

#### Defined in

app-open.ts:13

___

### type

▪ `Static` `Readonly` **type**: `string` = `''`

#### Inherited from

[MobileAd](mobilead.md).[type](mobilead.md#type)

#### Defined in

api.ts:10

## Accessors

### adUnitId

• `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

api.ts:42

## Methods

### hide

▸ `Protected` **hide**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[MobileAd](mobilead.md).[hide](mobilead.md#hide)

#### Defined in

api.ts:63

___

### init

▸ `Protected` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MobileAd](mobilead.md).[init](mobilead.md#init)

#### Defined in

api.ts:67

___

### isLoaded

▸ **isLoaded**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](mobilead.md).[isLoaded](mobilead.md#isloaded)

#### Defined in

app-open.ts:15

___

### load

▸ **load**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[MobileAd](mobilead.md).[load](mobilead.md#load)

#### Defined in

app-open.ts:19

___

### show

▸ **show**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[MobileAd](mobilead.md).[show](mobilead.md#show)

#### Defined in

app-open.ts:23

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

api.ts:33
