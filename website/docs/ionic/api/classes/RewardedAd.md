# Class: RewardedAd

Defined in: ionic/src/ngx/index.ts:109

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IRewardedAd`, `"opts"`\>

## Constructors

### Constructor

> **new RewardedAd**(`opts`): `RewardedAd`

Defined in: ionic/src/ngx/index.ts:119

#### Parameters

##### opts

`RewardedAdOptions`

#### Returns

`RewardedAd`

#### Overrides

`IonicNativePlugin.constructor`

## Properties

### plugin

> `static` **plugin**: `string`

Defined in: ionic/src/ngx/index.ts:113

#### Overrides

`IonicNativePlugin.plugin`

***

### pluginName

> `static` **pluginName**: `string`

Defined in: ionic/src/ngx/index.ts:114

#### Overrides

`IonicNativePlugin.pluginName`

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.RewardedAd'`

Defined in: ionic/src/ngx/index.ts:115

#### Overrides

`IonicNativePlugin.pluginRef`

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: ionic/src/ngx/index.ts:125

##### Returns

`string`

#### Implementation of

`Omit.adUnitId`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: ionic/src/ngx/index.ts:129

##### Returns

`string`

#### Implementation of

`Omit.id`

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

Defined in: ionic/src/ngx/index.ts:133

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: ionic/src/ngx/index.ts:137

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

***

### on()

> **on**(...`opts`): () => `void`

Defined in: ionic/src/ngx/index.ts:145

#### Parameters

##### opts

...\[`string`, `EventListenerOrEventListenerObject`, `boolean` \| `AddEventListenerOptions`\]

#### Returns

> (): `void`

##### Returns

`void`

#### Implementation of

`Omit.on`

***

### show()

> **show**(): `Promise`\<`unknown`\>

Defined in: ionic/src/ngx/index.ts:141

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`
