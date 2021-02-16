export interface AdMobPlusPlugin {
  start(): Promise<void>

  interstitialLoad(opts: { id: number; adUnitID: string }): Promise<void>
  interstitialShow(opts: { id: number }): Promise<void>
}
