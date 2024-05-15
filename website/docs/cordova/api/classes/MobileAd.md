# Class: MobileAd\<T\>

## Extended by

- [`AppOpenAd`](AppOpenAd.md)
- [`BannerAd`](BannerAd.md)
- [`InterstitialAd`](InterstitialAd.md)
- [`NativeAd`](NativeAd.md)
- [`RewardedAd`](RewardedAd.md)
- [`RewardedInterstitialAd`](RewardedInterstitialAd.md)
- [`WebViewAd`](WebViewAd.md)

## Type parameters

• **T** *extends* [`MobileAdOptions`](../type-aliases/MobileAdOptions.md) = [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

## Constructors

### new MobileAd()

> **new MobileAd**\<`T`\>(`opts`): [`MobileAd`](MobileAd.md)\<`T`\>

#### Parameters

• **opts**: `T`

#### Returns

[`MobileAd`](MobileAd.md)\<`T`\>

#### Source

packages/cordova/src/www/ads/base.ts:23

## Properties

### \_initPromise

> `private` **\_initPromise**: `undefined` \| `Promise`\<`unknown`\>

#### Source

packages/cordova/src/www/ads/base.ts:21

***

### id

> `readonly` **id**: `string`

#### Source

packages/cordova/src/www/ads/base.ts:18

***

### opts

> `protected` `readonly` **opts**: `T`

#### Source

packages/cordova/src/www/ads/base.ts:20

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

packages/cordova/src/www/ads/base.ts:40

***

### allAds

> `get` `static` `private` **allAds**(): `Record`\<`string`, [`MobileAd`](MobileAd.md) \<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>\>

#### Returns

`Record`\<`string`, [`MobileAd`](MobileAd.md) \<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>\>

#### Source

packages/cordova/src/www/ads/base.ts:30

## Methods

### \_init()

> `private` **\_init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Source

packages/cordova/src/www/ads/base.ts:87

***

### hide()

> `protected` **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Source

packages/cordova/src/www/ads/base.ts:77

***

### init()

> `protected` **init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Source

packages/cordova/src/www/ads/base.ts:82

***

### isLoaded()

> `protected` **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Source

packages/cordova/src/www/ads/base.ts:61

***

### load()

> `protected` **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

packages/cordova/src/www/ads/base.ts:66

***

### on()

> **on**(...`args`): () => `void`

#### Parameters

• ...**args**: [`string`, (`ev`) => `any`, `boolean`]

#### Returns

`Function`

##### Returns

`void`

#### Source

packages/cordova/src/www/ads/base.ts:44

***

### show()

> `protected` **show**(`opts`?): `Promise`\<`unknown`\>

#### Parameters

• **opts?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Source

packages/cordova/src/www/ads/base.ts:72

***

### getAdById()

> `static` **getAdById**(`id`): [`MobileAd`](MobileAd.md) \<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Parameters

• **id**: `string`

#### Returns

[`MobileAd`](MobileAd.md) \<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Source

packages/cordova/src/www/ads/base.ts:36
