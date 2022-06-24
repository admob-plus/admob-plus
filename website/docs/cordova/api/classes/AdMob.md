---
id: "AdMob"
title: "Class: AdMob"
sidebar_label: "AdMob"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new AdMob**()

## Properties

### AppOpenAd

• `Readonly` **AppOpenAd**: typeof [`AppOpenAd`](AppOpenAd.md) = `AppOpenAd`

#### Defined in

packages/cordova/src/www/index.ts:39

___

### BannerAd

• `Readonly` **BannerAd**: typeof [`BannerAd`](BannerAd.md) = `BannerAd`

#### Defined in

packages/cordova/src/www/index.ts:40

___

### Events

• `Readonly` **Events**: typeof [`Events`](../enums/Events.md) = `Events`

#### Defined in

packages/cordova/src/www/index.ts:46

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [`InterstitialAd`](InterstitialAd.md) = `InterstitialAd`

#### Defined in

packages/cordova/src/www/index.ts:41

___

### NativeAd

• `Readonly` **NativeAd**: typeof [`NativeAd`](NativeAd.md) = `NativeAd`

#### Defined in

packages/cordova/src/www/index.ts:42

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [`RewardedAd`](RewardedAd.md) = `RewardedAd`

#### Defined in

packages/cordova/src/www/index.ts:43

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [`RewardedInterstitialAd`](RewardedInterstitialAd.md) = `RewardedInterstitialAd`

#### Defined in

packages/cordova/src/www/index.ts:44

___

### TrackingAuthorizationStatus

• `Readonly` **TrackingAuthorizationStatus**: typeof [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md) = `TrackingAuthorizationStatus`

#### Defined in

packages/cordova/src/www/index.ts:47

## Methods

### configRequest

▸ **configRequest**(`requestConfig`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestConfig` | [`RequestConfig`](../#requestconfig) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

packages/cordova/src/www/index.ts:53

___

### configure

▸ **configure**(`config`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AdMobConfig`](../#admobconfig) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

packages/cordova/src/www/index.ts:49

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

packages/cordova/src/www/index.ts:69

___

### setAppMuted

▸ **setAppMuted**(`value`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

packages/cordova/src/www/index.ts:57

___

### setAppVolume

▸ **setAppVolume**(`value`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

packages/cordova/src/www/index.ts:61

___

### start

▸ **start**(): `Promise`<{ `version`: `string`  }\>

#### Returns

`Promise`<{ `version`: `string`  }\>

#### Defined in

packages/cordova/src/www/index.ts:65
