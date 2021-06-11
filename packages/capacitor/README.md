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
* [`adCreate(...)`](#adcreate)
* [`adIsLoaded(...)`](#adisloaded)
* [`adLoad(...)`](#adload)
* [`adShow(...)`](#adshow)
* [`adHide(...)`](#adhide)
* [`trackingAuthorizationStatus()`](#trackingauthorizationstatus)
* [`requestTrackingAuthorization()`](#requesttrackingauthorization)
* [`addListener(string, ...)`](#addlistenerstring-)
* [Interfaces](#interfaces)
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


### adCreate(...)

```typescript
adCreate<O extends MobileAdOptions>(opts: O) => any
```

| Param      | Type           |
| ---------- | -------------- |
| **`opts`** | <code>O</code> |

**Returns:** <code>any</code>

--------------------


### adIsLoaded(...)

```typescript
adIsLoaded(opts: { id: number; }) => any
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`opts`** | <code>{ id: number; }</code> |

**Returns:** <code>any</code>

--------------------


### adLoad(...)

```typescript
adLoad(opts: { id: number; }) => any
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`opts`** | <code>{ id: number; }</code> |

**Returns:** <code>any</code>

--------------------


### adShow(...)

```typescript
adShow(opts: { id: number; }) => any
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`opts`** | <code>{ id: number; }</code> |

**Returns:** <code>any</code>

--------------------


### adHide(...)

```typescript
adHide(opts: { id: number; }) => any
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`opts`** | <code>{ id: number; }</code> |

**Returns:** <code>any</code>

--------------------


### trackingAuthorizationStatus()

```typescript
trackingAuthorizationStatus() => any
```

**Returns:** <code>any</code>

--------------------


### requestTrackingAuthorization()

```typescript
requestTrackingAuthorization() => any
```

**Returns:** <code>any</code>

--------------------


### addListener(string, ...)

```typescript
addListener(eventName: string, listenerFunc: (event: any) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                 |
| ------------------ | ------------------------------------ |
| **`eventName`**    | <code>string</code>                  |
| **`listenerFunc`** | <code>(event: any) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                      |
| ------------ | ------------------------- |
| **`remove`** | <code>() =&gt; any</code> |


### Type Aliases


#### AdMobConfig

<code>{ appMuted?: boolean appVolume?: number }</code>


#### RequestConfig

<code>{ maxAdContentRating?: <a href="#maxadcontentrating">MaxAdContentRating</a> tagForChildDirectedTreatment?: boolean | null tagForUnderAgeOfConsent?: boolean | null testDeviceIds?: string[] }</code>


#### MobileAdOptions

<code>{ adUnitId: string }</code>


### Enums


#### MaxAdContentRating

| Members           | Value             |
| ----------------- | ----------------- |
| **`G`**           | <code>'G'</code>  |
| **`MA`**          | <code>'MA'</code> |
| **`PG`**          | <code>'PG'</code> |
| **`T`**           | <code>'T'</code>  |
| **`UNSPECIFIED`** | <code>''</code>   |


#### TrackingAuthorizationStatus

| Members             | Value          |
| ------------------- | -------------- |
| **`notDetermined`** | <code>0</code> |
| **`restricted`**    | <code>1</code> |
| **`denied`**        | <code>2</code> |
| **`authorized`**    | <code>3</code> |

</docgen-api>
