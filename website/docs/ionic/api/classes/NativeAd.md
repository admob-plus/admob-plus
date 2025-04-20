# Class: NativeAd

Defined in: ionic/src/ngx/index.ts:191

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`INativeAd`, `"opts"`\>

## Constructors

### Constructor

> **new NativeAd**(`opts`): `NativeAd`

Defined in: ionic/src/ngx/index.ts:201

#### Parameters

##### opts

`NativeAdOptions`

#### Returns

`NativeAd`

#### Overrides

`IonicNativePlugin.constructor`

## Properties

### plugin

> `static` **plugin**: `string`

Defined in: ionic/src/ngx/index.ts:195

#### Overrides

`IonicNativePlugin.plugin`

***

### pluginName

> `static` **pluginName**: `string`

Defined in: ionic/src/ngx/index.ts:196

#### Overrides

`IonicNativePlugin.pluginName`

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.NativeAd'`

Defined in: ionic/src/ngx/index.ts:197

#### Overrides

`IonicNativePlugin.pluginRef`

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: ionic/src/ngx/index.ts:207

##### Returns

`string`

#### Implementation of

`Omit.adUnitId`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: ionic/src/ngx/index.ts:211

##### Returns

`string`

#### Implementation of

`Omit.id`

## Methods

### hide()

> **hide**(): `Promise`\<`unknown`\>

Defined in: ionic/src/ngx/index.ts:227

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.hide`

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

Defined in: ionic/src/ngx/index.ts:215

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: ionic/src/ngx/index.ts:219

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

***

### on()

> **on**(...`opts`): () => `void`

Defined in: ionic/src/ngx/index.ts:235

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

> **show**(...`args`): `Promise`\<`unknown`\>

Defined in: ionic/src/ngx/index.ts:223

#### Parameters

##### args

...\[`ShowOptions`\]

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

***

### showWith()

> **showWith**(...`args`): `Promise`\<`void`\>

Defined in: ionic/src/ngx/index.ts:231

#### Parameters

##### args

...\[`HTMLElement`\]

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.showWith`
