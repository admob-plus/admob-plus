---
id: "admobplusplugin"
title: "Interface: AdMobPlusPlugin"
sidebar_label: "AdMobPlusPlugin"
sidebar_position: 0
custom_edit_url: null
---

# Interface: AdMobPlusPlugin

## Methods

### addListener

▸ **addListener**(`eventName`: *string*, `listenerFunc`: (`event`: *any*) => *void*): *Promise*<PluginListenerHandle\> & PluginListenerHandle

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | *string* |
| `listenerFunc` | (`event`: *any*) => *void* |

**Returns:** *Promise*<PluginListenerHandle\> & PluginListenerHandle

Defined in: definitions.ts:58

___

### bannerHide

▸ **bannerHide**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:40

___

### bannerShow

▸ **bannerShow**(`opts`: { `adUnitId`: *string* ; `id`: *number* ; `position?`: ``"top"`` \| ``"bottom"``  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.adUnitId` | *string* |
| `opts.id` | *number* |
| `opts.position?` | ``"top"`` \| ``"bottom"`` |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:35

___

### configRequest

▸ **configRequest**(`requestConfig`: [*RequestConfig*](../index.md#requestconfig)): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestConfig` | [*RequestConfig*](../index.md#requestconfig) |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:33

___

### configure

▸ **configure**(`config`: [*AdMobConfig*](../index.md#admobconfig)): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [*AdMobConfig*](../index.md#admobconfig) |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:32

___

### interstitialLoad

▸ **interstitialLoad**(`opts`: { `adUnitId`: *string* ; `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.adUnitId` | *string* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:42

___

### interstitialShow

▸ **interstitialShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:43

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): *Promise*<{ `status`: ``false`` \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)  }\>

**Returns:** *Promise*<{ `status`: ``false`` \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)  }\>

Defined in: definitions.ts:54

___

### rewardedInterstitialLoad

▸ **rewardedInterstitialLoad**(`opts`: { `adUnitId`: *string* ; `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.adUnitId` | *string* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:48

___

### rewardedInterstitialShow

▸ **rewardedInterstitialShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:52

___

### rewardedLoad

▸ **rewardedLoad**(`opts`: { `adUnitId`: *string* ; `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.adUnitId` | *string* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:45

___

### rewardedShow

▸ **rewardedShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:46

___

### start

▸ **start**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: definitions.ts:31
