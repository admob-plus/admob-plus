---
id: "AdMobPlusPlugin"
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

definitions.ts:38

___

### adHide

▸ **adHide**(`opts`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

definitions.ts:42

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

definitions.ts:39

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

definitions.ts:40

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

definitions.ts:41

___

### addListener

▸ **addListener**(`eventName`, `listenerFunc`): `Promise`<`PluginListenerHandle`\> & `PluginListenerHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listenerFunc` | (`event`: `any`) => `void` |

#### Returns

`Promise`<`PluginListenerHandle`\> & `PluginListenerHandle`

#### Defined in

definitions.ts:51

___

### configRequest

▸ **configRequest**(`requestConfig`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestConfig` | [`RequestConfig`](../index.md#requestconfig) |

#### Returns

`Promise`<`void`\>

#### Defined in

definitions.ts:36

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

definitions.ts:35

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Defined in

definitions.ts:47

___

### start

▸ **start**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

definitions.ts:34

___

### trackingAuthorizationStatus

▸ **trackingAuthorizationStatus**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Defined in

definitions.ts:44
