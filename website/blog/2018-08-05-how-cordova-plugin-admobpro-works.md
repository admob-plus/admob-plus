---
title: How cordova-plugin-admobpro works
author: Ratson
author_url: https://github.com/ratson
author_image_url: https://avatars.githubusercontent.com/u/2682937?v=4
tags: [admob, cordova]
---

I believe most [`cordova-plugin-admobpro`](https://www.npmjs.com/package/cordova-plugin-admobpro) users do not know how the plugin works, as the author does not explain it or intentionally hide it. This blog post is going to uncover the details, so users could have better understanding about what is added to their projects.

## cordova-plugin-extension

When looking at [the repository](https://github.com/floatinghotpot/cordova-admob-pro), it looks like a normal cordova plugin repository, where source code are `src` and `www`.

Until you read the source code line by line, you will find the native plugin classes are inherited from [`com.rjfun.cordova.ad.GenericAdPlugin`](https://github.com/floatinghotpot/cordova-admob-pro/blob/master/src/android/AdMobPlugin.java#L39) and [`GenericAdPlugin`](https://github.com/floatinghotpot/cordova-admob-pro/blob/master/src/ios/CDVAdMobPlugin.h#L11), which are come from [`cordova-plugin-extension`](https://github.com/floatinghotpot/cordova-admob-pro/blob/master/plugin.xml#L25).

The author has removed the source repository which results [the npm page](https://www.npmjs.com/package/cordova-plugin-extension) pointing to a broken link in GitHub. This should prevent a normal user finding out the content, but an advanced user could still check [the npm tarball content](https://unpkg.com/cordova-plugin-extension@1.5.4/).

The plugin has included 2 suspicious binary files, [cordova-generic-ad.jar](https://unpkg.com/cordova-plugin-extension@1.5.4/src/android/cordova-generic-ad.jar) and [libCordovaGenericAd.a](https://unpkg.com/cordova-plugin-extension@1.5.4/src/ios/libCordovaGenericAd.a). Clearly, they are providing the base native plugin classes.

## Phoning home

Since the base classes are coming from binray files, it is hard to know what they are doing. However, when trying to inspect the network requests with the plugin installed, it tells more. A HTTP request is sent after the app starts,

```http
POST http://adlic.rjfun.com/adlic HTTP/1.1
Host: adlic.rjfun.com
Content-Type: application/x-www-form-urlencoded
User-Agent: Demo/1.0.0 CFNetwork/901.1 Darwin/17.7.0
Accept-Language: en-us

app=com.rjfun.demo&os=ios&net=admob&lic=
```

It returns a JSON data,

```json
{"r":0,"b":"","i":"","n":"","v":"","js":""}
```

At this point, it is clear the plugin collecting your app info to the author owned server and response data for the plugin to consume. A guess usage would be [checking the license](https://github.com/floatinghotpot/cordova-admob-pro#license), but the author never mentions it in the documentation.

## Remote controlling ads

Thanks to [a document shared by a user](https://drive.google.com/file/d/0B5vtpya8P4b-NUZTdUhBVkFlU0E/view), it revealed more about the black magic.

From the user,
> i am using your plugin in my app. I have never use any license key. I wanted to share 2% of my ad. BUT! Your plugin took 30% of my ad.

From the plugin author,
> After check, we find your app in the black list, and a random higher rate will be applied. Usually when a guy is using a fake license key, or send unusual attacking request (for example, request not from iOS/android cordova platform), the ant­crack logic will be triggered and move the app into the black list.
>
> As mentioned in the license agreement, if you have earned more than $1000, a valid license is required, or else some ad sharing will be applied. When you use my code in your app, you are assumed to accept the license agreement. If you did not accept my term, then you are not allowed to use my code without permission.
>
> Second, the ad sharing rate is not as what you guess. You may not know that, for any new app, the ad sharing is 0% from beginning, not 2%. When the system calculate your earning exceed $1000, if no license key is still provided, it will start to applied 2% ad sharing. But, when unusual request detected, it will increase the rate bit by bit, but no more than 30%.

The plugin has ability to control how much ad-sharing from the server, and will increase ad-sharing according to some undocumented conditions. The author claims it will not share more than 30% ad revenue.

## Conclusion

The author of `cordova-plugin-admobpro` has using a very sophisticated approach to do ad-sharing without telling much details it, or writing [a very detailed document](https://github.com/floatinghotpot/coding-to-monetization) to promote his plugin, but not mentioning the ad-sharing part. It is hard judge if it is an issue of honesty, but I don't think it aligns the spirit of open source.

With the increasing adoption of [cordova-plugin-admob-free](https://github.com/ratson/cordova-plugin-admob-free), I wish there is an enough momentum to finance [a sustainable and trustable AdMob plugin](https://admob-plus.github.io/).

If you do have to stick with `cordova-plugin-admobpro`, consider adding analytics whenever displaying ads to compare it with you ad display count, so as least you know how much is lost.
