# Class: BannerAd

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IBannerAd`, `"opts"`\>

## Constructors

### new BannerAd()

> **new BannerAd**(`opts`): [`BannerAd`](BannerAd.md)

#### Parameters

• **opts**: `BannerAdOptions`

#### Returns

[`BannerAd`](BannerAd.md)

#### Overrides

`IonicNativePlugin.constructor`

#### Source

ionic/src/ngx/index.ts:37

## Properties

### obj

> `private` **obj**: `BannerAd`

#### Source

ionic/src/ngx/index.ts:35

***

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Source

ionic/src/ngx/index.ts:31

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Source

ionic/src/ngx/index.ts:32

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.BannerAd'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Source

ionic/src/ngx/index.ts:33

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

ionic/src/ngx/index.ts:43

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

ionic/src/ngx/index.ts:47

## Methods

### hide()

> **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.hide`

#### Source

ionic/src/ngx/index.ts:59

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

#### Source

ionic/src/ngx/index.ts:51

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

ionic/src/ngx/index.ts:63

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

#### Source

ionic/src/ngx/index.ts:55
