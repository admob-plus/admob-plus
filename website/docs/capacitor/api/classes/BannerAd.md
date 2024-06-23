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

#### Defined in

index.ts:101

## Properties

### id

> `readonly` **id**: `number`

#### Inherited from

`MobileAd.id`

#### Defined in

index.ts:23

***

### opts

> `protected` `readonly` **opts**: [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Inherited from

`MobileAd.opts`

#### Defined in

index.ts:25

***

### cls

> `static` **cls**: `string` = `'BannerAd'`

#### Defined in

index.ts:98

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Inherited from

`MobileAd.adUnitId`

#### Defined in

index.ts:42

## Methods

### hide()

> **hide**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.hide`

#### Defined in

index.ts:122

***

### init()

> `protected` **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MobileAd.init`

#### Defined in

index.ts:66

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

`MobileAd.isLoaded`

#### Defined in

index.ts:108

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

#### Defined in

index.ts:112

***

### show()

> **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`

#### Defined in

index.ts:117
