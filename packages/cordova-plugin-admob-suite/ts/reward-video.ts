import { AdBase, execAsync, NativeActions, Platforms } from './base'

interface IRewardVideoPrepareOptions {
  adUnitID?: string
}

export default class RewardVideo extends AdBase {
  public prepare(opts: IRewardVideoPrepareOptions = {}) {
    return execAsync(NativeActions.reward_video_prepare, [
      {
        ...opts,
        adUnitID: this.getAdUnitID(opts.adUnitID),
      },
    ])
  }

  protected get testAdUnitID() {
    switch (this.state.platform) {
      case Platforms.android:
        return 'ca-app-pub-3940256099942544/5224354917'
      case Platforms.ios:
        return 'ca-app-pub-3940256099942544/1712485313'
    }
  }
}
