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

Make sure you have listen to error event and log the fail reason, ads may fail to load for various reasons.

Beside programming error, a common report is [no fill error](https://developers.google.com/android/reference/com/google/android/gms/ads/AdRequest#ERROR_CODE_NO_FILL) ([explanation post](https://support.google.com/admob/thread/3494603)),
which many users think it is the problem of the library.

It is common that for the first time requesting newly created ad unit, there is a delay to have available ads start serving.

Also, some country or targeted deivce could have less ads to serve due to publisher / user settings.

Check [common reasons for ads not showing](https://support.google.com/admob/answer/9469204).

|                         Problem                          |                                                                                                                       Answer                                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Did you recently create your AdMob account?              | Wait up to 24 hours after you create your account.                                                                                                                                                                                                  |
| Is your app or ad unit new?                              | Wait up to one hour after you create an app or ad unit.<br/><br/>In some cases, it can take a few days for ads to appear in new apps or ad units.<br/><br/>Note: New iOS apps will not show Google ads until they’re listed in the Apple App Store. |
| Have you integrated the Google Mobile Ads SDK correctly? | Take a look at [the examples](https://github.com/admob-plus/admob-plus/tree/master/examples).                                                                                                                                                        |

### Why Google report shows less impressions than the number of Ad request calls?

First of all, make sure your Ad request and display code are correct.

The Ad server may not have ads to serve for every request, which returns `NO_FILL` response.

It is receommended to track the impressions via event API instead of just the API calls, as it is not necessary result in showing Ads.

### How to handle "Add or update app-ads.txt" in AdMob console?

It does not relate to the plugin, see ["Set up an app-ads.txt file for your app"](https://support.google.com/admob/answer/9363762?hl=en).

### Why my app is removed from Google Play?

It is likely you have violated some of the policies, one is common that you are not using [Test Ads](./cordova/test-ads) during development, see [AdMob & AdSense program policies - Invalid traffic](https://support.google.com/admob/answer/3342054?hl=en).

Another reason could be displaying ads in a way that is not appropriated, see [Disallowed interstitial implementations](https://support.google.com/admob/answer/6201362?hl=en).
