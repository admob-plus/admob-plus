# Class: NativeAd

**`Internal`**

## Extends

- [`MobileAd`](MobileAd.md)\<[`NativeAdOptions`](../interfaces/NativeAdOptions.md)\>

## Constructors

### new NativeAd()

> **new NativeAd**(`opts`): [`NativeAd`](NativeAd.md)

#### Parameters

• **opts**: [`NativeAdOptions`](../interfaces/NativeAdOptions.md)

#### Returns

[`NativeAd`](NativeAd.md)

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

> `protected` `readonly` **opts**: [`NativeAdOptions`](../interfaces/NativeAdOptions.md)

#### Inherited from

[`MobileAd`](MobileAd.md).[`opts`](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/ads/base.ts:20

***

### cls

> `readonly` `static` **cls**: `"NativeAd"` = `"NativeAd"`

#### Defined in

packages/cordova/src/www/ads/native.ts:10

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

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

packages/cordova/src/www/ads/native.ts:16

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

packages/cordova/src/www/ads/native.ts:12

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`load`](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/ads/native.ts:20

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

> **show**(`opts`?): `Promise`\<`unknown`\>

#### Parameters

• **opts?**: `ShowOptions`

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`show`](MobileAd.md#show)

#### Defined in

packages/cordova/src/www/ads/native.ts:24

***

### showWith()

> **showWith**(`elm`): `Promise`\<`void`\>

#### Parameters

• **elm**: `HTMLElement`

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/cordova/src/www/ads/native.ts:34

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
