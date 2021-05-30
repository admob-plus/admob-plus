---
id: "admob"
title: "Class: AdMob"
sidebar_label: "AdMob"
sidebar_position: 0
custom_edit_url: null
---

# Class: AdMob

## Constructors

### constructor

\+ **new AdMob**(): [*AdMob*](admob.md)

**Returns:** [*AdMob*](admob.md)

Defined in: index.ts:48

## Properties

### AppOpenAd

• `Readonly` **AppOpenAd**: *typeof* [*AppOpenAd*](appopenad.md)

Defined in: index.ts:39

___

### BannerAd

• `Readonly` **BannerAd**: *typeof* [*BannerAd*](bannerad.md)

Defined in: index.ts:40

___

### Events

• `Readonly` **Events**: *typeof* [*Events*](../enums/events.md)

Defined in: index.ts:47

___

### InterstitialAd

• `Readonly` **InterstitialAd**: *typeof* [*InterstitialAd*](interstitialad.md)

Defined in: index.ts:41

___

### ManagedNativeAd

• `Readonly` **ManagedNativeAd**: *typeof* [*ManagedNativeAd*](managednativead.md)

Defined in: index.ts:42

___

### NativeAd

• `Readonly` **NativeAd**: *typeof* [*NativeAd*](nativead.md)

Defined in: index.ts:43

___

### RewardedAd

• `Readonly` **RewardedAd**: *typeof* [*RewardedAd*](rewardedad.md)

Defined in: index.ts:44

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: *typeof* [*RewardedInterstitialAd*](rewardedinterstitialad.md)

Defined in: index.ts:45

___

### TrackingAuthorizationStatus

• `Readonly` **TrackingAuthorizationStatus**: *typeof* [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)

Defined in: index.ts:48

## Methods

### configRequest

▸ **configRequest**(`requestConfig`: [*RequestConfig*](../index.md#requestconfig)): *Promise*<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestConfig` | [*RequestConfig*](../index.md#requestconfig) |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:71

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): *Promise*<``false`` \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)\>

**Returns:** *Promise*<``false`` \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)\>

Defined in: index.ts:87

___

### setAppMuted

▸ **setAppMuted**(`value`: *boolean*): *Promise*<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | *boolean* |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:75

___

### setAppVolume

▸ **setAppVolume**(`value`: *number*): *Promise*<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | *number* |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:79

___

### start

▸ **start**(): *Promise*<{ `version`: *string*  }\>

**Returns:** *Promise*<{ `version`: *string*  }\>

Defined in: index.ts:83
