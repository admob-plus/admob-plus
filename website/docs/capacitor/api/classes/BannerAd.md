# Class: BannerAd

Defined in: index.ts:97

## Extends

- `MobileAd`

## Constructors

### Constructor

> **new BannerAd**(`opts`): `BannerAd`

Defined in: index.ts:101

#### Parameters

##### opts

[`BannerAdOptions`](../interfaces/BannerAdOptions.md)

#### Returns

`BannerAd`

#### Overrides

`MobileAd.constructor`

## Properties

### id

> `readonly` **id**: `number`

Defined in: index.ts:23

#### Inherited from

`MobileAd.id`

***

### opts

> `protected` `readonly` **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

Defined in: index.ts:25

#### Inherited from

`MobileAd.opts`

***

### cls

> `static` **cls**: `string` = `'BannerAd'`

Defined in: index.ts:98

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: index.ts:42

##### Returns

`string`

#### Inherited from

`MobileAd.adUnitId`

## Methods

### hide()

> **hide**(): `Promise`\<`void`\>

Defined in: index.ts:122

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.hide`

***

### init()

> `protected` **init**(): `Promise`\<`void`\>

Defined in: index.ts:66

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MobileAd.init`

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

Defined in: index.ts:108

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: index.ts:112

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

***

### show()

> **show**(): `Promise`\<`void`\>

Defined in: index.ts:117

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`
