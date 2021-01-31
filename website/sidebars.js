module.exports = {
  docs: {
    Cordova: [
      'cordova/installation',
      {
        'Ad Formats': [
          'cordova/ads/banner',
          'cordova/ads/interstitial',
          'cordova/ads/rewarded',
        ],
        'Advanced Topics': ['cordova/volume-control'],
        API: require('./sidebar/typedoc-cordova.js'),
      },
    ],
  },
}
