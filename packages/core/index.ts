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
  childDirectedTreatment?: boolean
  underAgeOfConsent?: boolean
}
