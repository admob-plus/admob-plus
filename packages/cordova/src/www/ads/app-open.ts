import {MobileAd, MobileAdOptions} from './base';

export enum AppOpenAdOrientation {
  Portrait = 1,
  PortraitUpsideDown = 2,
  LandscapeRight = 3,
  LandscapeLeft = 4,
}

export class AppOpenAd extends MobileAd<
  MobileAdOptions & {orientation: AppOpenAdOrientation}
> {
  static readonly cls = 'AppOpenAd';
  static readonly Orientation = AppOpenAdOrientation;

  public isLoaded() {
    return super.isLoaded();
  }

  public load() {
    return super.load();
  }

  async show() {
    return super.show() as Promise<boolean>;
  }
}
