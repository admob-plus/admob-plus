import cordova from 'cordova'
import channel from 'cordova/channel'
import exec from 'cordova/exec'
import { AdMob } from '.'
import {
  MobileAd,
  NativeActions
} from './shared'


const admob = new AdMob()

function onMessageFromNative(event: any) {
  const { data } = event
  if (data && data.adId) {
    data.ad = MobileAd.getAdById(data.adId)
  }
  cordova.fireDocumentEvent(event.type, data)
}

channel.createSticky('onAdMobPlusReady')
channel.waitForInitialization('onAdMobPlusReady')

channel.onCordovaReady.subscribe(() => {
  exec(onMessageFromNative, console.error, 'AdMob', NativeActions.ready, [])
  channel.initializationComplete('onAdMobPlusReady')
})

export default admob
