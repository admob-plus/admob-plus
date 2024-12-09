# Class: InterstitialAd

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IInterstitialAd`, `"opts"`\>

## Constructors

### new InterstitialAd()

> **new InterstitialAd**(`opts`): [`InterstitialAd`](InterstitialAd.md)

#### Parameters

##### opts

###### adUnitId

`string`

#### Returns

[`InterstitialAd`](InterstitialAd.md)

#### Overrides

`IonicNativePlugin.constructor`

#### Defined in

ionic/src/ngx/index.ts:78

## Properties

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Defined in

ionic/src/ngx/index.ts:72

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Defined in

ionic/src/ngx/index.ts:73

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.InterstitialAd'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Defined in

ionic/src/ngx/index.ts:74

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

##### Returns

`string`

#### Implementation of

`Omit.adUnitId`

#### Defined in

ionic/src/ngx/index.ts:84

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Implementation of

`Omit.id`

#### Defined in

ionic/src/ngx/index.ts:88

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

#### Defined in

ionic/src/ngx/index.ts:92

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

#### Defined in

ionic/src/ngx/index.ts:96

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

ionic/src/ngx/index.ts:104

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

#### Defined in

ionic/src/ngx/index.ts:100
