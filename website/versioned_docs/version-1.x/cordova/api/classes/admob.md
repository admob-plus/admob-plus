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

index.ts:49

## Properties

### AppOpenAd

• `Readonly` **AppOpenAd**: typeof [AppOpenAd](appopenad.md)

#### Defined in

index.ts:39

___

### BannerAd

• `Readonly` **BannerAd**: typeof [BannerAd](bannerad.md)

#### Defined in

index.ts:40

___

### Events

• `Readonly` **Events**: typeof [Events](../enums/events.md)

#### Defined in

index.ts:46

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [InterstitialAd](interstitialad.md)

#### Defined in

index.ts:41

___

### NativeAd

• `Readonly` **NativeAd**: typeof [NativeAd](nativead.md)

#### Defined in

index.ts:42

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [RewardedAd](rewardedad.md)

#### Defined in

index.ts:43

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [RewardedInterstitialAd](rewardedinterstitialad.md)

#### Defined in

index.ts:44

___

### TrackingAuthorizationStatus

• `Readonly` **TrackingAuthorizationStatus**: typeof [TrackingAuthorizationStatus](../enums/trackingauthorizationstatus.md)

#### Defined in

index.ts:47

___

### createAd

• `Readonly` **createAd**: <Ad, O\>(`cls`: { `type`: `string`  }, `opts`: `O`) => `Promise`<InstanceType<typeof [MobileAd](mobilead.md)\>\>

#### Type declaration

▸ <Ad, O\>(`cls`, `opts`): `Promise`<InstanceType<typeof [MobileAd](mobilead.md)\>\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Ad` | `Ad`: [MobileAd](mobilead.md)<[MobileAdOptions](../index.md#mobileadoptions), Ad\> |
| `O` | `O` = `O` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `cls` | `Object` |
| `cls.type` | `string` |
| `opts` | `O` |

##### Returns

`Promise`<InstanceType<typeof [MobileAd](mobilead.md)\>\>

#### Defined in

index.ts:49

## Methods

### configRequest

▸ **configRequest**(`requestConfig`): `Promise`<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestConfig` | [RequestConfig](../index.md#requestconfig) |

#### Returns

`Promise`<unknown\>

#### Defined in

index.ts:72

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [TrackingAuthorizationStatus](../enums/trackingauthorizationstatus.md)\>

#### Returns

`Promise`<``false`` \| [TrackingAuthorizationStatus](../enums/trackingauthorizationstatus.md)\>

#### Defined in

index.ts:88

___

### setAppMuted

▸ **setAppMuted**(`value`): `Promise`<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`Promise`<unknown\>

#### Defined in

index.ts:76

___

### setAppVolume

▸ **setAppVolume**(`value`): `Promise`<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`Promise`<unknown\>

#### Defined in

index.ts:80

___

### start

▸ **start**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Defined in

index.ts:84
