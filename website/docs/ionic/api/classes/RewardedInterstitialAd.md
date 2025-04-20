# Class: RewardedInterstitialAd

Defined in: ionic/src/ngx/index.ts:150

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IRewardedInterstitialAd`, `"opts"`\>

## Constructors

### Constructor

> **new RewardedInterstitialAd**(`opts`): `RewardedInterstitialAd`

Defined in: ionic/src/ngx/index.ts:160

#### Parameters

##### opts

`RewardedAdOptions`

#### Returns

`RewardedInterstitialAd`

#### Overrides

`IonicNativePlugin.constructor`

## Properties

### plugin

> `static` **plugin**: `string`

Defined in: ionic/src/ngx/index.ts:154

#### Overrides

`IonicNativePlugin.plugin`

***

### pluginName

> `static` **pluginName**: `string`

Defined in: ionic/src/ngx/index.ts:155

#### Overrides

`IonicNativePlugin.pluginName`

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.RewardedInterstitialAd'`

Defined in: ionic/src/ngx/index.ts:156

#### Overrides

`IonicNativePlugin.pluginRef`

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: ionic/src/ngx/index.ts:166

##### Returns

`string`

#### Implementation of

`Omit.adUnitId`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: ionic/src/ngx/index.ts:170

##### Returns

`string`

#### Implementation of

`Omit.id`

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

Defined in: ionic/src/ngx/index.ts:174

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: ionic/src/ngx/index.ts:178

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

***

### on()

> **on**(...`opts`): () => `void`

Defined in: ionic/src/ngx/index.ts:186

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

Defined in: ionic/src/ngx/index.ts:182

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`
