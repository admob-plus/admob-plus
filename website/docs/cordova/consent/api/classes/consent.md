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

Defined in: index.ts:34

## Properties

### ConsentStatus

• `Readonly` **ConsentStatus**: *typeof* [*ConsentStatus*](../enums/consentstatus.md)

Defined in: index.ts:33

___

### FormStatus

• `Readonly` **FormStatus**: *typeof* [*FormStatus*](../enums/formstatus.md)

Defined in: index.ts:34

## Methods

### getConsentStatus

▸ **getConsentStatus**(): *Promise*<[*ConsentStatus*](../enums/consentstatus.md)\>

**Returns:** *Promise*<[*ConsentStatus*](../enums/consentstatus.md)\>

Defined in: index.ts:40

___

### getFormStatus

▸ **getFormStatus**(): *Promise*<[*FormStatus*](../enums/formstatus.md)\>

**Returns:** *Promise*<[*FormStatus*](../enums/formstatus.md)\>

Defined in: index.ts:45

___

### loadForm

▸ **loadForm**(): *Promise*<[*ConsentForm*](consentform.md)\>

**Returns:** *Promise*<[*ConsentForm*](consentform.md)\>

Defined in: index.ts:54

___

### requestInfoUpdate

▸ **requestInfoUpdate**(`opts?`: RequestInfoUpdateOptions): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | RequestInfoUpdateOptions |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:50

___

### reset

▸ **reset**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: index.ts:59
