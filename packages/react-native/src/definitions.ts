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
  tagForChildDirectedTreatment?: boolean | null
  tagForUnderAgeOfConsent?: boolean | null
  testDeviceIds?: string[]
}

export type MobileAdOptions = { adUnitId: string }

export interface AdMobPlusPlugin {
  start(): Promise<void>
  configure(config: AdMobConfig): Promise<void>

  interstitialLoad(opts: MobileAdOptions & { id: number }): Promise<void>
  interstitialShow(opts: { id: number }): Promise<void>

  rewardedLoad(opts: { id: number; adUnitId: string }): Promise<void>
  rewardedShow(opts: { id: number }): Promise<void>

  rewardedInterstitialLoad(
    opts: MobileAdOptions & { id: number },
  ): Promise<void>
  rewardedInterstitialShow(opts: { id: number }): Promise<void>
}
