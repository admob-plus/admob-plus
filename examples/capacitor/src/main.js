import { AdMobPlus, InterstitialAd } from '@admob-plus/capacitor'

const main = async () => {
  await AdMobPlus.start()

  const interstitial = new InterstitialAd({
    adUnitId: 'ca-app-pub-3940256099942544/1033173712',
  })
  await interstitial.load()
  await interstitial.show()
}

main().catch(console.error)
