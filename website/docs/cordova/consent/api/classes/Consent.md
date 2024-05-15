# Class: Consent

## Constructors

### new Consent()

> **new Consent**(): [`Consent`](Consent.md)

#### Returns

[`Consent`](Consent.md)

#### Source

index.ts:85

## Properties

### ConsentStatus

> `readonly` **ConsentStatus**: *typeof* [`ConsentStatus`](../enumerations/ConsentStatus.md)

#### Source

index.ts:79

***

### DebugGeography

> `readonly` **DebugGeography**: *typeof* [`DebugGeography`](../enumerations/DebugGeography.md)

#### Source

index.ts:80

***

### FormStatus

> `readonly` **FormStatus**: *typeof* [`FormStatus`](../enumerations/FormStatus.md)

#### Source

index.ts:81

***

### PrivacyOptionsRequirementStatus

> `readonly` **PrivacyOptionsRequirementStatus**: *typeof* [`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)

#### Source

index.ts:82

## Methods

### canRequestAds()

> **canRequestAds**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Source

index.ts:103

***

### getConsentStatus()

> **getConsentStatus**(): `Promise` \<[`ConsentStatus`](../enumerations/ConsentStatus.md)\>

#### Returns

`Promise` \<[`ConsentStatus`](../enumerations/ConsentStatus.md)\>

#### Source

index.ts:144

***

### getFormStatus()

> **getFormStatus**(): `Promise` \<[`FormStatus`](../enumerations/FormStatus.md)\>

#### Returns

`Promise` \<[`FormStatus`](../enumerations/FormStatus.md)\>

#### Source

index.ts:149

***

### loadAndShowIfRequired()

> **loadAndShowIfRequired**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Source

index.ts:112

***

### loadForm()

> **loadForm**(): `Promise` \<[`ConsentForm`](ConsentForm.md)\>

#### Returns

`Promise` \<[`ConsentForm`](ConsentForm.md)\>

#### Source

index.ts:158

***

### privacyOptionsRequirementStatus()

> **privacyOptionsRequirementStatus**(): `Promise` \<[`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)\>

#### Returns

`Promise` \<[`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)\>

#### Source

index.ts:107

***

### requestInfoUpdate()

> **requestInfoUpdate**(`opts`): `Promise`\<`unknown`\>

#### Parameters

• **opts**: `RequestInfoUpdateOptions`= `{}`

#### Returns

`Promise`\<`unknown`\>

#### Source

index.ts:154

***

### requestTrackingAuthorization()

> **requestTrackingAuthorization**(): `Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

#### Source

index.ts:132

***

### reset()

> **reset**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Source

index.ts:163

***

### showPrivacyOptionsForm()

> **showPrivacyOptionsForm**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Source

index.ts:116

***

### trackingAuthorizationStatus()

> **trackingAuthorizationStatus**(): `Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

#### Source

index.ts:120
