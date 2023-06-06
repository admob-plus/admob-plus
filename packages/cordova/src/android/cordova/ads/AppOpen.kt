package admob.plus.cordova.ads

import admob.plus.cordova.Events
import admob.plus.cordova.ExecuteContext
import admob.plus.core.buildAdRequest
import com.google.android.gms.ads.AdError
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.FullScreenContentCallback
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.appopen.AppOpenAd
import com.google.android.gms.ads.appopen.AppOpenAd.AppOpenAdLoadCallback
import org.json.JSONObject

fun optInt(opts: JSONObject, name: String): Int? {
    return if (opts.has(name)) opts.optInt(name) else null
}

class AppOpen(ctx: ExecuteContext) : AdBase(ctx) {
    private val mAdRequest: AdRequest
    private val mOrientation: Int
    private var mAd: AppOpenAd? = null

    init {
        mAdRequest = buildAdRequest(initOpts)
        val o = optInt(initOpts, "orientation")
        mOrientation =
            if (o == null || o == 1 || o == 2) AppOpenAd.APP_OPEN_AD_ORIENTATION_PORTRAIT else AppOpenAd.APP_OPEN_AD_ORIENTATION_LANDSCAPE
    }

    override fun onDestroy() {
        clear()
        super.onDestroy()
    }

    override fun load(ctx: ExecuteContext) {
        clear()
        AppOpenAd.load(plugin.activity,
            adUnitId,
            mAdRequest,
            mOrientation, object : AppOpenAdLoadCallback() {
                override fun onAdLoaded(ad: AppOpenAd) {
                    mAd = ad
                    ad.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdDismissedFullScreenContent() {
                            clear()
                            emit(Events.AD_DISMISS)
                        }

                        override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                            clear()
                            emit(Events.AD_SHOW_FAIL, adError)
                        }

                        override fun onAdShowedFullScreenContent() {
                            emit(Events.AD_SHOW)
                        }

                        override fun onAdImpression() {
                            emit(Events.AD_IMPRESSION)
                        }
                    }
                    emit(Events.AD_LOAD)
                    ctx.resolve()
                }

                override fun onAdFailedToLoad(loadAdError: LoadAdError) {
                    clear()
                    emit(Events.AD_LOAD_FAIL, loadAdError)
                    ctx.reject(loadAdError.toString())
                }
            })
    }

    override val isLoaded: Boolean get() = mAd != null

    override fun show(ctx: ExecuteContext) {
        mAd!!.show(plugin.activity)
        ctx.resolve(true)
    }

    private fun clear() {
        if (mAd != null) {
            mAd = null
        }
    }
}
