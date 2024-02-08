---
id: "Consent"
title: "Class: Consent"
sidebar_label: "Consent"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Consent**(): [`Consent`](Consent.md)

#### Returns

[`Consent`](Consent.md)

#### Defined in

index.ts:85

## Properties

### ConsentStatus

• `Readonly` **ConsentStatus**: typeof [`ConsentStatus`](../enums/ConsentStatus.md) = `ConsentStatus`

#### Defined in

index.ts:79

___

### DebugGeography

• `Readonly` **DebugGeography**: typeof [`DebugGeography`](../enums/DebugGeography.md) = `DebugGeography`

#### Defined in

index.ts:80

___

### FormStatus

• `Readonly` **FormStatus**: typeof [`FormStatus`](../enums/FormStatus.md) = `FormStatus`

#### Defined in

index.ts:81

___

### PrivacyOptionsRequirementStatus

• `Readonly` **PrivacyOptionsRequirementStatus**: typeof [`PrivacyOptionsRequirementStatus`](../enums/PrivacyOptionsRequirementStatus.md) = `PrivacyOptionsRequirementStatus`

#### Defined in

index.ts:82

## Methods

### canRequestAds

▸ **canRequestAds**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

index.ts:103

___

### getConsentStatus

▸ **getConsentStatus**(): `Promise`\<[`ConsentStatus`](../enums/ConsentStatus.md)\>

#### Returns

`Promise`\<[`ConsentStatus`](../enums/ConsentStatus.md)\>

#### Defined in

index.ts:144

___

### getFormStatus

▸ **getFormStatus**(): `Promise`\<[`FormStatus`](../enums/FormStatus.md)\>

#### Returns

`Promise`\<[`FormStatus`](../enums/FormStatus.md)\>

#### Defined in

index.ts:149

___

### loadAndShowIfRequired

▸ **loadAndShowIfRequired**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

index.ts:112

___

### loadForm

▸ **loadForm**(): `Promise`\<[`ConsentForm`](ConsentForm.md)\>

#### Returns

`Promise`\<[`ConsentForm`](ConsentForm.md)\>

#### Defined in

index.ts:158

___

### privacyOptionsRequirementStatus

▸ **privacyOptionsRequirementStatus**(): `Promise`\<[`PrivacyOptionsRequirementStatus`](../enums/PrivacyOptionsRequirementStatus.md)\>

#### Returns

`Promise`\<[`PrivacyOptionsRequirementStatus`](../enums/PrivacyOptionsRequirementStatus.md)\>

#### Defined in

index.ts:107

___

### requestInfoUpdate

▸ **requestInfoUpdate**(`opts?`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `RequestInfoUpdateOptions` |

#### Returns

`Promise`\<`unknown`\>

#### Defined in

index.ts:154

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): `Promise`\<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`\<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:132

___

### reset

▸ **reset**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

index.ts:163

___

### showPrivacyOptionsForm

▸ **showPrivacyOptionsForm**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

index.ts:116

___

### trackingAuthorizationStatus

▸ **trackingAuthorizationStatus**(): `Promise`\<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`\<``false`` \| [`TrackingAuthorizationStatus`](../enums/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:120
