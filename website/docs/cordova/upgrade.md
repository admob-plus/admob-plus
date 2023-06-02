---
title: Upgrade Guide
sidebar_label: Upgrade
---

## From V1 to V2

### Kotlin Required

Kotlin support is required for V2, make sure your project is enabled it.

```xml title="config.xml" {2}
<platform name="android">
    <preference name="GradlePluginKotlinEnabled" value="true" />
</platform>
```

### Ad `id` defaults to `adUnitId`

Instead of auto-generated `id` for the ad instance, it is now default to `adUnitId`.

The change is introduced to avoid new instances are being created after the webview is reloaded.

The `id` property is used to reference the same instance in the native code, so it should be the same between page reload.

### Remove specific ad-type events

They are replaced with `admob.ad.*` events.
