import { RewardedAdOptions } from './rewarded'
import { MobileAd } from './shared'

export interface RewardedInterstitialAdOptions extends RewardedAdOptions {}

export default class RewardedInterstitialAd extends MobileAd<RewardedInterstitialAdOptions> {}
