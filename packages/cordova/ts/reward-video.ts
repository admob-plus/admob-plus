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

const AD_ID = 3

export default class RewardVideo extends AdBase {
  protected testIdForAndroid = TestIds.reward_video_android
  protected testIdForIOS = TestIds.reward_video_ios

  public isReady() {
    return execAsync(NativeActions.reward_video_is_ready, [{id: AD_ID}])
  }

  public async load(opts: IRewardVideoPrepareOptions = {}) {
    const adUnitID = this.resolveAdUnitID(opts.id)
    await execAsync(NativeActions.reward_video_load, [
      {
        ...opts,
        adUnitID,
        id: AD_ID,
      },
    ])

    await waitEvent(Events.reward_video_load, Events.reward_video_load_fail)
  }

  public show() {
    return execAsync(NativeActions.reward_video_show, [{id: AD_ID}])
  }
}
