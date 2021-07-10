---
id: "admob"
title: "Class: AdMob"
sidebar_label: "AdMob"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new AdMob**()

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:47

## Properties

### AppOpenAd

• `Readonly` **AppOpenAd**: typeof [`AppOpenAd`](appopenad.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:39

___

### BannerAd

• `Readonly` **BannerAd**: typeof [`BannerAd`](bannerad.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:40

___

### Events

• `Readonly` **Events**: typeof [`Events`](../enums/events.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:46

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [`InterstitialAd`](interstitialad.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:41

___

### NativeAd

• `Readonly` **NativeAd**: typeof [`NativeAd`](nativead.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:42

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [`RewardedAd`](rewardedad.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:43

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [`RewardedInterstitialAd`](rewardedinterstitialad.md)

#### Defined in

code/github/admob-plus/packages/cordova/ts/index.ts:44

___

### TrackingAuthorizationStatus

• `Readonly` **TrackingAuthorizationStatus**: typeof [`TrackingAuthorizationStatus`](../enums/trackingauthorizationstatus.md)

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

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/trackingauthorizationstatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/trackingauthorizationstatus.md)\>

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
