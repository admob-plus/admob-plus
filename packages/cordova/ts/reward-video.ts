import {
  AdBase,
  AdUnitIDOption,
  Events,
  execAsync,
  NativeActions,
  TestIds,
  waitEvent,
} from './base'

interface IRewardVideoPrepareOptions {
  id?: AdUnitIDOption
}

export default class RewardVideo extends AdBase {
  protected testIdForAndroid = TestIds.reward_video_android
  protected testIdForIOS = TestIds.reward_video_ios

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
}
