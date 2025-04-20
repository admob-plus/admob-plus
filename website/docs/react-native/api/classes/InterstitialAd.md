# Class: InterstitialAd

Defined in: index.ts:94

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

Defined in: index.ts:24

#### Inherited from

`MobileAd.id`

***

### opts

> `protected` `readonly` **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

Defined in: index.ts:26

#### Inherited from

`MobileAd.opts`

***

### cls

> `static` **cls**: `string` = `'InterstitialAd'`

Defined in: index.ts:95

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: index.ts:54

##### Returns

`string`

#### Inherited from

`MobileAd.adUnitId`

## Methods

### init()

> `protected` **init**(): `Promise`\<`void`\>

Defined in: index.ts:89

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MobileAd.init`

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

Defined in: index.ts:97

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: index.ts:101

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

***

### on()

> **on**(`eventType`, `listener`, `context?`): `EmitterSubscription`

Defined in: index.ts:58

#### Parameters

##### eventType

`string`

##### listener

(`event`) => `void`

##### context?

`Record`\<`string`, `unknown`\>

#### Returns

`EmitterSubscription`

#### Inherited from

`MobileAd.on`

***

### show()

> **show**(): `Promise`\<`void`\>

Defined in: index.ts:105

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`
