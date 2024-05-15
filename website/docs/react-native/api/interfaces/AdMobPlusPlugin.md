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

definitions.ts:26

***

### adIsLoaded()

> **adIsLoaded**(`opts`): `Promise`\<`boolean`\>

#### Parameters

• **opts**

• **opts.id**: `number`

#### Returns

`Promise`\<`boolean`\>

#### Source

definitions.ts:27

***

### adLoad()

> **adLoad**(`opts`): `Promise`\<`void`\>

#### Parameters

• **opts**

• **opts.id**: `number`

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:28

***

### adShow()

> **adShow**(`opts`): `Promise`\<`void`\>

#### Parameters

• **opts**

• **opts.id**: `number`

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:29

***

### configure()

> **configure**(`config`): `Promise`\<`void`\>

#### Parameters

• **config**: [`AdMobConfig`](../type-aliases/AdMobConfig.md)

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:24

***

### start()

> **start**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

definitions.ts:23
