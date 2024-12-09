# Class: RewardedInterstitialAd

## Extends

- `MobileAd`

## Constructors

### new RewardedInterstitialAd()

> **new RewardedInterstitialAd**(`opts`): [`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Parameters

##### opts

[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Returns

[`RewardedInterstitialAd`](RewardedInterstitialAd.md)

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

> `static` **cls**: `string` = `'RewardedInterstitialAd'`

#### Defined in

index.ts:160

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

##### Returns

`string`

#### Inherited from

`MobileAd.adUnitId`

#### Defined in

index.ts:42

## Methods

### hide()

> `protected` **hide**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MobileAd.hide`

#### Defined in

index.ts:61

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

index.ts:162

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.load`

#### Defined in

index.ts:166

***

### show()

> **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`MobileAd.show`

#### Defined in

index.ts:170
