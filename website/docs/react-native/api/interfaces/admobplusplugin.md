---
id: "admobplusplugin"
title: "Interface: AdMobPlusPlugin"
sidebar_label: "AdMobPlusPlugin"
sidebar_position: 0
custom_edit_url: null
---

## Methods

### adCreate

▸ **adCreate**<`O`\>(`opts`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends [`MobileAdOptions`](../index.md#mobileadoptions) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `O` |

#### Returns

`Promise`<`void`\>

#### Defined in

definitions.ts:25

___

### adIsLoaded

▸ **adIsLoaded**(`opts`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

definitions.ts:26

___

### adLoad

▸ **adLoad**(`opts`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

definitions.ts:27

___

### adShow

▸ **adShow**(`opts`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

definitions.ts:28

___

### configure

▸ **configure**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AdMobConfig`](../index.md#admobconfig) |

#### Returns

`Promise`<`void`\>

#### Defined in

definitions.ts:23

___

### start

▸ **start**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

definitions.ts:22
