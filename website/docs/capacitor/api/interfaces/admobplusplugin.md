---
id: "admobplusplugin"
title: "Interface: AdMobPlusPlugin"
sidebar_label: "AdMobPlusPlugin"
custom_edit_url: null
hide_title: true
---

# Interface: AdMobPlusPlugin

## Methods

### bannerHide

▸ **bannerHide**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | *object* |
`opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:26

___

### bannerShow

▸ **bannerShow**(`opts`: { `adUnitId`: *string* ; `id`: *number* ; `position?`: *bottom* \| *top*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | *object* |
`opts.adUnitId` | *string* |
`opts.id` | *number* |
`opts.position?` | *bottom* \| *top* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:21

___

### configRequest

▸ **configRequest**(`requestConfig`: [*RequestConfig*](../index.md#requestconfig)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`requestConfig` | [*RequestConfig*](../index.md#requestconfig) |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:19

___

### interstitialLoad

▸ **interstitialLoad**(`opts`: { `adUnitId`: *string* ; `id`: *number*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | *object* |
`opts.adUnitId` | *string* |
`opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:28

___

### interstitialShow

▸ **interstitialShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | *object* |
`opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:29

___

### rewardedInterstitialLoad

▸ **rewardedInterstitialLoad**(`opts`: { `adUnitId`: *string* ; `id`: *number*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | *object* |
`opts.adUnitId` | *string* |
`opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:34

___

### rewardedInterstitialShow

▸ **rewardedInterstitialShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | *object* |
`opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:38

___

### rewardedLoad

▸ **rewardedLoad**(`opts`: { `adUnitId`: *string* ; `id`: *number*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | *object* |
`opts.adUnitId` | *string* |
`opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:31

___

### rewardedShow

▸ **rewardedShow**(`opts`: { `id`: *number*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | *object* |
`opts.id` | *number* |

**Returns:** *Promise*<void\>

Defined in: definitions.ts:32

___

### start

▸ **start**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: definitions.ts:17
