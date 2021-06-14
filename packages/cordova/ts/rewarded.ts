import { GenericAd, MobileAdOptions } from './shared'

export interface ServerSideVerificationOptions {
  customData?: string
  userId?: string
}

export interface RewardedAdOptions extends MobileAdOptions {
  serverSideVerification?: ServerSideVerificationOptions
}

export default class RewardedAd extends GenericAd<
  RewardedAdOptions,
  undefined
> {}
