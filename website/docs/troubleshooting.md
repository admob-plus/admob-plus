---
title: Troubleshooting
sidebar_label: Troubleshooting
---

## First Step

Run the following command in your project root directory,

```sh-session
npx admob-plus doctor
```

This will scan for common errors and provide suggestions how to fix them.


## FAQ

### Why are ads not showing?

Beside programming error, a common report is [no fill error](https://developers.google.com/android/reference/com/google/android/gms/ads/AdRequest#ERROR_CODE_NO_FILL) ([explanation post](https://support.google.com/admob/thread/3494603)),
which many users think it is the problem of the library.

It is common that for the first time requesting newly created ad unit, there is a delay to have available ads start serving.

Also, some country or targeted deivce could have less ads to serve due to publisher / user settings.

Check [common reasons for ads not showing](https://support.google.com/admob/answer/9469204).

### Why Google report shows less impressions than the number of Ad request calls?

First of all, make sure your Ad request and display code are correct.

The Ad server may not have ads to serve for every request, which returns `NO_FILL` response.

It is receommended to track the impressions via event API instead of just the API calls, as it is not necessary result in showing Ads.

### How to handle "Add or update app-ads.txt" in AdMob console?

It does not relate to the plugin, see ["Set up an app-ads.txt file for your app"](https://support.google.com/admob/answer/9363762?hl=en).
