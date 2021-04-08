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

Inherited from: IonicNativePlugin.constructor

## Properties

### BannerAd

• `Readonly` **BannerAd**: *typeof* [*BannerAd*](bannerad.md)

Defined in: ionic/src/index.ts:183

___

### InterstitialAd

• `Readonly` **InterstitialAd**: *typeof* [*InterstitialAd*](interstitialad.md)

Defined in: ionic/src/index.ts:184

___

### RewardedAd

• `Readonly` **RewardedAd**: *typeof* [*RewardedAd*](rewardedad.md)

Defined in: ionic/src/index.ts:185

___

### RewardedInterstitialAd

• `Readonly` **RewardedInterstitialAd**: *typeof* [*RewardedInterstitialAd*](rewardedinterstitialad.md)

Defined in: ionic/src/index.ts:186

___

### platforms

▪ `Static` **platforms**: *string*[]

Overrides: IonicNativePlugin.platforms

Defined in: ionic/src/index.ts:177

___

### plugin

▪ `Static` **plugin**: *string*

Overrides: IonicNativePlugin.plugin

Defined in: ionic/src/index.ts:178

___

### pluginName

▪ `Static` **pluginName**: *string*

Overrides: IonicNativePlugin.pluginName

Defined in: ionic/src/index.ts:179

___

### pluginRef

▪ `Static` **pluginRef**: *string*= 'admob'

Overrides: IonicNativePlugin.pluginRef

Defined in: ionic/src/index.ts:180

___

### repo

▪ `Static` **repo**: *string*= 'https://github.com/admob-plus/admob-plus'

Overrides: IonicNativePlugin.repo

Defined in: ionic/src/index.ts:181

## Accessors

### admob

• `Private`get **admob**(): *AdMob*

**Returns:** *AdMob*

Defined in: ionic/src/index.ts:188

## Methods

### configRequest

▸ **configRequest**(...`opts`: [requestConfig: RequestConfig]): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`...opts` | [requestConfig: RequestConfig] |

**Returns:** *Promise*<unknown\>

Implementation of: Omit.configRequest

Defined in: ionic/src/index.ts:192

___

### on

▸ **on**(`event`: *string*): *Observable*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *string* |

**Returns:** *Observable*<any\>

Defined in: ionic/src/index.ts:214

___

### requestTrackingAuthorization

▸ **requestTrackingAuthorization**(): *Promise*<*false* \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)\>

**Returns:** *Promise*<*false* \| [*TrackingAuthorizationStatus*](../enums/trackingauthorizationstatus.md)\>

Implementation of: Omit.requestTrackingAuthorization

Defined in: ionic/src/index.ts:210

___

### setAppMuted

▸ **setAppMuted**(...`opts`: [value: boolean]): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`...opts` | [value: boolean] |

**Returns:** *Promise*<unknown\>

Implementation of: Omit.setAppMuted

Defined in: ionic/src/index.ts:202

___

### setAppVolume

▸ **setAppVolume**(...`opts`: [value: number]): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`...opts` | [value: number] |

**Returns:** *Promise*<unknown\>

Implementation of: Omit.setAppVolume

Defined in: ionic/src/index.ts:206

___

### start

▸ **start**(): *Promise*<{ `version`: *string*  }\>

**Returns:** *Promise*<{ `version`: *string*  }\>

Implementation of: Omit.start

Defined in: ionic/src/index.ts:198
