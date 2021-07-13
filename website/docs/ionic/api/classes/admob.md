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

• `Readonly` **BannerAd**: typeof [`BannerAd`](BannerAd.md)

#### Defined in

ionic/src/ngx/index.ts:207

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [`InterstitialAd`](InterstitialAd.md)

#### Defined in

ionic/src/ngx/index.ts:208

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [`RewardedAd`](RewardedAd.md)

#### Defined in

ionic/src/ngx/index.ts:209

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Defined in

ionic/src/ngx/index.ts:210

___

### platforms

▪ `Static` **platforms**: `string`[]

#### Overrides

IonicNativePlugin.platforms

#### Defined in

ionic/src/ngx/index.ts:201

___

### plugin

▪ `Static` **plugin**: `string`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:202

___

### pluginName

▪ `Static` **pluginName**: `string`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:203

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:204

___

### repo

▪ `Static` **repo**: `string` = `'https://github.com/admob-plus/admob-plus'`

#### Overrides

IonicNativePlugin.repo

#### Defined in

ionic/src/ngx/index.ts:205

## Accessors

### admob

• `Private` `get` **admob**(): `AdMob`

#### Returns

`AdMob`

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

ionic/src/ngx/index.ts:216

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

ionic/src/ngx/index.ts:226

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

ionic/src/ngx/index.ts:242

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Implementation of

Omit.requestTrackingAuthorization

#### Defined in

ionic/src/ngx/index.ts:238

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

ionic/src/ngx/index.ts:230

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

ionic/src/ngx/index.ts:234

___

### start

▸ **start**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Implementation of

Omit.start

#### Defined in

ionic/src/ngx/index.ts:222
