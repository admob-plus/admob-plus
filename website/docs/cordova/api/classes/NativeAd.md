# Class: NativeAd

Defined in: packages/cordova/src/www/ads/native.ts:9

**`Internal`**

## Extends

- [`MobileAd`](MobileAd.md)\<[`NativeAdOptions`](../interfaces/NativeAdOptions.md)\>

## Constructors

### Constructor

> **new NativeAd**(`opts`): `NativeAd`

Defined in: packages/cordova/src/www/ads/base.ts:23

#### Parameters

##### opts

[`NativeAdOptions`](../interfaces/NativeAdOptions.md)

#### Returns

`NativeAd`

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

> `protected` `readonly` **opts**: [`NativeAdOptions`](../interfaces/NativeAdOptions.md)

Defined in: packages/cordova/src/www/ads/base.ts:20

#### Inherited from

[`MobileAd`](MobileAd.md).[`opts`](MobileAd.md#opts)

***

### cls

> `readonly` `static` **cls**: `"NativeAd"` = `"NativeAd"`

Defined in: packages/cordova/src/www/ads/native.ts:10

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

Defined in: packages/cordova/src/www/ads/native.ts:16

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

> **isLoaded**(): `Promise`\<`boolean`\>

Defined in: packages/cordova/src/www/ads/native.ts:12

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`isLoaded`](MobileAd.md#isloaded)

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: packages/cordova/src/www/ads/native.ts:20

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

> **show**(`opts?`): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/native.ts:24

#### Parameters

##### opts?

`ShowOptions`

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`show`](MobileAd.md#show)

***

### showWith()

> **showWith**(`elm`): `Promise`\<`void`\>

Defined in: packages/cordova/src/www/ads/native.ts:34

#### Parameters

##### elm

`HTMLElement`

#### Returns

`Promise`\<`void`\>

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
