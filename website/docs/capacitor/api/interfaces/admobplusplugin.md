---
id: "admobplusplugin"
title: "Interface: AdMobPlusPlugin"
sidebar_label: "AdMobPlusPlugin"
sidebar_position: 0
custom_edit_url: null
---

# Interface: AdMobPlusPlugin

## Methods

### bannerHide

▸ **bannerHide**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:31

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

Defined in: definitions.ts:26

___

### configRequest

▸ **configRequest**(`requestConfig`: [*RequestConfig*](../index.md#requestconfig)): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestConfig` | [*RequestConfig*](../index.md#requestconfig) |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:24

___

### configure

▸ **configure**(`config`: [*AdMobConfig*](../index.md#admobconfig)): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [*AdMobConfig*](../index.md#admobconfig) |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:23

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

Defined in: definitions.ts:33

___

### interstitialShow

▸ **interstitialShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:34

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

Defined in: definitions.ts:39

___

### rewardedInterstitialShow

▸ **rewardedInterstitialShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:43

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

Defined in: definitions.ts:36

___

### rewardedShow

▸ **rewardedShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | *object* |
| `opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:37

___

### start

▸ **start**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: definitions.ts:22
