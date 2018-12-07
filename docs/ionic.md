---
id: ionic
title: Ionic
sidebar_label: Ionic
---

## Installation

```sh
ionic cordova plugin add cordova-admob-plus --variable APP_ID_ANDROID=ca-app-pub-xxx~xxx --variable APP_ID_IOS=ca-app-pub-xxx~xxx
npm install --save ionic-admob
```

If your project depends on `@ionic-native/core@beta`, `@admob-plus/ionic` should be used instead of `ionic-admob`.


## Add Plugin to Your App's Module

After installing a plugin’s package, add it to your app’s `NgModule`.

Default is path `src/app/app.module.ts`.

```typescript
...

import { AdMob } from "ionic-admob";

@NgModule({
  ...

  providers: [
    ...
    AdMob,
    ...
  ]
  ...
})
export class AppModule { }
```

Then you would be able to inject `AdMob` instance to component.

For example, edit path `src/app/app.component.ts`.

```typescript
import { AdMob } from "ionic-admob";

constructor(private admob: AdMob) {
    ...

    platform.ready().then(() => {
        admob.banner.show({ id: "test" });
    });
}

```
