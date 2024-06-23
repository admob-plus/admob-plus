# Class: RewardedInterstitialAd

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IRewardedInterstitialAd`, `"opts"`\>

## Constructors

### new RewardedInterstitialAd()

> **new RewardedInterstitialAd**(`opts`): [`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Parameters

• **opts**: `RewardedAdOptions`

#### Returns

[`RewardedInterstitialAd`](RewardedInterstitialAd.md)

#### Overrides

`IonicNativePlugin.constructor`

#### Defined in

ionic/src/ngx/index.ts:160

## Properties

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Defined in

ionic/src/ngx/index.ts:154

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Defined in

ionic/src/ngx/index.ts:155

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.RewardedInterstitialAd'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Defined in

ionic/src/ngx/index.ts:156

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Implementation of

`Omit.adUnitId`

#### Defined in

ionic/src/ngx/index.ts:166

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Implementation of

`Omit.id`

#### Defined in

ionic/src/ngx/index.ts:170

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

#### Defined in

ionic/src/ngx/index.ts:174

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

#### Defined in

ionic/src/ngx/index.ts:178

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

#### Defined in

ionic/src/ngx/index.ts:186

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

#### Defined in

ionic/src/ngx/index.ts:182
