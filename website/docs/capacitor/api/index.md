---
id: "index"
title: "@admob-plus/capacitor"
slug: "/capacitor/api"
sidebar_label: "Table of contents"
custom_edit_url: null
---

# @admob-plus/capacitor

## Table of contents

### Enumerations

- [MaxAdContentRating](enums/maxadcontentrating.md)

### Classes

- [BannerAd](classes/bannerad.md)
- [InterstitialAd](classes/interstitialad.md)
- [RewardedAd](classes/rewardedad.md)
- [RewardedInterstitialAd](classes/rewardedinterstitialad.md)

### Interfaces

- [AdMobPlusPlugin](interfaces/admobplusplugin.md)
- [BannerAdOptions](interfaces/banneradoptions.md)

## Type aliases

### AdMobConfig

Ƭ **AdMobConfig**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `appMuted?` | *boolean* |
| `appVolume?` | *number* |

Defined in: definitions.ts:9

___

### RequestConfig

Ƭ **RequestConfig**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `maxAdContentRating?` | [*MaxAdContentRating*](enums/maxadcontentrating.md) |
| `tagForChildDirectedTreatment?` | *boolean* \| ``null`` |
| `tagForUnderAgeOfConsent?` | *boolean* \| ``null`` |
| `testDeviceIds?` | *string*[] |

Defined in: definitions.ts:14

## Variables

### AdMobPlus

• `Const` **AdMobPlus**: [*AdMobPlusPlugin*](interfaces/admobplusplugin.md)

Defined in: index.ts:4
