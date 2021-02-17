export interface AdMobPlusPlugin {
  start(): Promise<void>

  interstitialLoad(opts: { id: number; adUnitId: string }): Promise<void>
  interstitialShow(opts: { id: number }): Promise<void>

  rewardedLoad(opts: { id: number; adUnitId: string }): Promise<void>
  rewardedShow(opts: { id: number }): Promise<void>
}
