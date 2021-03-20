export enum MaxAdContentRating {
  G = 'G',
  MA = 'MA',
  PG = 'PG',
  T = 'T',
  UNSPECIFIED = '',
}

export type RequestConfig = {
  maxAdContentRating?: MaxAdContentRating
  tagForChildDirectedTreatment?: boolean | null
  tagForUnderAgeOfConsent?: boolean | null
  testDeviceIds?: string[]
}

export interface AdMobPlusPlugin {
  start(): Promise<void>

  configRequest(requestConfig: RequestConfig): Promise<void>

  bannerShow(opts: {
    id: number
    adUnitId: string
    position?: 'bottom' | 'top'
  }): Promise<void>
  bannerHide(opts: { id: number }): Promise<void>

  interstitialLoad(opts: { id: number; adUnitId: string }): Promise<void>
  interstitialShow(opts: { id: number }): Promise<void>

  rewardedLoad(opts: { id: number; adUnitId: string }): Promise<void>
  rewardedShow(opts: { id: number }): Promise<void>

  rewardedInterstitialLoad(opts: {
    id: number
    adUnitId: string
  }): Promise<void>
  rewardedInterstitialShow(opts: { id: number }): Promise<void>
}
