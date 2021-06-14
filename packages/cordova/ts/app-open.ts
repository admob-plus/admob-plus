import { GenericAd, MobileAdOptions } from './shared'

enum AppOpenAdOrientation {
  Portrait = 1,
  PortraitUpsideDown = 2,
  LandscapeRight = 3,
  LandscapeLeft = 4,
}

export default class AppOpenAd extends GenericAd<
  MobileAdOptions & { orientation: AppOpenAdOrientation }
> {
  static readonly Orientation = AppOpenAdOrientation
}
