import admobInstance from './admob'

declare global {
  const admob: typeof admobInstance
}

export * from './api'
export { default as BannerAd } from './banner'
export { default as InterstitialAd } from './interstitial'
export { default as RewardedAd } from './rewarded'

export default admobInstance
