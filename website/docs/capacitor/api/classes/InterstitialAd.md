# Class: InterstitialAd

Defined in: index.ts:127

## Extends

- `MobileAd`

## Constructors

### Constructor

> **new InterstitialAd**(`opts`): `InterstitialAd`

Defined in: index.ts:30

#### Parameters

##### opts

[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Returns

`InterstitialAd`

#### Inherited from

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

> `static` **cls**: `string` = `'InterstitialAd'`

Defined in: index.ts:128

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

> `protected` **hide**(): `Promise`\<`void`\>

Defined in: index.ts:61

#### Returns

`Promise`\<`void`\>

#### Inherited from

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

Defined in: index.ts:130

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: index.ts:134

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

***

### show()

> **show**(): `Promise`\<`void`\>

Defined in: index.ts:138

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`
