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

index.ts:74

## Properties

### ConsentStatus

• `Readonly` **ConsentStatus**: typeof [`ConsentStatus`](../enums/ConsentStatus.md) = `ConsentStatus`

#### Defined in

index.ts:70

___

### DebugGeography

• `Readonly` **DebugGeography**: typeof [`DebugGeography`](../enums/DebugGeography.md) = `DebugGeography`

#### Defined in

index.ts:71

___

### FormStatus

• `Readonly` **FormStatus**: typeof [`FormStatus`](../enums/FormStatus.md) = `FormStatus`

#### Defined in

index.ts:72

## Methods

### getConsentStatus

▸ **getConsentStatus**(): `Promise`<[`ConsentStatus`](../enums/ConsentStatus.md)\>

#### Returns

`Promise`<[`ConsentStatus`](../enums/ConsentStatus.md)\>

#### Defined in

index.ts:116

___

### getFormStatus

▸ **getFormStatus**(): `Promise`<[`FormStatus`](../enums/FormStatus.md)\>

#### Returns

`Promise`<[`FormStatus`](../enums/FormStatus.md)\>

#### Defined in

index.ts:121

___

### loadForm

▸ **loadForm**(): `Promise`<[`ConsentForm`](ConsentForm.md)\>

#### Returns

`Promise`<[`ConsentForm`](ConsentForm.md)\>

#### Defined in

index.ts:130

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

index.ts:126

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:104

___

### reset

▸ **reset**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

index.ts:135

___

### trackingAuthorizationStatus

▸ **trackingAuthorizationStatus**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:92
