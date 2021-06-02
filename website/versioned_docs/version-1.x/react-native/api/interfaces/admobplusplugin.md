---
id: "admobplusplugin"
title: "Interface: AdMobPlusPlugin"
sidebar_label: "AdMobPlusPlugin"
sidebar_position: 0
custom_edit_url: null
---

## Methods

### configure

▸ **configure**(`config`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [AdMobConfig](../index.md#admobconfig) |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:22

___

### interstitialLoad

▸ **interstitialLoad**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [MobileAdOptions](../index.md#mobileadoptions) & { `id`: `number`  } |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:24

___

### interstitialShow

▸ **interstitialShow**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `number` |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:25

___

### rewardedInterstitialLoad

▸ **rewardedInterstitialLoad**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [MobileAdOptions](../index.md#mobileadoptions) & { `id`: `number`  } |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:30

___

### rewardedInterstitialShow

▸ **rewardedInterstitialShow**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `number` |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:33

___

### rewardedLoad

▸ **rewardedLoad**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.adUnitId` | `string` |
| `opts.id` | `number` |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:27

___

### rewardedShow

▸ **rewardedShow**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `number` |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:28

___

### start

▸ **start**(): `Promise`<void\>

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:21
