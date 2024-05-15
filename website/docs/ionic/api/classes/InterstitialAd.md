# Class: InterstitialAd

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IInterstitialAd`, `"opts"`\>

## Constructors

### new InterstitialAd()

> **new InterstitialAd**(`opts`): [`InterstitialAd`](InterstitialAd.md)

#### Parameters

• **opts**

• **opts.adUnitId**: `string`

#### Returns

[`InterstitialAd`](InterstitialAd.md)

#### Overrides

`IonicNativePlugin.constructor`

#### Source

ionic/src/ngx/index.ts:78

## Properties

### obj

> `private` **obj**: `InterstitialAd`

#### Source

ionic/src/ngx/index.ts:76

***

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Source

ionic/src/ngx/index.ts:72

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Source

ionic/src/ngx/index.ts:73

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.InterstitialAd'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Source

ionic/src/ngx/index.ts:74

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

ionic/src/ngx/index.ts:84

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

ionic/src/ngx/index.ts:88

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

#### Source

ionic/src/ngx/index.ts:92

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

#### Source

ionic/src/ngx/index.ts:96

***

### on()

> **on**(...`opts`): () => `void`

#### Parameters

• ...**opts**: [`string`, `EventListenerOrEventListenerObject`, `boolean` \| `AddEventListenerOptions`]

#### Returns

`Function`

##### Returns

`void`

#### Implementation of

`Omit.on`

#### Source

ionic/src/ngx/index.ts:104

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

#### Source

ionic/src/ngx/index.ts:100
