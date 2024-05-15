# Class: BannerAd

## Extends

- `MobileAd`

## Constructors

### new BannerAd()

> **new BannerAd**(`opts`): [`BannerAd`](BannerAd.md)

#### Parameters

• **opts**: [`BannerAdOptions`](../interfaces/BannerAdOptions.md)

#### Returns

[`BannerAd`](BannerAd.md)

#### Overrides

`MobileAd.constructor`

#### Source

index.ts:101

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

### #loaded

> `private` **#loaded**: `boolean` = `false`

#### Source

index.ts:99

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

> `static` **cls**: `string` = `'BannerAd'`

#### Source

index.ts:98

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

index.ts:42

## Methods

### hide()

> **hide**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.hide`

#### Source

index.ts:122

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

index.ts:108

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

#### Source

index.ts:112

***

### show()

> **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`

#### Source

index.ts:117
