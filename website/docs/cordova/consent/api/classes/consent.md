---
id: "consent"
title: "Class: Consent"
sidebar_label: "Consent"
custom_edit_url: null
hide_title: true
---

# Class: Consent

## Constructors

### constructor

\+ **new Consent**(): [*Consent*](consent.md)

**Returns:** [*Consent*](consent.md)

Defined in: index.ts:41

## Properties

### ConsentStatus

• `Readonly` **ConsentStatus**: *typeof* [*ConsentStatus*](../enums/consentstatus.md)

Defined in: index.ts:39

___

### ConsentType

• `Readonly` **ConsentType**: *typeof* [*ConsentType*](../enums/consenttype.md)

Defined in: index.ts:40

___

### FormStatus

• `Readonly` **FormStatus**: *typeof* [*FormStatus*](../enums/formstatus.md)

Defined in: index.ts:41

## Methods

### getConsentStatus

▸ **getConsentStatus**(): *Promise*<[*ConsentStatus*](../enums/consentstatus.md)\>

**Returns:** *Promise*<[*ConsentStatus*](../enums/consentstatus.md)\>

Defined in: index.ts:47

___

### getConsentType

▸ **getConsentType**(): *Promise*<[*ConsentType*](../enums/consenttype.md)\>

**Returns:** *Promise*<[*ConsentType*](../enums/consenttype.md)\>

Defined in: index.ts:52

___

### getFormStatus

▸ **getFormStatus**(): *Promise*<[*FormStatus*](../enums/formstatus.md)\>

**Returns:** *Promise*<[*FormStatus*](../enums/formstatus.md)\>

Defined in: index.ts:57

___

### loadForm

▸ **loadForm**(): *Promise*<[*ConsentForm*](consentform.md)\>

**Returns:** *Promise*<[*ConsentForm*](consentform.md)\>

Defined in: index.ts:66

___

### requestInfoUpdate

▸ **requestInfoUpdate**(`opts?`: RequestInfoUpdateOptions): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | RequestInfoUpdateOptions |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:62

___

### reset

▸ **reset**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: index.ts:71
