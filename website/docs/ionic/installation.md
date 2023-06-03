---
title: Installation
sidebar_label: Installation
---

This package is a wrapper of [`admob-plus-cordova`](../cordova), hence the Cordova plugin configuration is used.

First, set your AdMob application information in `package.json`.

```json title="package.json" {4-7}
{
  "cordova": {
    "plugins": {
      "admob-plus-cordova": {
        "APP_ID_ANDROID": "ca-app-pub-xxx~yyy",
        "APP_ID_IOS": "ca-app-pub-xxx~yyy"
      }
    }
  }
}
```

```shell
ionic cordova plugin add admob-plus-cordova
npm install @admob-plus/ionic
```

:::note
`ionic-angular` user needs to update `typescript` to a recent version, or config `"skipLibCheck": true` in `tsconfig.json` to avoid type errors.
:::
