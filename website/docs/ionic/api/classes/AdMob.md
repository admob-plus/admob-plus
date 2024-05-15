# Class: AdMob

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IAdMob`, `"AppOpenAd"` \| `"BannerAd"` \| `"BannerAd"` \| `"configRequest"` \| `"Events"` \| `"InterstitialAd"` \| `"InterstitialAd"` \| `"NativeAd"` \| `"NativeAd"` \| `"requestTrackingAuthorization"` \| `"RewardedAd"` \| `"RewardedAd"` \| `"RewardedInterstitialAd"` \| `"RewardedInterstitialAd"` \| `"setAppMuted"` \| `"setAppVolume"` \| `"TrackingAuthorizationStatus"` \| `"WebViewAd"`\>

## Constructors

### new AdMob()

> **new AdMob**(): [`AdMob`](AdMob.md)

#### Returns

[`AdMob`](AdMob.md)

#### Inherited from

`IonicNativePlugin.constructor`

## Properties

### platforms

> `static` **platforms**: `string`[]

#### Overrides

`IonicNativePlugin.platforms`

#### Source

ionic/src/ngx/index.ts:266

***

### plugin

> `static` **plugin**: `string`

#### Overrides

`IonicNativePlugin.plugin`

#### Source

ionic/src/ngx/index.ts:267

***

### pluginName

> `static` **pluginName**: `string`

#### Overrides

`IonicNativePlugin.pluginName`

#### Source

ionic/src/ngx/index.ts:268

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob'`

#### Overrides

`IonicNativePlugin.pluginRef`

#### Source

ionic/src/ngx/index.ts:269

***

### repo

> `static` **repo**: `string` = `'https://github.com/admob-plus/admob-plus'`

#### Overrides

`IonicNativePlugin.repo`

#### Source

ionic/src/ngx/index.ts:270

## Methods

### configure()

> **configure**(...`opts`): `Promise`\<`unknown`\>

#### Parameters

• ...**opts**: [`AdMobConfig`]

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.configure`

#### Source

ionic/src/ngx/index.ts:276

***

### on()

> **on**(`event`): `Observable`\<`unknown`\>

#### Parameters

• **event**: `string`

#### Returns

`Observable`\<`unknown`\>

#### Source

ionic/src/ngx/index.ts:280

***

### start()

> **start**(): `Promise`\<`object`\>

#### Returns

`Promise`\<`object`\>

##### version

> **version**: `string`

#### Implementation of

`Omit.start`

#### Source

ionic/src/ngx/index.ts:272
