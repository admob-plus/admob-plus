package admob.plus.cordova.ads

import admob.plus.cordova.Events
import admob.plus.cordova.ExecuteContext
import admob.plus.core.Context
import com.google.android.gms.ads.AdError
import com.google.android.gms.ads.FullScreenContentCallback
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.rewarded.RewardItem
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback

class Rewarded(ctx: ExecuteContext) : AdBase(ctx) {
    private var mAd: RewardedAd? = null
    override fun onDestroy() {
        clear()
        super.onDestroy()
    }

    override fun load(ctx: Context) {
        clear()
        RewardedAd.load(adapter.activity, adUnitId, adRequest, object : RewardedAdLoadCallback() {
            override fun onAdFailedToLoad(loadAdError: LoadAdError) {
                mAd = null
                emit(Events.AD_LOAD_FAIL, loadAdError)
                emit(Events.REWARDED_LOAD_FAIL, loadAdError)
                ctx.reject(loadAdError.toString())
            }

            override fun onAdLoaded(rewardedAd: RewardedAd) {
                mAd = rewardedAd
                val ssv = ctx.optServerSideVerificationOptions()
                if (ssv != null) {
                    mAd!!.setServerSideVerificationOptions(ssv)
                }
                mAd!!.fullScreenContentCallback = object : FullScreenContentCallback() {
                    override fun onAdDismissedFullScreenContent() {
                        emit(Events.AD_DISMISS)
                        emit(Events.REWARDED_DISMISS)
                    }

                    override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                        emit(Events.AD_SHOW_FAIL, adError)
                        emit(Events.REWARDED_SHOW_FAIL, adError)
                    }

                    override fun onAdShowedFullScreenContent() {
                        clear()
                        emit(Events.AD_SHOW)
                        emit(Events.REWARDED_SHOW)
                    }

                    override fun onAdImpression() {
                        emit(Events.AD_IMPRESSION)
                        emit(Events.REWARDED_IMPRESSION)
                    }
                }
                emit(Events.AD_LOAD)
                emit(Events.REWARDED_LOAD)
                ctx.resolve()
            }
        })
    }

    override val isLoaded: Boolean get() = mAd != null

    override fun show(ctx: Context) {
        if (this.isLoaded) {
            mAd!!.show(adapter.activity) { rewardItem: RewardItem? ->
                emit(Events.AD_REWARD, rewardItem!!)
                emit(Events.REWARDED_REWARD, rewardItem)
            }
            ctx.resolve()
        } else {
            ctx.reject("Ad is not loaded")
        }
    }

    private fun clear() {
        if (mAd != null) {
            mAd = null
        }
    }
}
