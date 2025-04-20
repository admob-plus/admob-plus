# Interface: AdMobPlusPlugin

Defined in: definitions.ts:33

## Methods

### adCreate()

> **adCreate**\<`O`\>(`opts`): `Promise`\<`void`\>

Defined in: definitions.ts:38

#### Type Parameters

##### O

`O` *extends* [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Parameters

##### opts

`O`

#### Returns

`Promise`\<`void`\>

***

### addListener()

> **addListener**(`eventName`, `listenerFunc`): `Promise`\<`PluginListenerHandle`\> & `PluginListenerHandle`

Defined in: definitions.ts:51

#### Parameters

##### eventName

`string`

##### listenerFunc

(`event`) => `void`

#### Returns

`Promise`\<`PluginListenerHandle`\> & `PluginListenerHandle`

***

### adHide()

> **adHide**(`opts`): `Promise`\<`void`\>

Defined in: definitions.ts:42

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`void`\>

***

### adIsLoaded()

> **adIsLoaded**(`opts`): `Promise`\<`boolean`\>

Defined in: definitions.ts:39

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`boolean`\>

***

### adLoad()

> **adLoad**(`opts`): `Promise`\<`void`\>

Defined in: definitions.ts:40

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`void`\>

***

### adShow()

> **adShow**(`opts`): `Promise`\<`void`\>

Defined in: definitions.ts:41

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`void`\>

***

### configRequest()

> **configRequest**(`requestConfig`): `Promise`\<`void`\>

Defined in: definitions.ts:36

#### Parameters

##### requestConfig

[`RequestConfig`](../type-aliases/RequestConfig.md)

#### Returns

`Promise`\<`void`\>

***

### configure()

> **configure**(`config`): `Promise`\<`void`\>

Defined in: definitions.ts:35

#### Parameters

##### config

[`AdMobConfig`](../type-aliases/AdMobConfig.md)

#### Returns

`Promise`\<`void`\>

***

### requestTrackingAuthorization()

> **requestTrackingAuthorization**(): `Promise`\<\{ `status`: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md); \}\>

Defined in: definitions.ts:47

#### Returns

`Promise`\<\{ `status`: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md); \}\>

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: definitions.ts:34

#### Returns

`Promise`\<`void`\>

***

### trackingAuthorizationStatus()

> **trackingAuthorizationStatus**(): `Promise`\<\{ `status`: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md); \}\>

Defined in: definitions.ts:44

#### Returns

`Promise`\<\{ `status`: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md); \}\>
