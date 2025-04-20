# Class: BannerAd

Defined in: packages/cordova/src/www/ads/banner.ts:62

**`Internal`**

## Extends

- [`MobileAd`](MobileAd.md)\<[`BannerAdOptions`](../interfaces/BannerAdOptions.md)\>

## Constructors

### Constructor

> **new BannerAd**(`opts`): `BannerAd`

Defined in: packages/cordova/src/www/ads/banner.ts:67

#### Parameters

##### opts

[`BannerAdOptions`](../interfaces/BannerAdOptions.md)

#### Returns

`BannerAd`

#### Overrides

[`MobileAd`](MobileAd.md).[`constructor`](MobileAd.md#constructor)

## Properties

### id

> `readonly` **id**: `string`

Defined in: packages/cordova/src/www/ads/base.ts:18

#### Inherited from

[`MobileAd`](MobileAd.md).[`id`](MobileAd.md#id)

***

### opts

> `protected` `readonly` **opts**: [`BannerAdOptions`](../interfaces/BannerAdOptions.md)

Defined in: packages/cordova/src/www/ads/base.ts:20

#### Inherited from

[`MobileAd`](MobileAd.md).[`opts`](MobileAd.md#opts)

***

### cls

> `readonly` `static` **cls**: `"BannerAd"` = `"BannerAd"`

Defined in: packages/cordova/src/www/ads/banner.ts:63

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

> **hide**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/banner.ts:102

#### Returns

`Promise`\<`unknown`\>

#### Overrides

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

> `protected` **isLoaded**(): `Promise`\<`boolean`\>

Defined in: packages/cordova/src/www/ads/base.ts:61

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`isLoaded`](MobileAd.md#isloaded)

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: packages/cordova/src/www/ads/banner.ts:89

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

Defined in: packages/cordova/src/www/ads/banner.ts:94

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`show`](MobileAd.md#show)

***

### config()

> `static` **config**(`opts`): `false` \| `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/banner.ts:75

#### Parameters

##### opts

###### backgroundColor?

`string`

###### marginBottom?

`number`

###### marginTop?

`number`

#### Returns

`false` \| `Promise`\<`unknown`\>

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
