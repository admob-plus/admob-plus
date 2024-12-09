# Class: NativeAd

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`INativeAd`, `"opts"`\>

## Constructors

### new NativeAd()

> **new NativeAd**(`opts`): [`NativeAd`](NativeAd.md)

#### Parameters

##### opts

`NativeAdOptions`

#### Returns

[`NativeAd`](NativeAd.md)

#### Overrides

`IonicNativePlugin.constructor`

#### Defined in

ionic/src/ngx/index.ts:201

## Properties

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Defined in

ionic/src/ngx/index.ts:195

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Defined in

ionic/src/ngx/index.ts:196

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.NativeAd'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Defined in

ionic/src/ngx/index.ts:197

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

##### Returns

`string`

#### Implementation of

`Omit.adUnitId`

#### Defined in

ionic/src/ngx/index.ts:207

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Implementation of

`Omit.id`

#### Defined in

ionic/src/ngx/index.ts:211

## Methods

### hide()

> **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.hide`

#### Defined in

ionic/src/ngx/index.ts:227

***

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

#### Defined in

ionic/src/ngx/index.ts:215

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

#### Defined in

ionic/src/ngx/index.ts:219

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

ionic/src/ngx/index.ts:235

***

### show()

> **show**(...`args`): `Promise`\<`unknown`\>

#### Parameters

##### args

...[`ShowOptions`]

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

#### Defined in

ionic/src/ngx/index.ts:223

***

### showWith()

> **showWith**(...`args`): `Promise`\<`void`\>

#### Parameters

##### args

...[`HTMLElement`]

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.showWith`

#### Defined in

ionic/src/ngx/index.ts:231
