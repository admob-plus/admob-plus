# Class: BannerAd

Defined in: ionic/src/ngx/index.ts:27

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IBannerAd`, `"opts"`\>

## Constructors

### Constructor

> **new BannerAd**(`opts`): `BannerAd`

Defined in: ionic/src/ngx/index.ts:37

#### Parameters

##### opts

`BannerAdOptions`

#### Returns

`BannerAd`

#### Overrides

`IonicNativePlugin.constructor`

## Properties

### plugin

> `static` **plugin**: `string`

Defined in: ionic/src/ngx/index.ts:31

#### Overrides

`IonicNativePlugin.plugin`

***

### pluginName

> `static` **pluginName**: `string`

Defined in: ionic/src/ngx/index.ts:32

#### Overrides

`IonicNativePlugin.pluginName`

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.BannerAd'`

Defined in: ionic/src/ngx/index.ts:33

#### Overrides

`IonicNativePlugin.pluginRef`

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: ionic/src/ngx/index.ts:43

##### Returns

`string`

#### Implementation of

`Omit.adUnitId`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: ionic/src/ngx/index.ts:47

##### Returns

`string`

#### Implementation of

`Omit.id`

## Methods

### hide()

> **hide**(): `Promise`\<`unknown`\>

Defined in: ionic/src/ngx/index.ts:59

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.hide`

***

### load()

> **load**(): `Promise`\<`void`\>

Defined in: ionic/src/ngx/index.ts:51

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

***

### on()

> **on**(...`opts`): () => `void`

Defined in: ionic/src/ngx/index.ts:63

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

Defined in: ionic/src/ngx/index.ts:55

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`
