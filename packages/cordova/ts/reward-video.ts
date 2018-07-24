import {
  AdBase,
  AdUnitIDOption,
  Events,
  execAsync,
  NativeActions,
  Platforms,
  waitEvent,
} from './base'

interface IRewardVideoPrepareOptions {
  id?: AdUnitIDOption
}

export default class RewardVideo extends AdBase {
  public async load(opts: IRewardVideoPrepareOptions = {}) {
    await execAsync(NativeActions.reward_video_load, [
      {
        ...opts,
        adUnitID: this.resolveAdUnitID(opts.id),
      },
    ])

    await waitEvent(Events.reward_video_load, Events.reward_video_load_fail)
  }

  public show() {
    return execAsync(NativeActions.reward_video_show)
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
