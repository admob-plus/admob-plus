# Class: WebViewAd

**`Internal`**

## Extends

- [`MobileAd`](MobileAd.md)\<[`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)\>

## Constructors

### new WebViewAd()

> **new WebViewAd**(`opts`): [`WebViewAd`](WebViewAd.md)

#### Parameters

• **opts**: [`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)

#### Returns

[`WebViewAd`](WebViewAd.md)

#### Overrides

[`MobileAd`](MobileAd.md).[`constructor`](MobileAd.md#constructors)

#### Defined in

packages/cordova/src/www/ads/webview.ts:25

## Properties

### id

> `readonly` **id**: `string`

#### Inherited from

[`MobileAd`](MobileAd.md).[`id`](MobileAd.md#id)

#### Defined in

packages/cordova/src/www/ads/base.ts:18

***

### opts

> `protected` `readonly` **opts**: [`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)

#### Inherited from

[`MobileAd`](MobileAd.md).[`opts`](MobileAd.md#opts)

#### Defined in

packages/cordova/src/www/ads/base.ts:20

***

### cls

> `readonly` `static` **cls**: `"WebViewAd"` = `"WebViewAd"`

#### Defined in

packages/cordova/src/www/ads/webview.ts:11

## Accessors

### adUnitId

> `get` **adUnitId**(): `string`

#### Returns

`string`

#### Inherited from

[`MobileAd`](MobileAd.md).[`adUnitId`](MobileAd.md#adunitid)

#### Defined in

packages/cordova/src/www/ads/base.ts:40

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

#### Defined in

packages/cordova/src/www/ads/webview.ts:76

***

### hide()

> `protected` **hide**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`hide`](MobileAd.md#hide)

#### Defined in

packages/cordova/src/www/ads/base.ts:77

***

### init()

> `protected` **init**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`init`](MobileAd.md#init)

#### Defined in

packages/cordova/src/www/ads/base.ts:82

***

### isLoaded()

> `protected` **isLoaded**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`isLoaded`](MobileAd.md#isloaded)

#### Defined in

packages/cordova/src/www/ads/base.ts:61

***

### load()

> `protected` **load**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`load`](MobileAd.md#load)

#### Defined in

packages/cordova/src/www/ads/base.ts:66

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

[`MobileAd`](MobileAd.md).[`on`](MobileAd.md#on)

#### Defined in

packages/cordova/src/www/ads/base.ts:44

***

### show()

> **show**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`show`](MobileAd.md#show)

#### Defined in

packages/cordova/src/www/ads/webview.ts:169

***

### checkIntegration()

> `static` **checkIntegration**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/cordova/src/www/ads/webview.ts:13

***

### getAdById()

> `static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Parameters

• **id**: `string`

#### Returns

[`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`getAdById`](MobileAd.md#getadbyid)

#### Defined in

packages/cordova/src/www/ads/base.ts:36
