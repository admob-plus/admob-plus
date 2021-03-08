import {
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions,
  ServerSideVerificationOptions,
} from './shared'

export interface RewardedAdOptions extends MobileAdOptions {
  serverSideVerification?: ServerSideVerificationOptions
}

export default class RewardedAd extends MobileAd {
  private opts: RewardedAdOptions

  constructor(opts: RewardedAdOptions) {
    super({ adUnitId: opts.adUnitId })

    this.opts = opts
  }

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
