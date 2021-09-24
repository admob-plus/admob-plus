---
id: "AdMob"
title: "Class: AdMob"
sidebar_label: "AdMob"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `IonicNativePlugin`

  ↳ **`AdMob`**

## Implements

- `Omit`<`IAdMob`, ``"AppOpenAd"`` \| ``"BannerAd"`` \| ``"Events"`` \| ``"InterstitialAd"`` \| ``"NativeAd"`` \| ``"RewardedAd"`` \| ``"RewardedInterstitialAd"`` \| ``"TrackingAuthorizationStatus"``\>

## Constructors

### constructor

• **new AdMob**()

#### Inherited from

IonicNativePlugin.constructor

## Properties

### BannerAd

• `Readonly` **BannerAd**: typeof [`BannerAd`](BannerAd)

#### Defined in

ionic/src/ngx/index.ts:214

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [`InterstitialAd`](InterstitialAd)

#### Defined in

ionic/src/ngx/index.ts:215

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [`RewardedAd`](RewardedAd)

#### Defined in

ionic/src/ngx/index.ts:216

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [`RewardedInterstitialAd`](RewardedInterstitialAd)

#### Defined in

ionic/src/ngx/index.ts:217

___

### platforms

▪ `Static` **platforms**: `string`[]

#### Overrides

IonicNativePlugin.platforms

#### Defined in

ionic/src/ngx/index.ts:208

___

### plugin

▪ `Static` **plugin**: `string`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:209

___

### pluginName

▪ `Static` **pluginName**: `string`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:210

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:211

___

### repo

▪ `Static` **repo**: `string` = `'https://github.com/admob-plus/admob-plus'`

#### Overrides

IonicNativePlugin.repo

#### Defined in

ionic/src/ngx/index.ts:212

## Methods

### configRequest

▸ **configRequest**(...`opts`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [requestConfig: RequestConfig] |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.configRequest

#### Defined in

ionic/src/ngx/index.ts:219

___

### configure

▸ **configure**(...`opts`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [config: AdMobConfig] |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.configure

#### Defined in

ionic/src/ngx/index.ts:229

___

### on

▸ **on**(`event`): `Observable`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |

#### Returns

`Observable`<`any`\>

#### Defined in

ionic/src/ngx/index.ts:245

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus)\>

#### Implementation of

Omit.requestTrackingAuthorization

#### Defined in

ionic/src/ngx/index.ts:241

___

### setAppMuted

▸ **setAppMuted**(...`opts`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [value: boolean] |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.setAppMuted

#### Defined in

ionic/src/ngx/index.ts:233

___

### setAppVolume

▸ **setAppVolume**(...`opts`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [value: number] |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.setAppVolume

#### Defined in

ionic/src/ngx/index.ts:237

___

### start

▸ **start**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Implementation of

Omit.start

#### Defined in

ionic/src/ngx/index.ts:225
