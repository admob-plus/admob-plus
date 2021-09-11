import type { PluginListenerHandle } from '@capacitor/core'

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
}

export type RequestConfig = {
  maxAdContentRating?: MaxAdContentRating
  sameAppKey?: boolean
  tagForChildDirectedTreatment?: boolean | null
  tagForUnderAgeOfConsent?: boolean | null
  testDeviceIds?: string[]
}

export enum TrackingAuthorizationStatus {
  notDetermined = 0,
  restricted = 1,
  denied = 2,
  authorized = 3,
}

export type MobileAdOptions = { adUnitId: string }

export interface AdMobPlusPlugin {
  start(): Promise<void>
  configure(config: AdMobConfig): Promise<void>
  configRequest(requestConfig: RequestConfig): Promise<void>

  adCreate<O extends MobileAdOptions>(opts: O): Promise<void>
  adIsLoaded(opts: { id: number }): Promise<boolean>
  adLoad(opts: { id: number }): Promise<void>
  adShow(opts: { id: number }): Promise<void>
  adHide(opts: { id: number }): Promise<void>

  trackingAuthorizationStatus(): Promise<{
    status: TrackingAuthorizationStatus | false
  }>
  requestTrackingAuthorization(): Promise<{
    status: TrackingAuthorizationStatus | false
  }>

  addListener(
    eventName: string,
    listenerFunc: (event: any) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle
}
