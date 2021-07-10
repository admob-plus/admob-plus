---
id: "consent"
title: "Class: Consent"
sidebar_label: "Consent"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Consent**()

#### Defined in

index.ts:43

## Properties

### ConsentStatus

• `Readonly` **ConsentStatus**: typeof `ConsentStatus`

#### Defined in

index.ts:41

___

### DebugGeography

• `Readonly` **DebugGeography**: typeof [`DebugGeography`](../enums/debuggeography.md)

#### Defined in

index.ts:42

___

### FormStatus

• `Readonly` **FormStatus**: typeof [`FormStatus`](../enums/formstatus.md)

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

▸ **getFormStatus**(): `Promise`<[`FormStatus`](../enums/formstatus.md)\>

#### Returns

`Promise`<[`FormStatus`](../enums/formstatus.md)\>

#### Defined in

index.ts:82

___

### loadForm

▸ **loadForm**(): `Promise`<[`ConsentForm`](consentform.md)\>

#### Returns

`Promise`<[`ConsentForm`](consentform.md)\>

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

▸ **requestTrackingAuthorization**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/trackingauthorizationstatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/trackingauthorizationstatus.md)\>

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

▸ **trackingAuthorizationStatus**(): `Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/trackingauthorizationstatus.md)\>

#### Returns

`Promise`<``false`` \| [`TrackingAuthorizationStatus`](../enums/trackingauthorizationstatus.md)\>

#### Defined in

index.ts:49
