# Class: RewardedAd

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IRewardedAd`, `"opts"`\>

## Constructors

### new RewardedAd()

> **new RewardedAd**(`opts`): [`RewardedAd`](RewardedAd.md)

#### Parameters

• **opts**: `RewardedAdOptions`

#### Returns

[`RewardedAd`](RewardedAd.md)

#### Overrides

`IonicNativePlugin.constructor`

#### Source

ionic/src/ngx/index.ts:119

## Properties

### obj

> `private` **obj**: `RewardedAd`

#### Source

ionic/src/ngx/index.ts:117

***

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Source

ionic/src/ngx/index.ts:113

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Source

ionic/src/ngx/index.ts:114

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.RewardedAd'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Source

ionic/src/ngx/index.ts:115

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

ionic/src/ngx/index.ts:125

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

ionic/src/ngx/index.ts:129

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

#### Source

ionic/src/ngx/index.ts:133

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

#### Source

ionic/src/ngx/index.ts:137

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

ionic/src/ngx/index.ts:145

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

#### Source

ionic/src/ngx/index.ts:141
