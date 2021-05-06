---
id: "consent"
title: "Class: Consent"
sidebar_label: "Consent"
sidebar_position: 0
custom_edit_url: null
---

# Class: Consent

## Constructors

### constructor

\+ **new Consent**(): [*Consent*](consent.md)

**Returns:** [*Consent*](consent.md)

Defined in: index.ts:43

## Properties

### ConsentStatus

• `Readonly` **ConsentStatus**: *typeof* [*ConsentStatus*](../enums/consentstatus.md)

Defined in: index.ts:41

___

### DebugGeography

• `Readonly` **DebugGeography**: *typeof* [*DebugGeography*](../enums/debuggeography.md)

Defined in: index.ts:42

___

### FormStatus

• `Readonly` **FormStatus**: *typeof* [*FormStatus*](../enums/formstatus.md)

Defined in: index.ts:43

## Methods

### getConsentStatus

▸ **getConsentStatus**(): *Promise*<[*ConsentStatus*](../enums/consentstatus.md)\>

**Returns:** *Promise*<[*ConsentStatus*](../enums/consentstatus.md)\>

Defined in: index.ts:49

___

### getFormStatus

▸ **getFormStatus**(): *Promise*<[*FormStatus*](../enums/formstatus.md)\>

**Returns:** *Promise*<[*FormStatus*](../enums/formstatus.md)\>

Defined in: index.ts:54

___

### loadForm

▸ **loadForm**(): *Promise*<[*ConsentForm*](consentform.md)\>

**Returns:** *Promise*<[*ConsentForm*](consentform.md)\>

Defined in: index.ts:63

___

### requestInfoUpdate

▸ **requestInfoUpdate**(`opts?`: RequestInfoUpdateOptions): *Promise*<unknown\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opts` | RequestInfoUpdateOptions | {} |

**Returns:** *Promise*<unknown\>

Defined in: index.ts:59

___

### reset

▸ **reset**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: index.ts:68
