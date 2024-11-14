# Class: BannerAd

**`Internal`**

## Extends

- [`MobileAd`](MobileAd.md)\<[`BannerAdOptions`](../interfaces/BannerAdOptions.md)\>

## Constructors

### new BannerAd()

> **new BannerAd**(`opts`): [`BannerAd`](BannerAd.md)

#### Parameters

• **opts**: [`BannerAdOptions`](../interfaces/BannerAdOptions.md)

#### Returns

[`BannerAd`](BannerAd.md)

#### Overrides

[`MobileAd`](MobileAd.md).[`constructor`](MobileAd.md#constructors)

#### Defined in

packages/cordova/src/www/ads/banner.ts:67

## Properties

### id

> `readonly` **id**: `string`

#### Inherited from

[`MobileAd`](MobileAd.md).[`id`](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/ads/base.ts:18

***

### opts

> `protected` `readonly` **opts**: [`BannerAdOptions`](../interfaces/BannerAdOptions.md)

#### Inherited from

[`MobileAd`](MobileAd.md).[`opts`](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/ads/base.ts:20

***

### cls

> `readonly` `static` **cls**: `"BannerAd"` = `"BannerAd"`

#### Defined in

packages/cordova/src/www/ads/banner.ts:63

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

> **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`hide`](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/ads/banner.ts:102

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

> `protected` **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`isLoaded`](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/ads/base.ts:61

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`load`](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/ads/banner.ts:89

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

packages/cordova/src/www/ads/banner.ts:94

***

### config()

> `static` **config**(`opts`): `false` \| `Promise`\<`unknown`\>

#### Parameters

• **opts**

• **opts.backgroundColor?**: `string`

• **opts.marginBottom?**: `number`

• **opts.marginTop?**: `number`

#### Returns

`false` \| `Promise`\<`unknown`\>

#### Defined in

packages/cordova/src/www/ads/banner.ts:75

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
