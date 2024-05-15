# Class: WebViewAd

## Extends

- [`MobileAd`](MobileAd.md) \<[`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)\>

## Constructors

### new WebViewAd()

> **new WebViewAd**(`opts`): [`WebViewAd`](WebViewAd.md)

#### Parameters

• **opts**: [`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)

#### Returns

[`WebViewAd`](WebViewAd.md)

#### Overrides

[`MobileAd`](MobileAd.md) . [`constructor`](MobileAd.md#constructors)

#### Source

packages/cordova/src/www/ads/webview.ts:25

## Properties

### \_adsense

> `private` **\_adsense**: `string` = `""`

#### Source

packages/cordova/src/www/ads/webview.ts:21

***

### \_historyCurrentHref

> `private` **\_historyCurrentHref**: `string` = `""`

#### Source

packages/cordova/src/www/ads/webview.ts:23

***

### \_loaded

> `private` **\_loaded**: `boolean` = `false`

#### Source

packages/cordova/src/www/ads/webview.ts:19

***

### \_originalHref

> `private` **\_originalHref**: `string`

#### Source

packages/cordova/src/www/ads/webview.ts:22

***

### \_src

> `private` **\_src**: `string` = `""`

#### Source

packages/cordova/src/www/ads/webview.ts:20

***

### id

> `readonly` **id**: `string`

#### Inherited from

[`MobileAd`](MobileAd.md) . [`id`](MobileAd.md#id)

#### Source

packages/cordova/src/www/ads/base.ts:18

***

### opts

> `protected` `readonly` **opts**: [`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)

#### Inherited from

[`MobileAd`](MobileAd.md) . [`opts`](MobileAd.md#opts)

#### Source

packages/cordova/src/www/ads/base.ts:20

***

### cls

> `static` `readonly` **cls**: `"WebViewAd"` = `"WebViewAd"`

#### Source

packages/cordova/src/www/ads/webview.ts:11

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Source

packages/cordova/src/www/ads/base.ts:40

***

### allAds

> `get` `static` `private` **allAds**(): `Record`\<`string`, [`MobileAd`](MobileAd.md) \<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>\>

#### Returns

`Record`\<`string`, [`MobileAd`](MobileAd.md) \<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>\>

#### Source

packages/cordova/src/www/ads/base.ts:30

## Methods

### addAd()

> **addAd**(`options`): `boolean`

#### Parameters

• **options**

• **options.element**: `HTMLElement`

• **options.format?**: `string`

• **options.fullWidth?**: `boolean`

• **options.html?**: `string`

• **options.slot**: `string`

#### Returns

`boolean`

#### Source

packages/cordova/src/www/ads/webview.ts:76

***

### hide()

> `protected` **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md) . [`hide`](MobileAd.md#hide)

#### Source

packages/cordova/src/www/ads/base.ts:77

***

### historyCurrentHref()

> `private` **historyCurrentHref**(): `string`

#### Returns

`string`

#### Source

packages/cordova/src/www/ads/webview.ts:161

***

### historyOriginalHref()

> `private` **historyOriginalHref**(): `string`

#### Returns

`string`

#### Source

packages/cordova/src/www/ads/webview.ts:157

***

### historyReplaceState()

> `private` **historyReplaceState**(`url`): `void`

#### Parameters

• **url**: `string`

#### Returns

`void`

#### Source

packages/cordova/src/www/ads/webview.ts:136

***

### historyRestoreOriginalHref()

> `private` **historyRestoreOriginalHref**(): `void`

#### Returns

`void`

#### Source

packages/cordova/src/www/ads/webview.ts:165

***

### historySetPage()

> `private` **historySetPage**(`page`, `parameters`): `string`

#### Parameters

• **page**: `string`

• **parameters**= `{}`

#### Returns

`string`

#### Source

packages/cordova/src/www/ads/webview.ts:145

***

### init()

> `protected` **init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md) . [`init`](MobileAd.md#init)

#### Source

packages/cordova/src/www/ads/base.ts:82

***

### isLoaded()

> `protected` **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`MobileAd`](MobileAd.md) . [`isLoaded`](MobileAd.md#isloaded)

#### Source

packages/cordova/src/www/ads/base.ts:61

***

### isNodeScript()

> `private` **isNodeScript**(`node`): `boolean`

#### Parameters

• **node**: `any`

#### Returns

`boolean`

#### Source

packages/cordova/src/www/ads/webview.ts:132

***

### load()

> `protected` **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`MobileAd`](MobileAd.md) . [`load`](MobileAd.md#load)

#### Source

packages/cordova/src/www/ads/base.ts:66

***

### nodeScriptClone()

> `private` **nodeScriptClone**(`node`): `HTMLScriptElement`

#### Parameters

• **node**: `any`

#### Returns

`HTMLScriptElement`

#### Source

packages/cordova/src/www/ads/webview.ts:122

***

### nodeScriptReplace()

> `private` **nodeScriptReplace**(`node`): `any`

#### Parameters

• **node**: `any`

#### Returns

`any`

#### Source

packages/cordova/src/www/ads/webview.ts:110

***

### on()

> **on**(...`args`): () => `void`

#### Parameters

• ...**args**: [`string`, (`ev`) => `any`, `boolean`]

#### Returns

`Function`

##### Returns

`void`

#### Inherited from

[`MobileAd`](MobileAd.md) . [`on`](MobileAd.md#on)

#### Source

packages/cordova/src/www/ads/base.ts:44

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md) . [`show`](MobileAd.md#show)

#### Source

packages/cordova/src/www/ads/webview.ts:169

***

### checkIntegration()

> `static` **checkIntegration**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

packages/cordova/src/www/ads/webview.ts:13

***

### getAdById()

> `static` **getAdById**(`id`): [`MobileAd`](MobileAd.md) \<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Parameters

• **id**: `string`

#### Returns

[`MobileAd`](MobileAd.md) \<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Inherited from

[`MobileAd`](MobileAd.md) . [`getAdById`](MobileAd.md#getadbyid)

#### Source

packages/cordova/src/www/ads/base.ts:36
