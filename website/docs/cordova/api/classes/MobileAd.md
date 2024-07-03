# Class: MobileAd\<T\>

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

• **T** *extends* [`MobileAdOptions`](../type-aliases/MobileAdOptions.md) = [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

## Constructors

### new MobileAd()

> **new MobileAd**\<`T`\>(`opts`): [`MobileAd`](MobileAd.md)\<`T`\>

#### Parameters

• **opts**: `T`

#### Returns

[`MobileAd`](MobileAd.md)\<`T`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:23

## Properties

### id

> `readonly` **id**: `string`

#### Defined in

packages/cordova/src/www/ads/base.ts:18

***

### opts

> `protected` `readonly` **opts**: `T`

#### Defined in

packages/cordova/src/www/ads/base.ts:20

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Defined in

packages/cordova/src/www/ads/base.ts:40

## Methods

### hide()

> `protected` **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:77

***

### init()

> `protected` **init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:82

***

### isLoaded()

> `protected` **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:61

***

### load()

> `protected` **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

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

#### Defined in

packages/cordova/src/www/ads/base.ts:44

***

### show()

> `protected` **show**(`opts`?): `Promise`\<`unknown`\>

#### Parameters

• **opts?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/base.ts:72

***

### getAdById()

> `static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Parameters

• **id**: `string`

#### Returns

[`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Defined in

packages/cordova/src/www/ads/base.ts:36
