import {
  AdMobPlus,
  BannerAd,
  InterstitialAd,
  RewardedAd,
} from '@admob-plus/capacitor'

const main = async () => {
  await AdMobPlus.start()

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

  /*
  const interstitial = new InterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/1033173712',
  })
  await interstitial.load()
  await interstitial.show()

  const rewarded = new RewardedAd({
    adUnitId: 'ca-app-pub-3940256099942544/5224354917',
  })
  await rewarded.load()
  await rewarded.show()*/
}

main().catch(console.error)
