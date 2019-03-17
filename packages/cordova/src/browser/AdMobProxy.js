'use strict'

const AdMob = {
  banner_hide() {},
  banner_show() {},
  interstitial_load() {},
  interstitial_show() {},
  interstitial_is_loaded() {},
  ready() {},
  reward_video_load() {},
  reward_video_show() {},
  set_app_muted() {},
  set_app_volume() {},
}

// eslint-disable-next-line node/no-missing-require
require('cordova/exec/proxy').add('AdMob', AdMob)
