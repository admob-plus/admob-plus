// eslint-disable-next-line no-shadow
export enum MaxAdContentRating {
  G = 'G',
  MA = 'MA',
  PG = 'PG',
  T = 'T',
  UNSPECIFIED = '',
}

export type AdMobConfig = {
  appMuted?: boolean
  appVolume?: number
  maxAdContentRating?: MaxAdContentRating
  sameAppKey?: boolean
  tagForChildDirectedTreatment?: boolean | null
  tagForUnderAgeOfConsent?: boolean | null
  testDeviceIds?: string[]
}

export type MobileAdOptions = { adUnitId: string }

export interface AdMobPlusPlugin {
  start(): Promise<void>
  configure(config: AdMobConfig): Promise<void>

  adCreate<O extends MobileAdOptions>(opts: O): Promise<void>
  adIsLoaded(opts: { id: number }): Promise<boolean>
  adLoad(opts: { id: number }): Promise<void>
  adShow(opts: { id: number }): Promise<void>
}
