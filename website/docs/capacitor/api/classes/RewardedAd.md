# Class: RewardedAd

Defined in: index.ts:143

## Extends

- `MobileAd`

## Constructors

### Constructor

> **new RewardedAd**(`opts`): `RewardedAd`

Defined in: index.ts:30

#### Parameters

##### opts

[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Returns

`RewardedAd`

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

> `static` **cls**: `string` = `'RewardedAd'`

Defined in: index.ts:144

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

Defined in: index.ts:146

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: index.ts:150

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

***

### show()

> **show**(): `Promise`\<`void`\>

Defined in: index.ts:154

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`
