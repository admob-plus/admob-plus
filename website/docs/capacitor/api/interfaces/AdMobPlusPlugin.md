# Interface: AdMobPlusPlugin

## Methods

### adCreate()

> **adCreate**\<`O`\>(`opts`): `Promise`\<`void`\>

#### Type Parameters

• **O** *extends* [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Parameters

##### opts

`O`

#### Returns

`Promise`\<`void`\>

#### Defined in

definitions.ts:38

***

### addListener()

> **addListener**(`eventName`, `listenerFunc`): `Promise`\<`PluginListenerHandle`\> & `PluginListenerHandle`

#### Parameters

##### eventName

`string`

##### listenerFunc

(`event`) => `void`

#### Returns

`Promise`\<`PluginListenerHandle`\> & `PluginListenerHandle`

#### Defined in

definitions.ts:51

***

### adHide()

> **adHide**(`opts`): `Promise`\<`void`\>

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`void`\>

#### Defined in

definitions.ts:42

***

### adIsLoaded()

> **adIsLoaded**(`opts`): `Promise`\<`boolean`\>

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

definitions.ts:39

***

### adLoad()

> **adLoad**(`opts`): `Promise`\<`void`\>

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`void`\>

#### Defined in

definitions.ts:40

***

### adShow()

> **adShow**(`opts`): `Promise`\<`void`\>

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`void`\>

#### Defined in

definitions.ts:41

***

### configRequest()

> **configRequest**(`requestConfig`): `Promise`\<`void`\>

#### Parameters

##### requestConfig

[`RequestConfig`](../type-aliases/RequestConfig.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

definitions.ts:36

***

### configure()

> **configure**(`config`): `Promise`\<`void`\>

#### Parameters

##### config

[`AdMobConfig`](../type-aliases/AdMobConfig.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

definitions.ts:35

***

### requestTrackingAuthorization()

> **requestTrackingAuthorization**(): `Promise`\<\{ `status`: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md); \}\>

#### Returns

`Promise`\<\{ `status`: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md); \}\>

#### Defined in

definitions.ts:47

***

### start()

> **start**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

definitions.ts:34

***

### trackingAuthorizationStatus()

> **trackingAuthorizationStatus**(): `Promise`\<\{ `status`: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md); \}\>

#### Returns

`Promise`\<\{ `status`: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md); \}\>

#### Defined in

definitions.ts:44
