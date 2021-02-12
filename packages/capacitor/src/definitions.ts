declare global {
  interface PluginRegistry {
    AdmobPlus?: AdmobPlusPlugin
  }
}
export interface LoadAdOptions {
  id: number
  adUnitId: string
  childDirected?: boolean
  nonPersonalizedAds: boolean
  testDevices?: string[]
}

export interface IsLoadedResult {
  isLoaded: boolean
}

export interface AdmobPlusPlugin {
  isFirebaseTestLabDevice(): Promise<{ value: boolean }>
  interstitial_load(options: LoadAdOptions): Promise<void>
  interstitial_isLoaded(options: { id: number }): Promise<IsLoadedResult>
  interstitial_show(options: { id: number }): Promise<void>
}
