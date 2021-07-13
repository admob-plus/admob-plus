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

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:49

## Properties

### AppOpenAd

• `Readonly` **AppOpenAd**: typeof [`AppOpenAd`](AppOpenAd.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:39

___

### BannerAd

• `Readonly` **BannerAd**: typeof [`BannerAd`](BannerAd.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:40

___

### Events

• `Readonly` **Events**: typeof [`Events`](../enums/Events.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:46

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [`InterstitialAd`](InterstitialAd.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:41

___

### NativeAd

• `Readonly` **NativeAd**: typeof [`NativeAd`](NativeAd.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:42

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [`RewardedAd`](RewardedAd.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:43

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:44

___

### TrackingAuthorizationStatus

• `Readonly` **TrackingAuthorizationStatus**: typeof [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:47

## Methods

### configRequest

▸ **configRequest**(`requestConfig`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestConfig` | [`RequestConfig`](../index.md#requestconfig) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:74

___

### configure

▸ **configure**(`config`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AdMobConfig`](../index.md#admobconfig) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:70

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:90

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

code/github/admob-plus/packages/cordova/ts/index.ts:78

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

code/github/admob-plus/packages/cordova/ts/index.ts:82

___

### start

▸ **start**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:86
