module.exports = {
  docs: [
    'index',
    {
      Capacitor: [
        'capacitor/installation',
        {
          'Ad Formats': [
            'capacitor/ads/interstitial',
            'capacitor/ads/rewarded',
          ],
        },
        {
          type: 'link',
          label: 'CHANGELOG',
          href:
            'https://github.com/admob-plus/admob-plus/blob/master/packages/capacitor/CHANGELOG.md',
        },
      ],
      Cordova: [
        'cordova/installation',
        {
          'Ad Formats': [
            'cordova/ads/banner',
            'cordova/ads/interstitial',
            'cordova/ads/rewarded',
            'cordova/ads/rewarded-interstitial',
          ],
          'Advanced Topics': ['cordova/volume-control'],
          'User Consent': [
            'cordova/consent/request',
            { API: require('./sidebar/typedoc-cordova-consent.js') },
          ],
          API: require('./sidebar/typedoc-cordova.js'),
        },
        'cordova/faq',
        {
          type: 'link',
          label: 'CHANGELOG',
          href:
            'https://github.com/admob-plus/admob-plus/blob/master/packages/cordova/CHANGELOG.md',
        },
      ],
      Ionic: [
        'ionic/installation',
        {
          'Ad Formats': [
            'ionic/ads/banner',
            'ionic/ads/interstitial',
            'ionic/ads/rewarded',
          ],
        },
        {
          type: 'link',
          label: 'CHANGELOG',
          href:
            'https://github.com/admob-plus/admob-plus/blob/master/packages/ionic/CHANGELOG.md',
        },
      ],
    },
  ],
}
