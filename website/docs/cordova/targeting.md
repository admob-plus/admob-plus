---
title: Targeting
---

## Child-directed setting

For purposes of the [Children's Online Privacy Protection Act (COPPA)](https://www.ftc.gov/tips-advice/business-center/privacy-and-security/children%27s-privacy), there is a setting called "tag for child-directed treatment". By setting this tag, you certify that this notification is accurate and you are authorized to act on behalf of the owner of the app. You understand that abuse of this setting may result in termination of your Google account.

The setting can be set via `admob.configRequest({tagForChildDirectedTreatment})`:

* Set `tagForChildDirectedTreatment` to `true` to indicates that you want your content treated as child-directed for purposes of COPPA.
* Set `tagForChildDirectedTreatment` to `false` to indicate that you don't want your content treated as child-directed for purposes of COPPA.
* Do not set `tagForChildDirectedTreatment` if you do not wish to indicate how you would like your content treated with respect to COPPA.

```js
admob.configRequest({
  tagForChildDirectedTreatment: true
})
```

## Users under the age of consent

You can mark your ad requests to receive treatment for users in the European Economic Area (EEA) under the age of consent. This feature is designed to help facilitate compliance with the [General Data Protection Regulation (GDPR)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679). Note that you may have other legal obligations under GDPR. Please review the European Union’s guidance and consult with your own legal counsel. Please remember that Google's tools are designed to facilitate compliance and do not relieve any particular publisher of its obligations under the law. [Learn more about how the GDPR affects publishers](https://support.google.com/admob/answer/7666366).

The setting can be set via `admob.configRequest({tagForUnderAgeOfConsent})`:

* Set `tagForUnderAgeOfConsent` to `true` to indicate that you want the ad request to receive treatment for users in the European Economic Area (EEA) under the age of consent.
* * Set `tagForUnderAgeOfConsent` to `false` to indicate that you want the ad request to not receive treatment for users in the European Economic Area (EEA) under the age of consent.
* Not setting `tagForUnderAgeOfConsent` indicates that you have not specified whether the ad request should receive treatment for users in the European Economic Area (EEA) under the age of consent.

```js
admob.configRequest({
  tagForUnderAgeOfConsent: true
})
```

## Ad content filtering

Apps can set a maximum ad content rating for their ad requests using the `admob.configRequest({maxAdContentRating})` method. AdMob ads returned when this is configured have a content rating at or below that level. The possible values for this network extra are based on [digital content label classifications](https://support.google.com/admob/answer/7562142), and must be one of the following string:

* `"G"`
* `"MA"`
* `"PG"`
* `"T"`

The following code specify that ad content returned should correspond to a digital content label designation no higher than `G`:

```js
admob.configRequest({
  maxAdContentRating: "G"
})
```

## Related

* [Targeting - Mobile Ads SDK (Android)](https://developers.google.com/admob/android/targeting)
* [Targeting - Mobile Ads SDK (iOS)](https://developers.google.com/admob/ios/targeting)
