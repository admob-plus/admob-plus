import { AdMobPlus, InterstitialAd, RewardedAd } from '@admob-plus/capacitor'

const main = async () => {
  await AdMobPlus.start()

  const interstitial = new InterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/1033173712',
  })
  await interstitial.load()
  await interstitial.show()

  const rewarded = new RewardedAd({
    adUnitId: 'ca-app-pub-3940256099942544/5224354917',
  })
  await rewarded.load()
  await rewarded.show()
}

main().catch(console.error)
