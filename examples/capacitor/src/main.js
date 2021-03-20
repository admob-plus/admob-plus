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
    position: 'bottom',
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
    adUnitId: 'ca-app-pub-3940256099942544/6978759866',
  })

  const btn = document.getElementById('show-rewarded-interstitial-btn')
  btn.addEventListener('click', async () => {
    await rewarded.load()
    await rewarded.show()
  })
}

const main = async () => {
  await AdMobPlus.start()

  await AdMobPlus.configRequest({
    tagForChildDirectedTreatment: false,
  })

  await Promise.all([
    initBanner(),
    initInterstitial(),
    initRewarded(),
    initRewardedInterstitial(),
  ]).catch(console.error)
}

main().catch(console.error)
