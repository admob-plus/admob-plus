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

• `Readonly` **AppOpenAd**: typeof [`AppOpenAd`](AppOpenAd.md) = `ads.AppOpenAd`

#### Defined in

packages/cordova/src/www/index.ts:8

___

### BannerAd

• `Readonly` **BannerAd**: typeof [`BannerAd`](BannerAd.md) = `ads.BannerAd`

#### Defined in

packages/cordova/src/www/index.ts:9

___

### Events

• `Readonly` **Events**: typeof [`Events`](../enums/Events.md) = `Events`

#### Defined in

packages/cordova/src/www/index.ts:16

___

### InterstitialAd

• `Readonly` **InterstitialAd**: typeof [`InterstitialAd`](InterstitialAd.md) = `ads.InterstitialAd`

#### Defined in

packages/cordova/src/www/index.ts:10

___

### NativeAd

• `Readonly` **NativeAd**: typeof [`NativeAd`](NativeAd.md) = `ads.NativeAd`

#### Defined in

packages/cordova/src/www/index.ts:11

___

### RewardedAd

• `Readonly` **RewardedAd**: typeof [`RewardedAd`](RewardedAd.md) = `ads.RewardedAd`

#### Defined in

packages/cordova/src/www/index.ts:12

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: typeof [`RewardedInterstitialAd`](RewardedInterstitialAd.md) = `ads.RewardedInterstitialAd`

#### Defined in

packages/cordova/src/www/index.ts:13

___

### WebViewAd

• `Readonly` **WebViewAd**: typeof [`WebViewAd`](WebViewAd.md) = `ads.WebViewAd`

#### Defined in

packages/cordova/src/www/index.ts:14

___

### \_startPromise

• `Private` **\_startPromise**: `undefined` \| `Promise`<{ `version`: `string`  }\>

#### Defined in

packages/cordova/src/www/index.ts:18

## Methods

### \_start

▸ `Private` **_start**(): `Promise`<{ `version`: `string`  }\>

#### Returns

`Promise`<{ `version`: `string`  }\>

#### Defined in

packages/cordova/src/www/index.ts:28

___

### configure

▸ **configure**(`config`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AdMobConfig`](../interfaces/AdMobConfig.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

packages/cordova/src/www/index.ts:20

___

### start

▸ **start**(): `Promise`<{ `version`: `string`  }\>

#### Returns

`Promise`<{ `version`: `string`  }\>

#### Defined in

packages/cordova/src/www/index.ts:24
