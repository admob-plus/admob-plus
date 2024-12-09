# Class: RewardedAd

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IRewardedAd`, `"opts"`\>

## Constructors

### new RewardedAd()

> **new RewardedAd**(`opts`): [`RewardedAd`](RewardedAd.md)

#### Parameters

##### opts

`RewardedAdOptions`

#### Returns

[`RewardedAd`](RewardedAd.md)

#### Overrides

`IonicNativePlugin.constructor`

#### Defined in

ionic/src/ngx/index.ts:119

## Properties

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Defined in

ionic/src/ngx/index.ts:113

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Defined in

ionic/src/ngx/index.ts:114

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.RewardedAd'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Defined in

ionic/src/ngx/index.ts:115

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

##### Returns

`string`

#### Implementation of

`Omit.adUnitId`

#### Defined in

ionic/src/ngx/index.ts:125

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Implementation of

`Omit.id`

#### Defined in

ionic/src/ngx/index.ts:129

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

#### Defined in

ionic/src/ngx/index.ts:133

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

#### Defined in

ionic/src/ngx/index.ts:137

***

### on()

> **on**(...`opts`): () => `void`

#### Parameters

##### opts

...[`string`, `EventListenerOrEventListenerObject`, `boolean` \| `AddEventListenerOptions`]

#### Returns

`Function`

##### Returns

`void`

#### Implementation of

`Omit.on`

#### Defined in

ionic/src/ngx/index.ts:145

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

#### Defined in

ionic/src/ngx/index.ts:141
