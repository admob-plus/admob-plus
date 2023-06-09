import * as cordova from 'cordova';
import channel from 'cordova/channel';
import exec from 'cordova/exec';
import {AdMob} from './index';
import {MobileAd} from './ads/base';
import {CordovaAction, CordovaService} from './common';

const admob = new AdMob();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onMessageFromNative(event: any) {
  const {data} = event;
  if (data && data.adId) {
    data.ad = MobileAd.getAdById(data.adId);
  }
  cordova.fireDocumentEvent(event.type, data);
}

const feature = 'onAdMobPlusReady';
channel.createSticky(feature);
channel.waitForInitialization(feature);

channel.onCordovaReady.subscribe(() => {
  const action: CordovaAction = 'ready';
  exec(onMessageFromNative, console.error, CordovaService, action, []);
  channel.initializationComplete(feature);
});

export default admob;
