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

### #created

> `private` **#created**: `boolean` = `false`

#### Inherited from

`MobileAd.#created`

#### Source

index.ts:27

***

### #init

> `private` **#init**: `null` \| `Promise`\<`any`\> = `null`

#### Inherited from

`MobileAd.#init`

#### Source

index.ts:28

***

### id

> `readonly` **id**: `number`

#### Inherited from

`MobileAd.id`

#### Source

index.ts:23

***

### opts

> `protected` `readonly` **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Inherited from

`MobileAd.opts`

#### Source

index.ts:25

***

### cls

> `static` **cls**: `string` = `'InterstitialAd'`

#### Source

index.ts:128

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

index.ts:42

## Methods

### hide()

> `protected` **hide**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MobileAd.hide`

#### Source

index.ts:61

***

### init()

> `protected` **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MobileAd.init`

#### Source

index.ts:66

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

#### Source

index.ts:130

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

#### Source

index.ts:134

***

### show()

> **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`

#### Source

index.ts:138
