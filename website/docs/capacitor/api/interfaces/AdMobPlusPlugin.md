# Interface: AdMobPlusPlugin

## Methods

### adCreate()

> **adCreate**\<`O`\>(`opts`): `Promise`\<`void`\>

#### Type parameters

• **O** *extends* [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Parameters

• **opts**: `O`

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:38

***

### adHide()

> **adHide**(`opts`): `Promise`\<`void`\>

#### Parameters

• **opts**

• **opts.id**: `number`

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:42

***

### adIsLoaded()

> **adIsLoaded**(`opts`): `Promise`\<`boolean`\>

#### Parameters

• **opts**

• **opts.id**: `number`

#### Returns

`Promise`\<`boolean`\>

#### Source

definitions.ts:39

***

### adLoad()

> **adLoad**(`opts`): `Promise`\<`void`\>

#### Parameters

• **opts**

• **opts.id**: `number`

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:40

***

### adShow()

> **adShow**(`opts`): `Promise`\<`void`\>

#### Parameters

• **opts**

• **opts.id**: `number`

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:41

***

### addListener()

> **addListener**(`eventName`, `listenerFunc`): `Promise`\<`PluginListenerHandle`\> & `PluginListenerHandle`

#### Parameters

• **eventName**: `string`

• **listenerFunc**

#### Returns

`Promise`\<`PluginListenerHandle`\> & `PluginListenerHandle`

#### Source

definitions.ts:51

***

### configRequest()

> **configRequest**(`requestConfig`): `Promise`\<`void`\>

#### Parameters

• **requestConfig**: [`RequestConfig`](../type-aliases/RequestConfig.md)

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:36

***

### configure()

> **configure**(`config`): `Promise`\<`void`\>

#### Parameters

• **config**: [`AdMobConfig`](../type-aliases/AdMobConfig.md)

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:35

***

### requestTrackingAuthorization()

> **requestTrackingAuthorization**(): `Promise`\<`object`\>

#### Returns

`Promise`\<`object`\>

##### status

> **status**: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)

#### Source

definitions.ts:47

***

### start()

> **start**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:34

***

### trackingAuthorizationStatus()

> **trackingAuthorizationStatus**(): `Promise`\<`object`\>

#### Returns

`Promise`\<`object`\>

##### status

> **status**: `false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)

#### Source

definitions.ts:44
