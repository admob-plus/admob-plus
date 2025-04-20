# Class: AdMob

Defined in: ionic/src/ngx/index.ts:241

## Extends

- `IonicNativePlugin`

## Implements

- `Omit`\<`IAdMob`, `"AppOpenAd"` \| `"BannerAd"` \| `"BannerAd"` \| `"configRequest"` \| `"Events"` \| `"InterstitialAd"` \| `"InterstitialAd"` \| `"NativeAd"` \| `"NativeAd"` \| `"requestTrackingAuthorization"` \| `"RewardedAd"` \| `"RewardedAd"` \| `"RewardedInterstitialAd"` \| `"RewardedInterstitialAd"` \| `"setAppMuted"` \| `"setAppVolume"` \| `"TrackingAuthorizationStatus"` \| `"WebViewAd"`\>

## Constructors

### Constructor

> **new AdMob**(): `AdMob`

#### Returns

`AdMob`

#### Inherited from

`IonicNativePlugin.constructor`

## Properties

### platforms

> `static` **platforms**: `string`[]

Defined in: ionic/src/ngx/index.ts:266

#### Overrides

`IonicNativePlugin.platforms`

***

### plugin

> `static` **plugin**: `string`

Defined in: ionic/src/ngx/index.ts:267

#### Overrides

`IonicNativePlugin.plugin`

***

### pluginName

> `static` **pluginName**: `string`

Defined in: ionic/src/ngx/index.ts:268

#### Overrides

`IonicNativePlugin.pluginName`

***

### pluginRef

> `static` **pluginRef**: `string` = `'admob'`

Defined in: ionic/src/ngx/index.ts:269

#### Overrides

`IonicNativePlugin.pluginRef`

***

### repo

> `static` **repo**: `string` = `'https://github.com/admob-plus/admob-plus'`

Defined in: ionic/src/ngx/index.ts:270

#### Overrides

`IonicNativePlugin.repo`

## Methods

### configure()

> **configure**(...`opts`): `Promise`\<`unknown`\>

Defined in: ionic/src/ngx/index.ts:276

#### Parameters

##### opts

...\[`AdMobConfig`\]

#### Returns

`Promise`\<`unknown`\>

#### Implementation of

`Omit.configure`

***

### on()

> **on**(`event`): `Observable`\<`unknown`\>

Defined in: ionic/src/ngx/index.ts:280

#### Parameters

##### event

`string`

#### Returns

`Observable`\<`unknown`\>

***

### start()

> **start**(): `Promise`\<\{ `version`: `string`; \}\>

Defined in: ionic/src/ngx/index.ts:272

#### Returns

`Promise`\<\{ `version`: `string`; \}\>

#### Implementation of

`Omit.start`
