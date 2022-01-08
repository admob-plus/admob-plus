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

index.ts:45

## Properties

### ConsentStatus

• `Readonly` **ConsentStatus**: typeof `ConsentStatus` = `ConsentStatus`

#### Defined in

index.ts:41

___

### DebugGeography

• `Readonly` **DebugGeography**: typeof [`DebugGeography`](../enums/DebugGeography.md) = `DebugGeography`

#### Defined in

index.ts:42

___

### FormStatus

• `Readonly` **FormStatus**: typeof [`FormStatus`](../enums/FormStatus.md) = `FormStatus`

#### Defined in

index.ts:43

## Methods

### getConsentStatus

▸ **getConsentStatus**(): `Promise`<`ConsentStatus`\>

#### Returns

`Promise`<`ConsentStatus`\>

#### Defined in

index.ts:77

___

### getFormStatus

▸ **getFormStatus**(): `Promise`<[`FormStatus`](../enums/FormStatus.md)\>

#### Returns

`Promise`<[`FormStatus`](../enums/FormStatus.md)\>

#### Defined in

index.ts:82

___

### loadForm

▸ **loadForm**(): `Promise`<[`ConsentForm`](ConsentForm.md)\>

#### Returns

`Promise`<[`ConsentForm`](ConsentForm.md)\>

#### Defined in

index.ts:91

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

index.ts:87

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:63

___

### reset

▸ **reset**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

index.ts:96

___

### trackingAuthorizationStatus

▸ **trackingAuthorizationStatus**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:49
