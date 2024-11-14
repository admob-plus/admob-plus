# Class: Consent

## Constructors

### new Consent()

> **new Consent**(): [`Consent`](Consent.md)

#### Returns

[`Consent`](Consent.md)

#### Defined in

index.ts:87

## Properties

### ConsentStatus

> `readonly` **ConsentStatus**: *typeof* [`ConsentStatus`](../enumerations/ConsentStatus.md)

#### Defined in

index.ts:81

***

### DebugGeography

> `readonly` **DebugGeography**: *typeof* [`DebugGeography`](../enumerations/DebugGeography.md)

#### Defined in

index.ts:82

***

### FormStatus

> `readonly` **FormStatus**: *typeof* [`FormStatus`](../enumerations/FormStatus.md)

#### Defined in

index.ts:83

***

### PrivacyOptionsRequirementStatus

> `readonly` **PrivacyOptionsRequirementStatus**: *typeof* [`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)

#### Defined in

index.ts:84

## Methods

### canRequestAds()

> **canRequestAds**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Defined in

index.ts:105

***

### getConsentStatus()

> **getConsentStatus**(): `Promise`\<[`ConsentStatus`](../enumerations/ConsentStatus.md)\>

#### Returns

`Promise`\<[`ConsentStatus`](../enumerations/ConsentStatus.md)\>

#### Defined in

index.ts:146

***

### getFormStatus()

> **getFormStatus**(): `Promise`\<[`FormStatus`](../enumerations/FormStatus.md)\>

#### Returns

`Promise`\<[`FormStatus`](../enumerations/FormStatus.md)\>

#### Defined in

index.ts:151

***

### loadAndShowIfRequired()

> **loadAndShowIfRequired**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

index.ts:114

***

### loadForm()

> **loadForm**(): `Promise`\<[`ConsentForm`](ConsentForm.md)\>

#### Returns

`Promise`\<[`ConsentForm`](ConsentForm.md)\>

#### Defined in

index.ts:160

***

### privacyOptionsRequirementStatus()

> **privacyOptionsRequirementStatus**(): `Promise`\<[`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)\>

#### Returns

`Promise`\<[`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)\>

#### Defined in

index.ts:109

***

### requestInfoUpdate()

> **requestInfoUpdate**(`opts`): `Promise`\<`unknown`\>

#### Parameters

• **opts**: `RequestInfoUpdateOptions` = `{}`

#### Returns

`Promise`\<`unknown`\>

#### Defined in

index.ts:156

***

### requestTrackingAuthorization()

> **requestTrackingAuthorization**(): `Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:134

***

### reset()

> **reset**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

index.ts:165

***

### showPrivacyOptionsForm()

> **showPrivacyOptionsForm**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Defined in

index.ts:118

***

### trackingAuthorizationStatus()

> **trackingAuthorizationStatus**(): `Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

#### Returns

`Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

#### Defined in

index.ts:122
