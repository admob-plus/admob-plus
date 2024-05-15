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

#### Source

ionic/src/ngx/index.ts:160

## Properties

### obj

> `private` **obj**: `RewardedInterstitialAd`

#### Source

ionic/src/ngx/index.ts:158

***

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Source

ionic/src/ngx/index.ts:154

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Source

ionic/src/ngx/index.ts:155

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob.RewardedInterstitialAd'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Source

ionic/src/ngx/index.ts:156

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

ionic/src/ngx/index.ts:166

***

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

ionic/src/ngx/index.ts:170

## Methods

### isLoaded()

> **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`Omit.isLoaded`

#### Source

ionic/src/ngx/index.ts:174

***

### load()

> **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`Omit.load`

#### Source

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

#### Source

ionic/src/ngx/index.ts:186

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.show`

#### Source

ionic/src/ngx/index.ts:182
