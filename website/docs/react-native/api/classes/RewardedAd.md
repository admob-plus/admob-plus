# Class: RewardedAd

## Extends

- `MobileAd`

## Constructors

### new RewardedAd()

> **new RewardedAd**(`opts`): [`RewardedAd`](RewardedAd.md)

#### Parameters

##### opts

[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Returns

[`RewardedAd`](RewardedAd.md)

#### Inherited from

`MobileAd.constructor`

#### Defined in

index.ts:30

## Properties

### id

> `readonly` **id**: `number`

#### Inherited from

`MobileAd.id`

#### Defined in

index.ts:24

***

### opts

> `protected` `readonly` **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Inherited from

`MobileAd.opts`

#### Defined in

index.ts:26

***

### cls

> `static` **cls**: `string` = `'RewardedAd'`

#### Defined in

index.ts:111

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

##### Returns

`string`

#### Inherited from

`MobileAd.adUnitId`

#### Defined in

index.ts:54

## Methods

### init()

> `protected` **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MobileAd.init`

#### Defined in

index.ts:89

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

#### Defined in

index.ts:113

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

#### Defined in

index.ts:117

***

### on()

> **on**(`eventType`, `listener`, `context`?): `EmitterSubscription`

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

#### Defined in

index.ts:58

***

### show()

> **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`

#### Defined in

index.ts:121
