# Class: InterstitialAd

## Extends

- `MobileAd`

## Constructors

### new InterstitialAd()

> **new InterstitialAd**(`opts`): [`InterstitialAd`](InterstitialAd.md)

#### Parameters

• **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Returns

[`InterstitialAd`](InterstitialAd.md)

#### Inherited from

`MobileAd.constructor`

#### Source

index.ts:30

## Properties

### id

> `readonly` **id**: `number`

#### Inherited from

`MobileAd.id`

#### Source

index.ts:24

***

### opts

> `protected` `readonly` **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Inherited from

`MobileAd.opts`

#### Source

index.ts:26

***

### cls

> `static` **cls**: `string` = `'InterstitialAd'`

#### Source

index.ts:95

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

index.ts:54

## Methods

### init()

> `protected` **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MobileAd.init`

#### Source

index.ts:89

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

#### Source

index.ts:97

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

#### Source

index.ts:101

***

### on()

> **on**(`eventType`, `listener`, `context`?): `EmitterSubscription`

#### Parameters

• **eventType**: `string`

• **listener**

• **context?**: `Record`\<`string`, `unknown`\>

#### Returns

`EmitterSubscription`

#### Inherited from

`MobileAd.on`

#### Source

index.ts:58

***

### show()

> **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`

#### Source

index.ts:105
