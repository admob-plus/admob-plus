# Interface: AdMobPlusPlugin

Defined in: definitions.ts:22

## Methods

### adCreate()

> **adCreate**\<`O`\>(`opts`): `Promise`\<`void`\>

Defined in: definitions.ts:26

#### Type Parameters

##### O

`O` *extends* [`MobileAdOptions`](../type-aliases/MobileAdOptions.md)

#### Parameters

##### opts

`O`

#### Returns

`Promise`\<`void`\>

***

### adIsLoaded()

> **adIsLoaded**(`opts`): `Promise`\<`boolean`\>

Defined in: definitions.ts:27

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`boolean`\>

***

### adLoad()

> **adLoad**(`opts`): `Promise`\<`void`\>

Defined in: definitions.ts:28

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`void`\>

***

### adShow()

> **adShow**(`opts`): `Promise`\<`void`\>

Defined in: definitions.ts:29

#### Parameters

##### opts

###### id

`number`

#### Returns

`Promise`\<`void`\>

***

### configure()

> **configure**(`config`): `Promise`\<`void`\>

Defined in: definitions.ts:24

#### Parameters

##### config

[`AdMobConfig`](../type-aliases/AdMobConfig.md)

#### Returns

`Promise`\<`void`\>

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: definitions.ts:23

#### Returns

`Promise`\<`void`\>
