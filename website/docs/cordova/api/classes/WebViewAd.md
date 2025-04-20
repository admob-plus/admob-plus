# Class: WebViewAd

Defined in: packages/cordova/src/www/ads/webview.ts:10

**`Internal`**

## Extends

- [`MobileAd`](MobileAd.md)\<[`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)\>

## Constructors

### Constructor

> **new WebViewAd**(`opts`): `WebViewAd`

Defined in: packages/cordova/src/www/ads/webview.ts:25

#### Parameters

##### opts

[`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)

#### Returns

`WebViewAd`

#### Overrides

[`MobileAd`](MobileAd.md).[`constructor`](MobileAd.md#constructor)

## Properties

### id

> `readonly` **id**: `string`

Defined in: packages/cordova/src/www/ads/base.ts:18

#### Inherited from

[`MobileAd`](MobileAd.md).[`id`](MobileAd.md#id)

***

### opts

> `protected` `readonly` **opts**: [`WebViewAdOptions`](../interfaces/WebViewAdOptions.md)

Defined in: packages/cordova/src/www/ads/base.ts:20

#### Inherited from

[`MobileAd`](MobileAd.md).[`opts`](MobileAd.md#opts)

***

### cls

> `readonly` `static` **cls**: `"WebViewAd"` = `"WebViewAd"`

Defined in: packages/cordova/src/www/ads/webview.ts:11

## Accessors

### adUnitId

#### Get Signature

> **get** **adUnitId**(): `string`

Defined in: packages/cordova/src/www/ads/base.ts:40

##### Returns

`string`

#### Inherited from

[`MobileAd`](MobileAd.md).[`adUnitId`](MobileAd.md#adunitid)

## Methods

### addAd()

> **addAd**(`options`): `boolean`

Defined in: packages/cordova/src/www/ads/webview.ts:76

#### Parameters

##### options

###### element

`HTMLElement`

###### format?

`string`

###### fullWidth?

`boolean`

###### html?

`string`

###### slot

`string`

#### Returns

`boolean`

***

### hide()

> `protected` **hide**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/base.ts:77

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`hide`](MobileAd.md#hide)

***

### init()

> `protected` **init**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/base.ts:82

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`init`](MobileAd.md#init)

***

### isLoaded()

> `protected` **isLoaded**(): `Promise`\<`boolean`\>

Defined in: packages/cordova/src/www/ads/base.ts:61

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`isLoaded`](MobileAd.md#isloaded)

***

### load()

> `protected` **load**(): `Promise`\<`void`\>

Defined in: packages/cordova/src/www/ads/base.ts:66

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`load`](MobileAd.md#load)

***

### on()

> **on**(...`args`): () => `void`

Defined in: packages/cordova/src/www/ads/base.ts:44

#### Parameters

##### args

...\[`string`, (`ev`) => `any`, `boolean`\]

#### Returns

> (): `void`

##### Returns

`void`

#### Inherited from

[`MobileAd`](MobileAd.md).[`on`](MobileAd.md#on)

***

### show()

> **show**(): `Promise`\<`unknown`\>

Defined in: packages/cordova/src/www/ads/webview.ts:169

#### Returns

`Promise`\<`unknown`\>

#### Overrides

[`MobileAd`](MobileAd.md).[`show`](MobileAd.md#show)

***

### checkIntegration()

> `static` **checkIntegration**(): `Promise`\<`void`\>

Defined in: packages/cordova/src/www/ads/webview.ts:13

#### Returns

`Promise`\<`void`\>

***

### getAdById()

> `static` **getAdById**(`id`): [`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

Defined in: packages/cordova/src/www/ads/base.ts:36

#### Parameters

##### id

`string`

#### Returns

[`MobileAd`](MobileAd.md)\<[`MobileAdOptions`](../type-aliases/MobileAdOptions.md)\>

#### Inherited from

[`MobileAd`](MobileAd.md).[`getAdById`](MobileAd.md#getadbyid)
