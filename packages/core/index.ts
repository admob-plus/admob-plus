export * from './constants'

export type AdUnitIDOption =
  | string
  | {
      android: string;
      ios: string;
    }

export interface IAdRequest {
  id?: AdUnitIDOption
  testDevices?: string[]
  childDirected?: boolean
  underAgeOfConsent?: boolean
}

export enum AdSizeType {
  BANNER,
  LARGE_BANNER,
  MEDIUM_RECTANGLE,
  FULL_BANNER,
  LEADERBOARD,
  SMART_BANNER,
}

type AdSize =
  | AdSizeType
  | {
      width: number;
      height: number;
    }

export interface IBannerRequest extends IAdRequest {
  position?: 'bottom' | 'top'
  size?: AdSize
}
