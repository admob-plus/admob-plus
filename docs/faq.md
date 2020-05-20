---
id: faq
title: Frequently Asked Questions
---

## Why my ads is not showing?

Beside programming error, a common report is [no fill error](https://developers.google.com/android/reference/com/google/android/gms/ads/AdRequest#ERROR_CODE_NO_FILL),
which many users think it is the problem of the library.
It is common that for the first time requesting newly created ad unit, there is a delay to have available ads start serving.
Also, some country or targeted deivce could have less ads to serve due to publisher / user settings.


## Why my iOS `.ipa` file is increased so much after including the plugin?

Google AdMob requires [Google Mobile Ads SDK](https://developers.google.com/admob/ios/download) for iOS, which will contribute ~60MB to the app size.


## How do I fix "error: local variable callbackContext is accessed from within inner class; needs to be declared final" error when building for Android?

The problem is probably due to using an outdated version of Cordova, updating to the latest version should solve it.

For more details, read [PR #37](https://github.com/admob-plus/admob-plus/pull/37).


## Why Google report shows less impressions than the number of Ad request calls?

First of all, make sure your Ad request and display code are correct.

The Ad server may not have ads to serve for every request, which returns `NO_FILL` response.

It is receommended to track the impressions via event API instead of just the API calls, as it is not necessary result in showing Ads.


## How to use `WKWebView` instead of the default `UIWebView` for iOS?

There is [Cordova plugin](https://github.com/apache/cordova-plugin-wkwebview-engine) for this, which could be installed by

```sh
cordova plugin add cordova-plugin-wkwebview-engine
```

Then add the following to `config.xml`,

```xml
<feature name="CDVWKWebViewEngine">
  <param name="ios-package" value="CDVWKWebViewEngine" />
</feature>

<preference name="CordovaWebViewEngine" value="CDVWKWebViewEngine" />
```


## How this project relates to `cordova-plugin-admob-free`?

`admob-plus` is the successor of [cordova-plugin-admob-free](https://github.com/ratson/cordova-plugin-admob-free), which provides a cleaner API and build with modern tools.

`cordova-plugin-admob-free` is orginally a fork by removing ad-sharing code from `cordova-plugin-admob-simple`, which is also fork from `cordova-plugin-admob`. Therefore, many hacks and APIs are inherited. As the project evolves, the code for Android was completely rewritten, and new APIs were added under constraints of existing code orginalization and architecture.

With the growing number of reported issues, it is clear that a better solution is needed, so `admob-plus` is borned with the following features in mind:

* Written in TypeScript
* First-class promise API
* Rewrite iOS part using Swift
* Official Ionic support
* Rich documentation


## How to fund this project?

Unfortunately, transfer money between two parties is not free, payment processors charges transaction fee plus a fixed fee based on currency received.

Therefore, small transactions means the percentage for payment processors will be higher, it is more like funding the payment processor rather than my work, I would prefer people to wait and accumulate until they are ready pay with a reasonable bigger amount.

IMO, small teams should focus on their product and move forward as quick as possible, while established teams should consider giving back to the community for what makes them succeed.

I prefer to have [a few fixed amount subscription plans](https://ratson.name/fund-admob-plus/), which can be cancelled at any time, so people who want to fund more could simply subscribe the plan longer. This also help me easily determine how much time I would spend on the projects each month.

However, [paypal.me](https://www.paypal.me/ratsonal) is also available as [suggested](https://github.com/admob-plus/admob-plus/issues/10) by [@Blanketsniffer](https://github.com/Blanketsniffer).

Maintaining an open source project is a continuous effort, I wish the support goes the same if possible.

Other funding options are welcome, feel free to [suggest your preference](https://github.com/admob-plus/admob-plus/issues/new?title=%5BFunding%20Suggestion%5D).
