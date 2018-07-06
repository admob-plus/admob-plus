import { AdBase, execAsync, NativeActions, Platforms } from './base'

interface IBannerShowOptions {
  adUnitID?: string
}

export default class Banner extends AdBase {
  public show(opts: IBannerShowOptions = {}) {
    return execAsync(NativeActions.banner_show, [opts])
  }
  private get testAdUnitID() {
    switch (this.state.platform) {
      case Platforms.android:
        return 'ca-app-pub-3940256099942544/6300978111'
      case Platforms.ios:
        return 'ca-app-pub-3940256099942544/2934735716'
    }
  }
}
