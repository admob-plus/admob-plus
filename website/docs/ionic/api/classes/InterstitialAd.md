# Class: InterstitialAd

Defined in: ionic/src/ngx/index.ts:68

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IInterstitialAd`, `"opts"`\>

## Constructors

### Constructor

> **new InterstitialAd**(`opts`): `InterstitialAd`

Defined in: ionic/src/ngx/index.ts:78

#### Parameters

##### opts

###### adUnitId

`string`

#### Returns

`InterstitialAd`

#### Overrides

`IonicNativePlugin.constructor`

## Properties

### plugin

> `static` **plugin**: `string`

Defined in: ionic/src/ngx/index.ts:72

#### Overrides

`IonicNativePlugin.plugin`

***

### pluginName

> `static` **pluginName**: `string`

Defined in: ionic/src/ngx/index.ts:73

#### Overrides

`IonicNativePlugin.pluginName`

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.InterstitialAd'`

Defined in: ionic/src/ngx/index.ts:74

#### Overrides

`IonicNativePlugin.pluginRef`

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: ionic/src/ngx/index.ts:84

##### Returns

`string`

#### Implementation of

`Omit.adUnitId`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: ionic/src/ngx/index.ts:88

##### Returns

`string`

#### Implementation of

`Omit.id`

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

Defined in: ionic/src/ngx/index.ts:92

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: ionic/src/ngx/index.ts:96

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

***

### on()

> **on**(...`opts`): () => `void`

Defined in: ionic/src/ngx/index.ts:104

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

Defined in: ionic/src/ngx/index.ts:100

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`
