import { AdSizeType } from './constants'

export { Events, NativeActions } from './constants'
export { AdSizeType }

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

type AdSize =
  | AdSizeType
  | {
      width: number;
      height: number;
    }

type BannerPosition = 'bottom' | 'top'

export interface IBannerRequest extends IAdRequest {
  position?: BannerPosition
  size?: AdSize
}
