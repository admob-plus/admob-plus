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

• `Readonly` **BannerAd**: typeof [`BannerAd`](BannerAd.md) = `BannerAd`

#### Defined in

packages/ionic/src/ngx/index.ts:265

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [`InterstitialAd`](InterstitialAd.md) = `InterstitialAd`

#### Defined in

packages/ionic/src/ngx/index.ts:266

___

### NativeAd

• `Readonly` **NativeAd**: typeof [`NativeAd`](NativeAd.md) = `NativeAd`

#### Defined in

packages/ionic/src/ngx/index.ts:269

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [`RewardedAd`](RewardedAd.md) = `RewardedAd`

#### Defined in

packages/ionic/src/ngx/index.ts:267

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [`RewardedInterstitialAd`](RewardedInterstitialAd.md) = `RewardedInterstitialAd`

#### Defined in

packages/ionic/src/ngx/index.ts:268

___

### platforms

▪ `Static` **platforms**: `string`[]

#### Overrides

IonicNativePlugin.platforms

#### Defined in

packages/ionic/src/ngx/index.ts:259

___

### plugin

▪ `Static` **plugin**: `string` = `plugin`

#### Overrides

IonicNativePlugin.plugin

#### Defined in

packages/ionic/src/ngx/index.ts:260

___

### pluginName

▪ `Static` **pluginName**: `string` = `pluginName`

#### Overrides

IonicNativePlugin.pluginName

#### Defined in

packages/ionic/src/ngx/index.ts:261

___

### pluginRef

▪ `Static` **pluginRef**: `string` = `'admob'`

#### Overrides

IonicNativePlugin.pluginRef

#### Defined in

packages/ionic/src/ngx/index.ts:262

___

### repo

▪ `Static` **repo**: `string` = `'https://github.com/admob-plus/admob-plus'`

#### Overrides

IonicNativePlugin.repo

#### Defined in

packages/ionic/src/ngx/index.ts:263

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

packages/ionic/src/ngx/index.ts:271

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

packages/ionic/src/ngx/index.ts:281

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

packages/ionic/src/ngx/index.ts:297

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| `TrackingAuthorizationStatus`\>

#### Returns

`Promise`<``false`` \| `TrackingAuthorizationStatus`\>

#### Implementation of

Omit.requestTrackingAuthorization

#### Defined in

packages/ionic/src/ngx/index.ts:293

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

packages/ionic/src/ngx/index.ts:285

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

packages/ionic/src/ngx/index.ts:289

___

### start

▸ **start**(): `Promise`<{}\>

#### Returns

`Promise`<{}\>

#### Implementation of

Omit.start

#### Defined in

packages/ionic/src/ngx/index.ts:277
