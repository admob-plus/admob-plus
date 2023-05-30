import { Capacitor } from '@capacitor/core'
import {
  AdMobPlus,
  BannerAd,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
} from '@admob-plus/capacitor'

const initBanner = async () => {
  AdMobPlus.addListener('banner.load', (info) => {
    console.log('banner.load', info)
  })

  const banner = new BannerAd({
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    position: 'top',
  })
  await banner.show()

  let shown = true
  const btn = document.getElementById('toggle-banner-btn')
  btn.addEventListener('click', async () => {
    if (shown) {
      await banner.hide()
    } else {
      await banner.show()
    }
    shown = !shown
    btn.innerHTML = shown ? 'Hide Banner' : 'Show Banner'
  })

  const btnAdd = document.getElementById('add-banner-btn')
  btnAdd.addEventListener('click', async () => {
    const ad = new BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    })
    await ad.show()
  })
}

const initInterstitial = async () => {
  const interstitial = new InterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/1033173712',
  })

  const btn = document.getElementById('show-interstitial-btn')
  btn.addEventListener('click', async () => {
    await interstitial.load()
    await interstitial.show()
  })
}

const initRewarded = async () => {
  AdMobPlus.addListener('rewarded.reward', (info) => {
    console.log('rewarded.reward', info)
  })

  const rewarded = new RewardedAd({
    adUnitId: 'ca-app-pub-3940256099942544/5224354917',
  })

  const btn = document.getElementById('show-rewarded-btn')
  btn.addEventListener('click', async () => {
    await rewarded.load()
    await rewarded.show()
  })
}

const initRewardedInterstitial = async () => {
  const rewarded = new RewardedInterstitialAd({
    adUnitId:
      Capacitor.getPlatform() === 'android'
        ? 'ca-app-pub-3940256099942544/5354046379'
        : 'ca-app-pub-3940256099942544/6978759866',
  })

  const btn = document.getElementById('show-rewarded-interstitial-btn')
  btn.addEventListener('click', async () => {
    await rewarded.load()
    await rewarded.show()
  })
}

const main = async () => {
  await AdMobPlus.requestTrackingAuthorization()

  await AdMobPlus.start()

  await AdMobPlus.configRequest({
    tagForChildDirectedTreatment: false,
  })

  await Promise.all([
    initBanner(),
    initInterstitial(),
    initRewarded(),
    initRewardedInterstitial(),
  ]).catch((err) => {
    console.error(err)
    alert(`init error: ${err}`)
  })
}

main().catch(console.error)
