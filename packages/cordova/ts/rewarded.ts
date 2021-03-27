import { execAsync, MobileAd, MobileAdOptions, NativeActions } from './shared'

export interface ServerSideVerificationOptions {
  customData?: string
  userId?: string
}

export interface RewardedAdOptions extends MobileAdOptions {
  serverSideVerification?: ServerSideVerificationOptions
}

export default class RewardedAd extends MobileAd<RewardedAdOptions> {
  public isLoaded() {
    return execAsync(NativeActions.rewardedIsLoaded, [{ id: this.id }])
  }

  public load() {
    return execAsync(NativeActions.rewardedLoad, [
      { ...this.opts, id: this.id },
    ])
  }

  public show() {
    return execAsync(NativeActions.rewardedShow, [{ id: this.id }])
  }
}
