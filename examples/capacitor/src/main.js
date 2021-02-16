import { AdMobPlus } from '@admob-plus/capacitor'

const main = async () => {
  await AdMobPlus.start()

  await AdMobPlus.interstitialLoad({
    id: 1,
    adUnitID: 'ca-app-pub-3940256099942544/1033173712',
  })
  await AdMobPlus.interstitialShow({ id: 1 })
}

main().catch(console.error)
