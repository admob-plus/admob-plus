# Class: InterstitialAd

**`Internal`**

## Extends

- [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

## Constructors

### new InterstitialAd()

> **new InterstitialAd**(`opts`): [`InterstitialAd`](InterstitialAd.md)

#### Parameters

• **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Returns

[`InterstitialAd`](InterstitialAd.md)

#### Inherited from

[`MobileAd`](MobileAd.md).[`constructor`](MobileAd.md#constructors)

#### Defined in

packages/cordova/src/www/ads/base.ts:23

## Properties

### id

> `readonly` **id**: `string`

#### Inherited from

[`MobileAd`](MobileAd.md).[`id`](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/ads/base.ts:18

***

### opts

> `protected` `readonly` **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Inherited from

[`MobileAd`](MobileAd.md).[`opts`](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/ads/base.ts:20

***

### cls

> `readonly` `static` **cls**: `"InterstitialAd"` = `"InterstitialAd"`

#### Defined in

packages/cordova/src/www/ads/interstitial.ts:4

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

##### Returns

`string`

#### Inherited from

[`MobileAd`](MobileAd.md).[`adUnitId`](MobileAd.md#adunitid)

#### Defined in

packages/cordova/src/www/ads/base.ts:40

## Methods

### hide()

> `protected` **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`hide`](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/ads/base.ts:77

***

### init()

> `protected` **init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`init`](MobileAd.md#init)

#### Defined in

packages/cordova/src/www/ads/base.ts:82

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`isLoaded`](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/ads/interstitial.ts:6

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`load`](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/ads/interstitial.ts:10

***

### on()

> **on**(...`args`): () => `void`

#### Parameters

• ...**args**: [`string`, (`ev`) => `any`, `boolean`]

#### Returns

`Function`

##### Returns

`void`

#### Inherited from

[`MobileAd`](MobileAd.md).[`on`](MobileAd.md#on)

#### Defined in

packages/cordova/src/www/ads/base.ts:44

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`show`](MobileAd.md#show)

#### Defined in

packages/cordova/src/www/ads/interstitial.ts:14

***

### getAdById()

> `static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Parameters

• **id**: `string`

#### Returns

[`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`getAdById`](MobileAd.md#getadbyid)

#### Defined in

packages/cordova/src/www/ads/base.ts:36
