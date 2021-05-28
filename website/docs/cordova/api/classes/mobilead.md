---
id: "mobilead"
title: "Class: MobileAd<T>"
sidebar_label: "MobileAd"
sidebar_position: 0
custom_edit_url: null
---

# Class: MobileAd<T\>

**`internal`**

## Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | [*MobileAdOptions*](../index.md#mobileadoptions) | [*MobileAdOptions*](../index.md#mobileadoptions) |

## Hierarchy

- **MobileAd**

  ↳ [*AppOpenAd*](appopenad.md)

  ↳ [*BannerAd*](bannerad.md)

  ↳ [*InterstitialAd*](interstitialad.md)

  ↳ [*RewardedAd*](rewardedad.md)

  ↳ [*RewardedInterstitialAd*](rewardedinterstitialad.md)

## Constructors

### constructor

\+ **new MobileAd**<T\>(`opts`: T): [*MobileAd*](mobilead.md)<T\>

#### Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | [*MobileAdOptions*](../index.md#mobileadoptions) | [*MobileAdOptions*](../index.md#mobileadoptions) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | T |

**Returns:** [*MobileAd*](mobilead.md)<T\>

Defined in: api.ts:13

## Properties

### id

• `Readonly` **id**: *number*

Defined in: api.ts:11

___

### opts

• `Protected` `Readonly` **opts**: T

Defined in: api.ts:13

___

### allAds

▪ `Static` `Private` **allAds**: *object*= {}

#### Type declaration

Defined in: api.ts:8

___

### idCounter

▪ `Static` `Private` **idCounter**: *number*= 0

Defined in: api.ts:9

## Accessors

### adUnitId

• get **adUnitId**(): *string*

**Returns:** *string*

Defined in: api.ts:31

## Methods

### getAdById

▸ `Static` **getAdById**(`id`: *number*): [*MobileAd*](mobilead.md)<[*MobileAdOptions*](../index.md#mobileadoptions)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** [*MobileAd*](mobilead.md)<[*MobileAdOptions*](../index.md#mobileadoptions)\>

Defined in: api.ts:22

___

### nextId

▸ `Static` `Private` **nextId**(): *number*

**Returns:** *number*

Defined in: api.ts:26
