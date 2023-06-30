---
title: Upgrade Guide
sidebar_label: Upgrade
---

## From V1 to V2

This package is no longer needed, [`admob-plus-cordova`](../cordova) can be used directly.

Read the [Upgrade Guide](../cordova/upgrade) for [`admob-plus-cordova`](../cordova/upgrade) what changed.

### Migrate existing code to use `admob-plus-cordova` directly

Remove provider in `src/app/app.module.ts`.

Search your codebase with `@admob-plus/ionic` imports, replace them with corresponding `admob-plus-cordova` imports.

Replace `this.admob` to `admob` should work most of the time.

Check out [this example](https://github.com/admob-plus/admob-plus/blob/master/examples/ionic-angular/src/app/home/home.page.ts) for reference.


### Remove `AdMob` static property for Ad classes

Use the exported class instead.
