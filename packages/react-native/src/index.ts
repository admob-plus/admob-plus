import { NativeModules } from 'react-native'

interface AdMobPlus {
  start(): Promise<void>
}

const { RNAdMobPlus } = NativeModules

export const AdMob = RNAdMobPlus as AdMobPlus

export default AdMob
