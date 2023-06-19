---
id: "Consent"
title: "Class: Consent"
sidebar_label: "Consent"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Consent**()

#### Defined in

index.ts:47

## Properties

### ConsentStatus

• `Readonly` **ConsentStatus**: typeof [`ConsentStatus`](../enums/ConsentStatus.md) = `ConsentStatus`

#### Defined in

index.ts:43

___

### DebugGeography

• `Readonly` **DebugGeography**: typeof [`DebugGeography`](../enums/DebugGeography.md) = `DebugGeography`

#### Defined in

index.ts:44

___

### FormStatus

• `Readonly` **FormStatus**: typeof [`FormStatus`](../enums/FormStatus.md) = `FormStatus`

#### Defined in

index.ts:45

## Methods

### getConsentStatus

▸ **getConsentStatus**(): `Promise`<[`ConsentStatus`](../enums/ConsentStatus.md)\>

#### Returns

`Promise`<[`ConsentStatus`](../enums/ConsentStatus.md)\>

#### Defined in

index.ts:79

___

### getFormStatus

▸ **getFormStatus**(): `Promise`<[`FormStatus`](../enums/FormStatus.md)\>

#### Returns

`Promise`<[`FormStatus`](../enums/FormStatus.md)\>

#### Defined in

index.ts:84

___

### loadForm

▸ **loadForm**(): `Promise`<[`ConsentForm`](ConsentForm.md)\>

#### Returns

`Promise`<[`ConsentForm`](ConsentForm.md)\>

#### Defined in

index.ts:93

___

### requestInfoUpdate

▸ **requestInfoUpdate**(`opts?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `RequestInfoUpdateOptions` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

index.ts:89

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:65

___

### reset

▸ **reset**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

index.ts:98

___

### trackingAuthorizationStatus

▸ **trackingAuthorizationStatus**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:51
