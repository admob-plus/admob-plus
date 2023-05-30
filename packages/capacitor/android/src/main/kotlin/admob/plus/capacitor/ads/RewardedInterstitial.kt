package admob.plus.capacitor.ads

import admob.plus.capacitor.ExecuteContext
import admob.plus.capacitor.Generated
import admob.plus.core.Context
import admob.plus.core.GenericAd
import com.google.android.gms.ads.AdError
import com.google.android.gms.ads.FullScreenContentCallback
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.rewarded.RewardItem
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAd
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAdLoadCallback

class RewardedInterstitial(ctx: ExecuteContext?) : AdBase(ctx), GenericAd {
    private var mAd: RewardedInterstitialAd? = null
    override fun destroy() {
        clear()
        super.destroy()
    }

    override fun load(ctx: Context?) {
        clear()
        RewardedInterstitialAd.load(
            activity,
            adUnitId,
            ctx!!.optAdRequest(),
            object : RewardedInterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(loadAdError: LoadAdError) {
                    clear()
                    emit(Generated.Events.REWARDED_INTERSTITIAL_LOAD_FAIL, loadAdError)
                    ctx.reject(loadAdError)
                }

                override fun onAdLoaded(rewardedAd: RewardedInterstitialAd) {
                    mAd = rewardedAd
                    val ssv = ctx.optServerSideVerificationOptions()
                    if (ssv != null) {
                        mAd!!.setServerSideVerificationOptions(ssv)
                    }
                    mAd!!.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdDismissedFullScreenContent() {
                            clear()
                            emit(Generated.Events.REWARDED_INTERSTITIAL_DISMISS)
                        }

                        override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                            emit(Generated.Events.REWARDED_INTERSTITIAL_SHOW_FAIL, adError)
                        }

                        override fun onAdShowedFullScreenContent() {
                            emit(Generated.Events.REWARDED_INTERSTITIAL_SHOW)
                        }

                        override fun onAdImpression() {
                            emit(Generated.Events.REWARDED_INTERSTITIAL_IMPRESSION)
                        }
                    }
                    emit(Generated.Events.REWARDED_INTERSTITIAL_LOAD)
                    ctx.resolve()
                }
            })
    }

    override val isLoaded: Boolean
        get() = mAd != null

    override fun show(ctx: Context?) {
        mAd!!.show(activity) { rewardItem: RewardItem? ->
            emit(
                Generated.Events.REWARDED_INTERSTITIAL_REWARD,
                rewardItem!!
            )
        }
        ctx!!.resolve()
    }

    private fun clear() {
        if (mAd != null) {
            mAd!!.fullScreenContentCallback = null
            mAd = null
        }
    }
}
