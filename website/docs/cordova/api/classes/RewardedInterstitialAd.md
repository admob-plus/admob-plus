# Class: RewardedInterstitialAd

Defined in: packages/cordova/src/www/ads/rewarded-interstitial.ts:6

**`Internal`**

## Extends

- [`MobileAd`](MobileAd.md)\<[`RewardedInterstitialAdOptions`](../type-aliases/RewardedInterstitialAdOptions.md)\>

## Constructors

### Constructor

> **new RewardedInterstitialAd**(`opts`): `RewardedInterstitialAd`

Defined in: packages/cordova/src/www/ads/base.ts:23

#### Parameters

##### opts

[`RewardedAdOptions`](../interfaces/RewardedAdOptions.md)

#### Returns

`RewardedInterstitialAd`

#### Inherited from

[`MobileAd`](MobileAd.md).[`constructor`](MobileAd.md#constructor)

## Properties

### id

> `readonly` **id**: `string`

Defined in: packages/cordova/src/www/ads/base.ts:18

#### Inherited from

[`MobileAd`](MobileAd.md).[`id`](MobileAd.md#id)

***

### opts

> `protected` `readonly` **opts**: [`RewardedAdOptions`](../interfaces/RewardedAdOptions.md)

Defined in: packages/cordova/src/www/ads/base.ts:20

#### Inherited from

[`MobileAd`](MobileAd.md).[`opts`](MobileAd.md#opts)

***

### cls

> `readonly` `static` **cls**: `"RewardedInterstitialAd"` = `"RewardedInterstitialAd"`

Defined in: packages/cordova/src/www/ads/rewarded-interstitial.ts:7

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: packages/cordova/src/www/ads/base.ts:40

##### Returns

`string`

#### Inherited from

[`MobileAd`](MobileAd.md).[`adUnitId`](MobileAd.md#adunitid)

## Methods

### hide()

> `protected` **hide**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/base.ts:77

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`hide`](MobileAd.md#hide)

***

### init()

> `protected` **init**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/base.ts:82

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`init`](MobileAd.md#init)

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

Defined in: packages/cordova/src/www/ads/rewarded-interstitial.ts:9

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`isLoaded`](MobileAd.md#isloaded)

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: packages/cordova/src/www/ads/rewarded-interstitial.ts:13

#### Returns

`Promise`\<`void`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`load`](MobileAd.md#load)

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

#### Inherited from

[`MobileAd`](MobileAd.md).[`on`](MobileAd.md#on)

***

### show()

> **show**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/rewarded-interstitial.ts:17

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`show`](MobileAd.md#show)

***

### getAdById()

> `static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

Defined in: packages/cordova/src/www/ads/base.ts:36

#### Parameters

##### id

`string`

#### Returns

[`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`getAdById`](MobileAd.md#getadbyid)
