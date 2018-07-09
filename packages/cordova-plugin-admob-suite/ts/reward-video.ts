import { AdBase, Platforms } from './base'

export default class RewardVideo extends AdBase {
  protected get testAdUnitID() {
    switch (this.state.platform) {
      case Platforms.android:
        return 'ca-app-pub-3940256099942544/5224354917'
      case Platforms.ios:
        return 'ca-app-pub-3940256099942544/1712485313'
    }
  }
}
