import { AdBase, execAsync, NativeActions } from './base'

interface IBannerShowOptions {
  adUnitID?: string
}

export default class Banner extends AdBase {
  public show(opts: IBannerShowOptions = {}) {
    return execAsync(NativeActions.banner_show, [opts])
  }
}
