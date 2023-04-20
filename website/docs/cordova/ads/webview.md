---
title: WebView Ad
sidebar_label: WebView
---

WebView Ad is the integration of [WebView API for Ads](https://developers.google.com/admob/android/webview) for [Android](https://developers.google.com/admob/android/webview) and [iOS](https://developers.google.com/admob/ios/webview) in the Cordova WebView, with this ads you can show AdSense ads in your app.

## AdSense

In order to use these ads you need to have an active [AdSense](https://www.google.com/adsense/start/) account, content in the WebView is subject to the same [content policy requirement](https://support.google.com/publisherpolicies/answer/11112688) as when it is in a browser.

See also:

https://support.google.com/admob/answer/48182#trs
https://support.google.com/publisherpolicies/answer/11112688

## Getting Started

Before you can display ads in the WebView, you'll need to do some preliminary steps.

### Preferences in config.xml

Enable the WebView API for Ads by adding `AdMobPlusWebViewAd` in `config.xml`, this option causes the WebView to be registered with the AdMob SDK.

It is also necessary to add your AdSense domain as `Hostname` of the CordovaWebView.

**Warning:** If you use localStorage to storage data, please note that the previously data will not be accessible when you change the hostname.

```xml
<preference name="Scheme" value="https" />
<preference name="Hostname" value="example.com" />
<preference name="AdMobPlusWebViewAd" value="true" />
```

### Performance issue (Only Android)

In order for the ads to show, the WebView needs to be registered with the AdMob SDK using `MobileAds.registerWebView(webView)`, this has to be done before the URL is set to the WebView (https://developers.google.com/admob/android/webview#register_the_webview), for my part, I have not managed to do it before cordova does it, so for it to work I had to reload the WebView with `WebView.reload()`, this affects the time of loading of the app, but I don't know if it is appreciable, it is possible to avoid this by registering the WebView in the `MainActivity.java`, how to do it below.

Any solution to this withoud changing the `MainActivity.java` is welcome.

<details><summary>Way that avoid reloadin the WebView</summary>
<p>

Create a **MainActivity.java** file.
``` java
/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package app.package.name;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;

import com.google.android.gms.ads.MobileAds;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        loadUrl(launchUrl);

        final CordovaActivity me = this;

        me.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WebView webView = (WebView) appView.getView();
                MobileAds.registerWebView(webView);
                Log.d("AdMobPlus", "Integrated the WebView API for Ads in "+webView.getUrl()+" WebView from MainActivity");
            }
        });
    }
}

```

Change `app.package.name` to you app name.

Remove this from `config.xml` or change to `false` (If you also use the WebView API for Ads on iOS, move it to `<platform  name="ios">` and set to `true`)
```xml
<preference name="AdMobPlusWebViewAd" value="true" />
```
and add this hook:
```xml
<hook type="before_build" src="update_main_activity.sh" />
```

Create a **update_main_activity.sh** file.

```bash
#!/bin/bash
cp MainActivity.java platforms/android/app/src/main/java/app/package/name/
```
Change the `app/package/name/` to you app name.

Now `registerWebView` works without reloading the webview.

</p>
</details>
  
### Content-Security-Policy in index.html

If you have a strict CSP on your app, you will need to add Google/AdSense domains to your CSP.

If you see any missing or extra domains, you can open a pull request or a issue in the repo.

``` bash
https://2mdn.net https://google.com https://google.ca https://google.co.in https://google.co.kr https://google.co.uk https://google.co.za https://google.com.ar https://google.com.au https://google.com.br https://google.com.co https://google.com.gt https://google.com.mx https://google.com.pe https://google.com.ph https://google.com.pk https://google.com.tr https://google.com.tw https://google.com.vn https://google.de https://google.dk https://google.es https://google.fr https://google.nl https://google.no https://google.pl https://google.ru https://google.vg https://app-measurement.com https://doubleclick.com https://doubleclick.net https://doubleclickbygoogle.com https://google-analytics.com https://googleadservices.com https://googlesyndication.com https://googletagmanager.com https://googletagservices.com https://gemius.pl https://ampproject.org https://gstatic.com https://google.ad https://google.ae https://google.com.af https://google.com.ag https://google.com.ai https://google.al https://google.co.ao https://google.as https://google.at https://google.az https://google.com.bd https://google.be https://google.bf https://google.bg https://google.com.bh https://google.bi https://google.bj https://google.com.bn https://google.com.bo https://google.bs https://google.bt https://google.co.bw https://google.com.bz https://google.cd https://google.cf https://google.cg https://google.ch https://google.ci https://google.co.ck https://google.cl https://google.cm https://google.co.cr https://google.com.cu https://google.cv https://google.com.cy https://google.cz https://google.dj https://google.dm https://google.dz https://google.com.ec https://google.ee https://google.com.eg https://google.com.et https://google.fi https://google.com.fj https://google.fm https://google.ga https://google.ge https://google.gg https://google.com.gh https://google.com.gi https://google.gl https://google.gm https://google.gr https://google.gy https://google.com.hk https://google.hn https://google.hr https://google.ht https://google.hu https://google.co.id https://google.ie https://google.co.il https://google.im https://google.iq https://google.is https://google.it https://google.je https://google.com.jm https://google.jo https://google.co.jp https://google.co.ke https://google.com.kh https://google.ki https://google.kg https://google.com.kw https://google.kz https://google.la https://google.com.lb https://google.li https://google.lk https://google.co.ls https://google.lt https://google.lu https://google.lv https://google.com.ly https://google.md https://google.me https://google.mg https://google.mk https://google.ml https://google.com.mm https://google.mn https://google.ms https://google.com.mt https://google.mu https://google.mv https://google.mw https://google.com.my https://google.co.mz https://google.com.na https://google.com.ng https://google.com.ni https://google.ne https://google.com.np https://google.nr https://google.nu https://google.co.nz https://google.com.om https://google.com.pa https://google.com.pg https://google.pn https://google.com.pr https://google.ps https://google.pt https://google.com.py https://google.com.qa https://google.ro https://google.rw https://google.com.sa https://google.com.sb https://google.sc https://google.se https://google.com.sg https://google.sh https://google.si https://google.sk https://google.sn https://google.so https://google.sm https://google.sr https://google.st https://google.com.sv https://google.td https://google.tg https://google.co.th https://google.com.tj https://google.tl https://google.tm https://google.tn https://google.to https://google.tt https://google.co.tz https://google.com.ua https://google.co.ug https://google.com.uy https://google.co.uz https://google.com.vc https://google.co.ve https://google.co.vi https://google.vu https://google.ws https://google.rs https://google.co.zm https://google.co.zw https://google.cat https://googleapis.com https://*.2mdn.net https://*.google.com https://*.google.ca https://*.google.co.in https://*.google.co.kr https://*.google.co.uk https://*.google.co.za https://*.google.com.ar https://*.google.com.au https://*.google.com.br https://*.google.com.co https://*.google.com.gt https://*.google.com.mx https://*.google.com.pe https://*.google.com.ph https://*.google.com.pk https://*.google.com.tr https://*.google.com.tw https://*.google.com.vn https://*.google.de https://*.google.dk https://*.google.es https://*.google.fr https://*.google.nl https://*.google.no https://*.google.pl https://*.google.ru https://*.google.vg https://*.app-measurement.com https://*.doubleclick.com https://*.doubleclick.net https://*.doubleclickbygoogle.com https://*.google-analytics.com https://*.googleadservices.com https://*.googlesyndication.com https://*.googletagmanager.com https://*.googletagservices.com https://*.gemius.pl https://*.ampproject.org https://*.gstatic.com https://*.google.ad https://*.google.ae https://*.google.com.af https://*.google.com.ag https://*.google.com.ai https://*.google.al https://*.google.co.ao https://*.google.as https://*.google.at https://*.google.az https://*.google.com.bd https://*.google.be https://*.google.bf https://*.google.bg https://*.google.com.bh https://*.google.bi https://*.google.bj https://*.google.com.bn https://*.google.com.bo https://*.google.bs https://*.google.bt https://*.google.co.bw https://*.google.com.bz https://*.google.cd https://*.google.cf https://*.google.cg https://*.google.ch https://*.google.ci https://*.google.co.ck https://*.google.cl https://*.google.cm https://*.google.co.cr https://*.google.com.cu https://*.google.cv https://*.google.com.cy https://*.google.cz https://*.google.dj https://*.google.dm https://*.google.dz https://*.google.com.ec https://*.google.ee https://*.google.com.eg https://*.google.com.et https://*.google.fi https://*.google.com.fj https://*.google.fm https://*.google.ga https://*.google.ge https://*.google.gg https://*.google.com.gh https://*.google.com.gi https://*.google.gl https://*.google.gm https://*.google.gr https://*.google.gy https://*.google.com.hk https://*.google.hn https://*.google.hr https://*.google.ht https://*.google.hu https://*.google.co.id https://*.google.ie https://*.google.co.il https://*.google.im https://*.google.iq https://*.google.is https://*.google.it https://*.google.je https://*.google.com.jm https://*.google.jo https://*.google.co.jp https://*.google.co.ke https://*.google.com.kh https://*.google.ki https://*.google.kg https://*.google.com.kw https://*.google.kz https://*.google.la https://*.google.com.lb https://*.google.li https://*.google.lk https://*.google.co.ls https://*.google.lt https://*.google.lu https://*.google.lv https://*.google.com.ly https://*.google.md https://*.google.me https://*.google.mg https://*.google.mk https://*.google.ml https://*.google.com.mm https://*.google.mn https://*.google.ms https://*.google.com.mt https://*.google.mu https://*.google.mv https://*.google.mw https://*.google.com.my https://*.google.co.mz https://*.google.com.na https://*.google.com.ng https://*.google.com.ni https://*.google.ne https://*.google.com.np https://*.google.nr https://*.google.nu https://*.google.co.nz https://*.google.com.om https://*.google.com.pa https://*.google.com.pg https://*.google.pn https://*.google.com.pr https://*.google.ps https://*.google.pt https://*.google.com.py https://*.google.com.qa https://*.google.ro https://*.google.rw https://*.google.com.sa https://*.google.com.sb https://*.google.sc https://*.google.se https://*.google.com.sg https://*.google.sh https://*.google.si https://*.google.sk https://*.google.sn https://*.google.so https://*.google.sm https://*.google.sr https://*.google.st https://*.google.com.sv https://*.google.td https://*.google.tg https://*.google.co.th https://*.google.com.tj https://*.google.tl https://*.google.tm https://*.google.tn https://*.google.to https://*.google.tt https://*.google.co.tz https://*.google.com.ua https://*.google.co.ug https://*.google.com.uy https://*.google.co.uz https://*.google.com.vc https://*.google.co.ve https://*.google.co.vi https://*.google.vu https://*.google.ws https://*.google.rs https://*.google.co.zm https://*.google.co.zw https://*.google.cat https://*.googleapis.com
```

In iOS you also have to add your domain with the scheme `app://`.

```bash
app://yourdomain.com app://*.yourdomain.com
```

## Usage

```js
let webViewAd

document.addEventListener('deviceready', async () => {
  // Only call this the first time
  webViewAd = new admob.WebViewAd({
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    adsense: 'ca-pub-xxx', // Your adsense account
    npa: nonPersonalizedAds ? '1' : '',
  });
}, false)
```

### Ad Slot

AdSense ad unit id, AdSense/WebView supported ad units are `Banner`, `Native`, `Interstitial` and `Rewarded`, although AdSense supports `Interstitial` and `Rewarded`, it is preferable to use the native AdMob ones.

See also: [Ad units, ad formats, & ad types](https://support.google.com/admob/answer/6128738)

```js
webViewAd.addAd({
  element: document.querySelector('.yourAddElement'),
  slot: '000000000', // Ad slot id, supported ads https://support.google.com/admob/answer/6128738
});
```

### Ad Format

By default, banner ad is displayed at the `auto` ad format, which enables the auto-sizing behavior for the responsive ad unit.

However, you can set a general shape for your responsive ad unit by changing the value of ad format to one of these values: `rectangle`, `vertical`, `horizontal` or any combination of these separated by a comma, e.g. `rectangle, horizontal`.

See also: [How to use responsive ad tag parameters: ad-format](https://support.google.com/adsense/answer/9183460?hl=en#zippy=%2Chorizontal-shape-example)

```js
webViewAd.addAd({
  element: document.querySelector('.yourAddElement'),
  slot: '000000000', // Ad slot id, supported ads https://support.google.com/admob/answer/6128738
  format: 'rectangle, horizontal',
});
```

### Full Width Responsive

The `fullWidth` parameter determines whether your responsive ad unit expands to use the full width of the mobile device screen. Depending on how you use the `fullWidth` parameter, you can make your responsive ad unit behave in different ways.

By setting `fullWidth` to `false`, the ad don't want to automatically expand to use the full width of the mobile device screen.

By default set to `true`

See also: [How to use responsive ad tag parameters: full-width-responsive](https://support.google.com/adsense/answer/9183460?hl=en#zippy=%2Cparameter-set-to-true-example)

```js
webViewAd.addAd({
  element: document.querySelector('.yourAddElement'),
  slot: '000000000', // Ad slot id, supported ads https://support.google.com/admob/answer/6128738
  format: 'horizontal',
  fullWidth: false,
});
```

## History

AdSense applies policy restrictions at the page or account level, to prevent page level restrictions from affecting your entire app, it is recommended that you change the current WebView url depending on the open page in your app, if possible, It is recommended that these urls are the same as those used in the web version of your app.

All URLs set with `historySetPage` and `historyReplaceState` (Including `index.html`) have to be accessible in the web version of your app (And they also must have the AdSense code applied and show the same ads as the app), this is necessary for the AdSense bot to be able to access them, if they are not accessible you will receive a warning/policy violation in the Policy Center, because of this, it is recommended to only set the urls on the pages where you want to display ads.

It is also recommended that your app be prepared to stop displaying ads on a particular page (And stop use `historySetPage/historyReplaceState` in this), in case you receive a policy violation on that page.

### Set Page

The simple way to replace the url, the following code generates a url something similar to `https://example.com/article.html?id=754`

```js
webViewAd.historySetPage('article.html', {id: 754});
```

### Replace State

With this you can replace the current url in a more personalized way, is the same as [`History.replaceState(stateObj, unused, url)`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) without `stateObj` and `unused`, the following code generates a url something similar to `https://example.com/name-of-the-article-745`

```js
webViewAd.historyReplaceState('name-of-the-article-745');
```

### Original Href

Return the original href of the WebView, something similar to `https://example.com/index.html`

```js
let originalHref = webViewAd.historyOriginalHref();
```

### Current Href

Return the current href of the WebView, is the same as `window.location.href`

```js
let currentHref = webViewAd.historyCurrentHref();
```

### Restore Original Href

This restores the original href of the WebView.

```js
webViewAd.historyRestoreOriginalHref();
```

### Resize Observer

Sometimes AdSense may not load any ads in the element, in these cases AdSense changes the ad height to 0, but if you have any margin/padding on the ad element or his parents, these will still take some space, you can use a ResizeObserver to detect this and remove margin/padding.

```js
var webViewResizeObserver = false;

// Only first time
if(typeof ResizeObserver !== 'undefined') {
  if(!webViewResizeObserver) {
    webViewResizeObserver = new ResizeObserver(function(entries) {
      for(let i = 0, len = entries.length; i < len; i++)
      {
        let entry = entries[i];
        let element = entry.target;

        // Use if the margin/pading is owned by a parent
        element = element.closest('.webViewParentName');

        if(element) {
          if(entry.contentRect.height == 0) {
            element.style.marginTop = '0px';
            element.style.marginBottom = '0px';
            element.style.paddingTop = '0px';
            element.style.paddingBottom = '0px';
          } else {
            element.style.marginTop = '';
            element.style.marginBottom = '';
            element.style.paddingTop = '';
            element.style.paddingBottom = '';
          }
        }
      }
    });
  }
}
```

and now

```js
// Add the element you have pass in webViewAd.addAd
webViewResizeObserver.observe(webViewAd.element);
```
