---
id: "admob"
title: "Class: AdMob"
sidebar_label: "AdMob"
custom_edit_url: null
hide_title: true
---

# Class: AdMob

## Constructors

### constructor

\+ **new AdMob**(): [*AdMob*](admob.md)

**Returns:** [*AdMob*](admob.md)

Defined in: index.ts:36

## Properties

### BannerAd

• `Readonly` **BannerAd**: *typeof* [*BannerAd*](bannerad.md)

Defined in: index.ts:30

___

### Events

• `Readonly` **Events**: *typeof* [*Events*](../enums/events.md)

Defined in: index.ts:35

___

### InterstitialAd

• `Readonly` **InterstitialAd**: *typeof* [*InterstitialAd*](interstitialad.md)

Defined in: index.ts:31

___

### RewardedAd

• `Readonly` **RewardedAd**: *typeof* [*RewardedAd*](rewardedad.md)

Defined in: index.ts:32

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: *typeof* [*RewardedInterstitialAd*](rewardedinterstitialad.md)

Defined in: index.ts:33

___

### TrackingAuthorizationStatus

• `Readonly` **TrackingAuthorizationStatus**: *typeof* [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)

Defined in: index.ts:36

## Methods

### configRequest

▸ **configRequest**(`requestConfig`: [*RequestConfig*](../index.md#requestconfig)): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`requestConfig` | [*RequestConfig*](../index.md#requestconfig) |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:42

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): *Promise*<*false* \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)\>

**Returns:** *Promise*<*false* \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)\>

Defined in: index.ts:58

___

### setAppMuted

▸ **setAppMuted**(`value`: *boolean*): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *boolean* |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:46

___

### setAppVolume

▸ **setAppVolume**(`value`: *number*): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:50

___

### start

▸ **start**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: index.ts:54
