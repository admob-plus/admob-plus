import { registerPlugin } from '@capacitor/core'
import type { AdMobPlusPlugin } from './definitions'

const AdMobPlus = registerPlugin<AdMobPlusPlugin>('AdMobPlus', {
  web: () => import('./web').then((m) => new m.AdMobPlusWeb()),
})

export * from './definitions'
export { AdMobPlus }
