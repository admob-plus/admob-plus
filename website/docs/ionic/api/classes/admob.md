---
id: "admob"
title: "Class: AdMob"
sidebar_label: "AdMob"
custom_edit_url: null
hide_title: true
---

# Class: AdMob

## Hierarchy

* *IonicNativePlugin*

  ↳ **AdMob**

## Implements

* *Omit*<IAdMob, *BannerAd* \| *Events* \| *InterstitialAd* \| *RewardedAd* \| *RewardedInterstitialAd* \| *TrackingAuthorizationStatus*\>

## Constructors

### constructor

\+ **new AdMob**(): [*AdMob*](admob.md)

**Returns:** [*AdMob*](admob.md)

Inherited from: void

## Properties

### BannerAd

• `Readonly` **BannerAd**: *typeof* [*BannerAd*](bannerad.md)

Defined in: ionic/src/index.ts:179

___

### InterstitialAd

• `Readonly` **InterstitialAd**: *typeof* [*InterstitialAd*](interstitialad.md)

Defined in: ionic/src/index.ts:180

___

### RewardedAd

• `Readonly` **RewardedAd**: *typeof* [*RewardedAd*](rewardedad.md)

Defined in: ionic/src/index.ts:181

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: *typeof* [*RewardedInterstitialAd*](rewardedinterstitialad.md)

Defined in: ionic/src/index.ts:182

___

### platforms

▪ `Static` **platforms**: *string*[]

Overrides: void

Defined in: ionic/src/index.ts:173

___

### plugin

▪ `Static` **plugin**: *string*

Overrides: void

Defined in: ionic/src/index.ts:174

___

### pluginName

▪ `Static` **pluginName**: *string*

Overrides: void

Defined in: ionic/src/index.ts:175

___

### pluginRef

▪ `Static` **pluginRef**: *string*= 'admob'

Overrides: void

Defined in: ionic/src/index.ts:176

___

### repo

▪ `Static` **repo**: *string*= 'https://github.com/admob-plus/admob-plus'

Overrides: void

Defined in: ionic/src/index.ts:177

## Accessors

### admob

• get **admob**(): *AdMob*

**Returns:** *AdMob*

Defined in: ionic/src/index.ts:184

## Methods

### configRequest

▸ **configRequest**(...`opts`: [requestConfig: RequestConfig]): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`...opts` | [requestConfig: RequestConfig] |

**Returns:** *Promise*<unknown\>

Implementation of: void

Defined in: ionic/src/index.ts:188

___

### on

▸ **on**(`event`: *string*): *Observable*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* |

**Returns:** *Observable*<any\>

Defined in: ionic/src/index.ts:210

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): *Promise*<*false* \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)\>

**Returns:** *Promise*<*false* \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)\>

Implementation of: void

Defined in: ionic/src/index.ts:206

___

### setAppMuted

▸ **setAppMuted**(...`opts`: [value: boolean]): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`...opts` | [value: boolean] |

**Returns:** *Promise*<unknown\>

Implementation of: void

Defined in: ionic/src/index.ts:198

___

### setAppVolume

▸ **setAppVolume**(...`opts`: [value: number]): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`...opts` | [value: number] |

**Returns:** *Promise*<unknown\>

Implementation of: void

Defined in: ionic/src/index.ts:202

___

### start

▸ **start**(): *Promise*<{ `version`: *string*  }\>

**Returns:** *Promise*<{ `version`: *string*  }\>

Implementation of: void

Defined in: ionic/src/index.ts:194
