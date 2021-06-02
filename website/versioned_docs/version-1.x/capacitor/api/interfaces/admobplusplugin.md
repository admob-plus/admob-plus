---
id: "admobplusplugin"
title: "Interface: AdMobPlusPlugin"
sidebar_label: "AdMobPlusPlugin"
sidebar_position: 0
custom_edit_url: null
---

## Methods

### addListener

▸ **addListener**(`eventName`, `listenerFunc`): `Promise`<PluginListenerHandle\> & `PluginListenerHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listenerFunc` | (`event`: `any`) => `void` |

#### Returns

`Promise`<PluginListenerHandle\> & `PluginListenerHandle`

#### Defined in

definitions.ts:58

___

### bannerHide

▸ **bannerHide**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `number` |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:40

___

### bannerShow

▸ **bannerShow**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.adUnitId` | `string` |
| `opts.id` | `number` |
| `opts.position?` | ``"top"`` \| ``"bottom"`` |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:35

___

### configRequest

▸ **configRequest**(`requestConfig`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestConfig` | [RequestConfig](../index.md#requestconfig) |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:33

___

### configure

▸ **configure**(`config`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [AdMobConfig](../index.md#admobconfig) |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:32

___

### interstitialLoad

▸ **interstitialLoad**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.adUnitId` | `string` |
| `opts.id` | `number` |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:42

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

definitions.ts:43

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Defined in

definitions.ts:54

___

### rewardedInterstitialLoad

▸ **rewardedInterstitialLoad**(`opts`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.adUnitId` | `string` |
| `opts.id` | `number` |

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:48

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

definitions.ts:52

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

definitions.ts:45

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

definitions.ts:46

___

### start

▸ **start**(): `Promise`<void\>

#### Returns

`Promise`<void\>

#### Defined in

definitions.ts:31
