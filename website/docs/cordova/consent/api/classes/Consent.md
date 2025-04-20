# Class: Consent

Defined in: index.ts:80

## Constructors

### Constructor

> **new Consent**(): `Consent`

Defined in: index.ts:87

#### Returns

`Consent`

## Properties

### ConsentStatus

> `readonly` **ConsentStatus**: *typeof* [`ConsentStatus`](../enumerations/ConsentStatus.md)

Defined in: index.ts:81

***

### DebugGeography

> `readonly` **DebugGeography**: *typeof* [`DebugGeography`](../enumerations/DebugGeography.md)

Defined in: index.ts:82

***

### FormStatus

> `readonly` **FormStatus**: *typeof* [`FormStatus`](../enumerations/FormStatus.md)

Defined in: index.ts:83

***

### PrivacyOptionsRequirementStatus

> `readonly` **PrivacyOptionsRequirementStatus**: *typeof* [`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)

Defined in: index.ts:84

## Methods

### canRequestAds()

> **canRequestAds**(): `Promise`\<`boolean`\>

Defined in: index.ts:105

#### Returns

`Promise`\<`boolean`\>

***

### getConsentStatus()

> **getConsentStatus**(): `Promise`\<[`ConsentStatus`](../enumerations/ConsentStatus.md)\>

Defined in: index.ts:146

#### Returns

`Promise`\<[`ConsentStatus`](../enumerations/ConsentStatus.md)\>

***

### getFormStatus()

> **getFormStatus**(): `Promise`\<[`FormStatus`](../enumerations/FormStatus.md)\>

Defined in: index.ts:151

#### Returns

`Promise`\<[`FormStatus`](../enumerations/FormStatus.md)\>

***

### loadAndShowIfRequired()

> **loadAndShowIfRequired**(): `Promise`\<`unknown`\>

Defined in: index.ts:114

#### Returns

`Promise`\<`unknown`\>

***

### loadForm()

> **loadForm**(): `Promise`\<[`ConsentForm`](ConsentForm.md)\>

Defined in: index.ts:160

#### Returns

`Promise`\<[`ConsentForm`](ConsentForm.md)\>

***

### privacyOptionsRequirementStatus()

> **privacyOptionsRequirementStatus**(): `Promise`\<[`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)\>

Defined in: index.ts:109

#### Returns

`Promise`\<[`PrivacyOptionsRequirementStatus`](../enumerations/PrivacyOptionsRequirementStatus.md)\>

***

### requestInfoUpdate()

> **requestInfoUpdate**(`opts`): `Promise`\<`unknown`\>

Defined in: index.ts:156

#### Parameters

##### opts

`RequestInfoUpdateOptions` = `{}`

#### Returns

`Promise`\<`unknown`\>

***

### requestTrackingAuthorization()

> **requestTrackingAuthorization**(): `Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

Defined in: index.ts:134

#### Returns

`Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

***

### reset()

> **reset**(): `Promise`\<`unknown`\>

Defined in: index.ts:165

#### Returns

`Promise`\<`unknown`\>

***

### showPrivacyOptionsForm()

> **showPrivacyOptionsForm**(): `Promise`\<`unknown`\>

Defined in: index.ts:118

#### Returns

`Promise`\<`unknown`\>

***

### trackingAuthorizationStatus()

> **trackingAuthorizationStatus**(): `Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>

Defined in: index.ts:122

#### Returns

`Promise`\<`false` \| [`TrackingAuthorizationStatus`](../enumerations/TrackingAuthorizationStatus.md)\>
