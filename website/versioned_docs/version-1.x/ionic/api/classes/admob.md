---
id: "admob"
title: "Class: AdMob"
sidebar_label: "AdMob"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `IonicNativePlugin`

  ↳ **AdMob**

## Implements

- `Omit`\<IAdMob, ``"AppOpenAd"`` \| ``"BannerAd"`` \| ``"createAd"`` \| ``"Events"`` \| ``"InterstitialAd"`` \| ``"NativeAd"`` \| ``"RewardedAd"`` \| ``"RewardedInterstitialAd"`` \| ``"TrackingAuthorizationStatus"``\>

## Constructors

### constructor

• **new AdMob**()

#### Inherited from

IonicNativePlugin.constructor

## Properties

### BannerAd

• `Readonly` **BannerAd**: typeof [BannerAd](bannerad.md)

#### Defined in

ionic/src/ngx/index.ts:191

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [InterstitialAd](interstitialad.md)

#### Defined in

ionic/src/ngx/index.ts:192

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [RewardedAd](rewardedad.md)

#### Defined in

ionic/src/ngx/index.ts:193

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [RewardedInterstitialAd](rewardedinterstitialad.md)

#### Defined in

ionic/src/ngx/index.ts:194

___

### platforms

▪ `Static` **platforms**: `string`[]

#### Overrides

IonicNativePlugin.platforms

#### Defined in

ionic/src/ngx/index.ts:185

___

### plugin

▪ `Static` **plugin**: `string`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

ionic/src/ngx/index.ts:186

___

### pluginName

▪ `Static` **pluginName**: `string`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

ionic/src/ngx/index.ts:187

___

### pluginRef

▪ `Static` **pluginRef**: `string` = 'admob'

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

ionic/src/ngx/index.ts:188

___

### repo

▪ `Static` **repo**: `string` = 'https://github.com/admob-plus/admob-plus'

#### Overrides

IonicNativePlugin.repo

#### Defined in

ionic/src/ngx/index.ts:189

## Accessors

### admob

• `Private` `get` **admob**(): `AdMob`

#### Returns

`AdMob`

#### Defined in

ionic/src/ngx/index.ts:196

## Methods

### configRequest

▸ **configRequest**(...`opts`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [requestConfig: RequestConfig] |

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

Omit.configRequest

#### Defined in

ionic/src/ngx/index.ts:200

___

### on

▸ **on**(`event`): `Observable`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |

#### Returns

`Observable`\<`any`\>

#### Defined in

ionic/src/ngx/index.ts:222

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`\<``false`` \| [TrackingAuthorizationStatus](../enums/trackingauthorizationstatus.md)\>

#### Returns

`Promise`\<``false`` \| [TrackingAuthorizationStatus](../enums/trackingauthorizationstatus.md)\>

#### Implementation of

Omit.requestTrackingAuthorization

#### Defined in

ionic/src/ngx/index.ts:218

___

### setAppMuted

▸ **setAppMuted**(...`opts`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [value: boolean] |

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

Omit.setAppMuted

#### Defined in

ionic/src/ngx/index.ts:210

___

### setAppVolume

▸ **setAppVolume**(...`opts`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [value: number] |

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

Omit.setAppVolume

#### Defined in

ionic/src/ngx/index.ts:214

___

### start

▸ **start**(): `Promise`\<`Object`\>

#### Returns

`Promise`\<`Object`\>

#### Implementation of

Omit.start

#### Defined in

ionic/src/ngx/index.ts:206
