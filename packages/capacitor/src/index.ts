import { registerPlugin } from '@capacitor/core'

import type { AdmobPlusPlugin } from './definitions'

const AdmobPlus = registerPlugin<AdmobPlusPlugin>('AdmobPlus', {
  web: () => import('./web').then((m) => new m.AdmobPlusWeb()),
})

export * from './definitions'
export { AdmobPlus }
