[![NPM version](https://img.shields.io/npm/v/@admob-plus/capacitor.svg)](https://npmjs.org/package/@admob-plus/capacitor)
[![GitHub last commit](https://img.shields.io/github/last-commit/admob-plus/admob-plus)](https://github.com/admob-plus/admob-plus)
![Dependency status](https://img.shields.io/librariesio/release/npm/@admob-plus/capacitor)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@admob-plus/capacitor)
![NPM license](https://img.shields.io/npm/l/@admob-plus/capacitor)

# @admob-plus/capacitor

AdMob Plus Capacitor Plugin

## Install

```bash
npm install @admob-plus/capacitor
npx cap sync
```

## API

<docgen-index>

* [`start()`](#start)
* [`configure(...)`](#configure)
* [`configRequest(...)`](#configrequest)
* [`bannerShow(...)`](#bannershow)
* [`bannerHide(...)`](#bannerhide)
* [`interstitialLoad(...)`](#interstitialload)
* [`interstitialShow(...)`](#interstitialshow)
* [`rewardedLoad(...)`](#rewardedload)
* [`rewardedShow(...)`](#rewardedshow)
* [`rewardedInterstitialLoad(...)`](#rewardedinterstitialload)
* [`rewardedInterstitialShow(...)`](#rewardedinterstitialshow)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### start()

```typescript
start() => any
```

**Returns:** <code>any</code>

--------------------


### configure(...)

```typescript
configure(config: AdMobConfig) => any
```

| Param        | Type                                                |
| ------------ | --------------------------------------------------- |
| **`config`** | <code><a href="#admobconfig">AdMobConfig</a></code> |

**Returns:** <code>any</code>

--------------------


### configRequest(...)

```typescript
configRequest(requestConfig: RequestConfig) => any
```

| Param               | Type                                                    |
| ------------------- | ------------------------------------------------------- |
| **`requestConfig`** | <code><a href="#requestconfig">RequestConfig</a></code> |

**Returns:** <code>any</code>

--------------------


### bannerShow(...)

```typescript
bannerShow(opts: { id: number; adUnitId: string; position?: 'bottom' | 'top'; }) => any
```

| Param      | Type                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| **`opts`** | <code>{ id: number; adUnitId: string; position?: 'bottom' \| 'top'; }</code> |

**Returns:** <code>any</code>

--------------------


### bannerHide(...)

```typescript
bannerHide(opts: { id: number; }) => any
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`opts`** | <code>{ id: number; }</code> |

**Returns:** <code>any</code>

--------------------


### interstitialLoad(...)

```typescript
interstitialLoad(opts: { id: number; adUnitId: string; }) => any
```

| Param      | Type                                           |
| ---------- | ---------------------------------------------- |
| **`opts`** | <code>{ id: number; adUnitId: string; }</code> |

**Returns:** <code>any</code>

--------------------


### interstitialShow(...)

```typescript
interstitialShow(opts: { id: number; }) => any
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`opts`** | <code>{ id: number; }</code> |

**Returns:** <code>any</code>

--------------------


### rewardedLoad(...)

```typescript
rewardedLoad(opts: { id: number; adUnitId: string; }) => any
```

| Param      | Type                                           |
| ---------- | ---------------------------------------------- |
| **`opts`** | <code>{ id: number; adUnitId: string; }</code> |

**Returns:** <code>any</code>

--------------------


### rewardedShow(...)

```typescript
rewardedShow(opts: { id: number; }) => any
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`opts`** | <code>{ id: number; }</code> |

**Returns:** <code>any</code>

--------------------


### rewardedInterstitialLoad(...)

```typescript
rewardedInterstitialLoad(opts: { id: number; adUnitId: string; }) => any
```

| Param      | Type                                           |
| ---------- | ---------------------------------------------- |
| **`opts`** | <code>{ id: number; adUnitId: string; }</code> |

**Returns:** <code>any</code>

--------------------


### rewardedInterstitialShow(...)

```typescript
rewardedInterstitialShow(opts: { id: number; }) => any
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`opts`** | <code>{ id: number; }</code> |

**Returns:** <code>any</code>

--------------------


### Type Aliases


#### AdMobConfig

<code>{ appMuted?: boolean appVolume?: number }</code>


#### RequestConfig

<code>{ maxAdContentRating?: <a href="#maxadcontentrating">MaxAdContentRating</a> tagForChildDirectedTreatment?: boolean | null tagForUnderAgeOfConsent?: boolean | null testDeviceIds?: string[] }</code>


### Enums


#### MaxAdContentRating

| Members           | Value             |
| ----------------- | ----------------- |
| **`G`**           | <code>'G'</code>  |
| **`MA`**          | <code>'MA'</code> |
| **`PG`**          | <code>'PG'</code> |
| **`T`**           | <code>'T'</code>  |
| **`UNSPECIFIED`** | <code>''</code>   |

</docgen-api>
