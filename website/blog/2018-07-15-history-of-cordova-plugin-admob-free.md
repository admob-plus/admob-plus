---
title: History of cordova-plugin-admob-free
author: Ratson
author_url: https://github.com/ratson
author_image_url: https://avatars.githubusercontent.com/u/2682937?v=4
tags: [admob, cordova, cordova-plugin-admobpro]
---

2 years ago, I have a cordova project needed to add Google AdMob for showing ads. I was searching an open source solution, soon landed to the popular [cordova-plugin-admobpro](https://www.npmjs.com/package/cordova-plugin-admobpro).

## Research

As my typical practice of choosing a open source project, apart from looking at Github stars and package download count, I would read the source code to evaluate the code quality and check past issues and pull requests for how well a project is maintained.

Like most Cordova Plugins, the code is written to be just work, not for read or extend. However, I was alerted when I was inspecting the source of its dependency, [cordova-plugin-extension](https://www.npmjs.com/package/cordova-plugin-extension). I found 2 binary files were used, [cordova-generic-ad.jar](https://unpkg.com/cordova-plugin-extension@1.5.4/src/android/cordova-generic-ad.jar) for Android and [libCordovaGenericAd.a](https://unpkg.com/cordova-plugin-extension@1.5.4/src/ios/libCordovaGenericAd.a) for iOS.

Then I searched through the documentation for explaination about the binary files, the author said nothing about them, but I found the [pruchase license option](https://github.com/floatinghotpot/cordova-admob-pro#license), so it is very like some license verification code. After I run it under network monitoring, I discovered that the plugin is sending application information to http://adlic.rjfun.com/adlic to retrive Ad Unit ID. Searching the URL in the issue track reveals that a user reported lose revenue and the author explained it was some server bugs.

At this point, I have lost trust to the author, I started searching other solutions. Interestingly, there is no completely free and open source solution, many are doing ad-sharing without telling their users.

## Fork

I then decided to fork a relative high quality plugin with the ad-sharing code removed, I picked [cordova-plugin-admob-simple](https://www.npmjs.com/package/cordova-plugin-admob-simple) as it has the most recent commit at that time. Just 2 weeks after I had working on my fork version, [cordova-plugin-admob](https://github.com/floatinghotpot/cordova-plugin-admob) author (the same author of `cordova-plugin-admobpro`) was [claiming his credit](https://github.com/sunnycupertino/cordova-plugin-admob-simple/issues/1).

As a result, [cordova-plugin-admob-free](https://github.com/ratson/cordova-plugin-admob-free) becomes a fork of `cordova-plugin-admob-simple` and `cordova-plugin-admob`.

## Next

AdMob Plus, being the successor of `cordova-plugin-admob-free`, is continue to be free and open source. Instead of stealing your revenve, [I ask funding explictily](https://ratson.name/fund-admob-plus), but you don't have to pay to enjoy all features.
