# Class: MobileAd\<T\>

Defined in: packages/cordova/src/www/ads/base.ts:17

**`Internal`**

## Extended by

- [`AppOpenAd`](AppOpenAd.md)
- [`BannerAd`](BannerAd.md)
- [`InterstitialAd`](InterstitialAd.md)
- [`NativeAd`](NativeAd.md)
- [`RewardedAd`](RewardedAd.md)
- [`RewardedInterstitialAd`](RewardedInterstitialAd.md)
- [`WebViewAd`](WebViewAd.md)

## Type Parameters

### T

`T` *extends* [`MobileAdOptions`](../type-aliases/MobileAdOptions.md) = [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

## Constructors

### Constructor

> **new MobileAd**\<`T`\>(`opts`): `MobileAd`\<`T`\>

Defined in: packages/cordova/src/www/ads/base.ts:23

#### Parameters

##### opts

`T`

#### Returns

`MobileAd`\<`T`\>

## Properties

### id

> `readonly` **id**: `string`

Defined in: packages/cordova/src/www/ads/base.ts:18

***

### opts

> `protected` `readonly` **opts**: `T`

Defined in: packages/cordova/src/www/ads/base.ts:20

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: packages/cordova/src/www/ads/base.ts:40

##### Returns

`string`

## Methods

### hide()

> `protected` **hide**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/base.ts:77

#### Returns

`Promise`\<`unknown`\>

***

### init()

> `protected` **init**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/base.ts:82

#### Returns

`Promise`\<`unknown`\>

***

### isLoaded()

> `protected` **isLoaded**(): `Promise`\<`boolean`\>

Defined in: packages/cordova/src/www/ads/base.ts:61

#### Returns

`Promise`\<`boolean`\>

***

### load()

> `protected` **load**(): `Promise`\<`void`\>

Defined in: packages/cordova/src/www/ads/base.ts:66

#### Returns

`Promise`\<`void`\>

***

### on()

> **on**(...`args`): () => `void`

Defined in: packages/cordova/src/www/ads/base.ts:44

#### Parameters

##### args

...\[`string`, (`ev`) => `any`, `boolean`\]

#### Returns

> (): `void`

##### Returns

`void`

***

### show()

> `protected` **show**(`opts?`): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/base.ts:72

#### Parameters

##### opts?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`unknown`\>

***

### getAdById()

> `static` **getAdById**(`id`): `MobileAd`\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

Defined in: packages/cordova/src/www/ads/base.ts:36

#### Parameters

##### id

`string`

#### Returns

`MobileAd`\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>
