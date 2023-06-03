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

- `Omit`<`IAdMob`, ``"AppOpenAd"`` \| ``"BannerAd"`` \| ``"BannerAd"`` \| ``"configRequest"`` \| ``"Events"`` \| ``"InterstitialAd"`` \| ``"InterstitialAd"`` \| ``"NativeAd"`` \| ``"NativeAd"`` \| ``"requestTrackingAuthorization"`` \| ``"RewardedAd"`` \| ``"RewardedAd"`` \| ``"RewardedInterstitialAd"`` \| ``"RewardedInterstitialAd"`` \| ``"setAppMuted"`` \| ``"setAppVolume"`` \| ``"TrackingAuthorizationStatus"`` \| ``"WebViewAd"``\>

## Constructors

### constructor

• **new AdMob**()

#### Inherited from

IonicNativePlugin.constructor

## Properties

### platforms

▪ `Static` **platforms**: `string`[]

#### Overrides

IonicNativePlugin.platforms

#### Defined in

packages/ionic/src/ngx/index.ts:266

___

### plugin

▪ `Static` **plugin**: `string` = `plugin`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

packages/ionic/src/ngx/index.ts:267

___

### pluginName

▪ `Static` **pluginName**: `string` = `pluginName`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

packages/ionic/src/ngx/index.ts:268

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

packages/ionic/src/ngx/index.ts:269

___

### repo

▪ `Static` **repo**: `string` = `'https://github.com/admob-plus/admob-plus'`

#### Overrides

IonicNativePlugin.repo

#### Defined in

packages/ionic/src/ngx/index.ts:270

## Methods

### configure

▸ **configure**(`...opts`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...opts` | [config: AdMobConfig] |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

Omit.configure

#### Defined in

packages/ionic/src/ngx/index.ts:276

___

### on

▸ **on**(`event`): `Observable`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |

#### Returns

`Observable`<`unknown`\>

#### Defined in

packages/ionic/src/ngx/index.ts:280

___

### start

▸ **start**(): `Promise`<{ `version`: `string`  }\>

#### Returns

`Promise`<{ `version`: `string`  }\>

#### Implementation of

Omit.start

#### Defined in

packages/ionic/src/ngx/index.ts:272
