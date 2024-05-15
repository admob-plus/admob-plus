# Class: AdMob

## Constructors

### new AdMob()

> **new AdMob**(): [`AdMob`](AdMob.md)

#### Returns

[`AdMob`](AdMob.md)

## Properties

### AppOpenAd

> `readonly` **AppOpenAd**: *typeof* [`AppOpenAd`](AppOpenAd.md) = `ads.AppOpenAd`

#### Source

packages/cordova/src/www/index.ts:8

***

### BannerAd

> `readonly` **BannerAd**: *typeof* [`BannerAd`](BannerAd.md) = `ads.BannerAd`

#### Source

packages/cordova/src/www/index.ts:9

***

### Events

> `readonly` **Events**: *typeof* [`Events`](../enumerations/Events.md)

#### Source

packages/cordova/src/www/index.ts:16

***

### InterstitialAd

> `readonly` **InterstitialAd**: *typeof* [`InterstitialAd`](InterstitialAd.md) = `ads.InterstitialAd`

#### Source

packages/cordova/src/www/index.ts:10

***

### NativeAd

> `readonly` **NativeAd**: *typeof* [`NativeAd`](NativeAd.md) = `ads.NativeAd`

#### Source

packages/cordova/src/www/index.ts:11

***

### RewardedAd

> `readonly` **RewardedAd**: *typeof* [`RewardedAd`](RewardedAd.md) = `ads.RewardedAd`

#### Source

packages/cordova/src/www/index.ts:12

***

### RewardedInterstitialAd

> `readonly` **RewardedInterstitialAd**: *typeof* [`RewardedInterstitialAd`](RewardedInterstitialAd.md) = `ads.RewardedInterstitialAd`

#### Source

packages/cordova/src/www/index.ts:13

***

### WebViewAd

> `readonly` **WebViewAd**: *typeof* [`WebViewAd`](WebViewAd.md) = `ads.WebViewAd`

#### Source

packages/cordova/src/www/index.ts:14

***

### \_startPromise

> `private` **\_startPromise**: `undefined` \| `Promise`\<`object`\>

#### Source

packages/cordova/src/www/index.ts:18

## Methods

### \_start()

> `private` **\_start**(): `Promise`\<`object`\>

#### Returns

`Promise`\<`object`\>

##### version

> **version**: `string`

#### Source

packages/cordova/src/www/index.ts:29

***

### configure()

> **configure**(`config`): `Promise`\<`unknown`\>

#### Parameters

• **config**: [`AdMobConfig`](../interfaces/AdMobConfig.md)

#### Returns

`Promise`\<`unknown`\>

#### Source

packages/cordova/src/www/index.ts:20

***

### start()

> **start**(): `Promise`\<`object`\>

#### Returns

`Promise`\<`object`\>

##### version

> **version**: `string`

#### Source

packages/cordova/src/www/index.ts:24
