import _ from 'lodash'

export const Actions = _.mapValues(
  {
    ready: null,
    configRequest: null,
    setAppMuted: null,
    setAppVolume: null,
    // BannerAd
    bannerShow: null,
    bannerHide: null,
    // InterstitialAd
    interstitialIsLoaded: null,
    interstitialLoad: null,
    interstitialShow: null,
    // RewardedAd
    rewardedIsLoaded: null,
    rewardedLoad: null,
    rewardedShow: null,
  },
  (v, k) => (v === null ? k : v),
)

export const Events = _.mapValues(
  {
    initComplete: null,
    ready: null,
    // BannerAd
    bannerLoad: 'banner.load',
    bannerLoadFail: 'banner.loadFail',
    bannerOpen: 'banner.open',
    bannerClose: 'banner.close',
    bannerImpression: 'banner.impression',
    bannerClick: 'banner.click',
    // InterstitialAd
    interstitialLoad: 'interstitial.load',
    interstitialLoadFail: 'interstitial.loadFail',
    interstitialOpen: 'interstitial.open',
    interstitialClose: 'interstitial.close',
    interstitialImpression: 'interstitial.impression',
    interstitialClick: 'interstitial.click',
    // RewardedAd
    rewardedLoad: 'rewarded.load',
    rewardedLoadFail: 'rewarded.loadFail',
    rewardedOpen: 'rewarded.open',
    rewardedClose: 'rewarded.close',
    rewardedReward: 'rewarded.reward',
    rewardedShowFail: 'rewarded.showFail',
  },
  (v, k) => `admob.${v === null ? k : v}`,
)

export const AdSizeTypes = [
  'BANNER',
  'LARGE_BANNER',
  'MEDIUM_RECTANGLE',
  'FULL_BANNER',
  'LEADERBOARD',
  'SMART_BANNER',
]
