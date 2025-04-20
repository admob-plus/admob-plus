# Class: RewardedInterstitialAd

Defined in: index.ts:159

## Extends

- `MobileAd`

## Constructors

### Constructor

> **new RewardedInterstitialAd**(`opts`): `RewardedInterstitialAd`

Defined in: index.ts:30

#### Parameters

##### opts

[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Returns

`RewardedInterstitialAd`

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

> `static` **cls**: `string` = `'RewardedInterstitialAd'`

Defined in: index.ts:160

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

Defined in: index.ts:162

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: index.ts:166

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

***

### show()

> **show**(): `Promise`\<`void`\>

Defined in: index.ts:170

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`
