package admob.plus.cordova.ads

import admob.plus.cordova.Events
import admob.plus.cordova.ExecuteContext
import admob.plus.core.Context
import admob.plus.core.pxToDp
import android.annotation.SuppressLint
import android.content.res.Configuration
import android.util.Log
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.view.ViewTreeObserver
import android.widget.LinearLayout
import android.widget.RelativeLayout
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.LoadAdError

enum class AdSizeType {
    BANNER, LARGE_BANNER, MEDIUM_RECTANGLE, FULL_BANNER, LEADERBOARD, SMART_BANNER;

    companion object {
        fun getAdSize(adSize: Int): AdSize? {
            return when (values()[adSize]) {
                BANNER -> AdSize.BANNER
                LARGE_BANNER -> AdSize.LARGE_BANNER
                MEDIUM_RECTANGLE -> AdSize.MEDIUM_RECTANGLE
                FULL_BANNER -> AdSize.FULL_BANNER
                LEADERBOARD -> AdSize.LEADERBOARD
                SMART_BANNER -> AdSize.SMART_BANNER
                else -> null
            }
        }
    }
}

class Banner(ctx: ExecuteContext) : AdBase(ctx) {
    private val adSize: AdSize
    private val gravity: Int
    private val offset: Int?
    private var mAdView: AdView? = null
    private var mRelativeLayout: RelativeLayout? = null
    private var mAdViewOld: AdView? = null

    override val isLoaded: Boolean
        get() = mAdView != null

    init {
        adSize = ctx.optAdSize()
        gravity = if ("top" == ctx.optPosition()) Gravity.TOP else Gravity.BOTTOM
        offset = ctx.optOffset()
    }

    override fun load(ctx: Context) {
        if (mAdView == null) {
            mAdView = createBannerView()
        }
        mAdView!!.loadAd(adRequest)
        ctx.resolve()
    }

    private fun createBannerView(): AdView {
        val adView = AdView(adapter.activity)
        adView.adUnitId = adUnitId
        adView.adSize = adSize
        adView.adListener = object : AdListener() {
            override fun onAdClicked() {
                emit(Events.AD_CLICK)
                emit(Events.BANNER_CLICK)
            }

            override fun onAdClosed() {
                emit(Events.AD_DISMISS)
                emit(Events.BANNER_CLOSE)
            }

            override fun onAdFailedToLoad(error: LoadAdError) {
                emit(Events.AD_LOAD_FAIL, error)
                emit(Events.BANNER_LOAD_FAIL, error)
            }

            override fun onAdImpression() {
                emit(Events.AD_IMPRESSION)
                emit(Events.BANNER_IMPRESSION)
            }

            override fun onAdLoaded() {
                if (mAdViewOld != null) {
                    removeBannerView(mAdViewOld!!)
                    mAdViewOld = null
                }
                runJustBeforeBeingDrawn(adView) {
                    emit(Events.BANNER_SIZE, computeAdSize())
                }
                emit(Events.AD_LOAD, computeAdSize())
                emit(Events.BANNER_LOAD)
            }

            override fun onAdOpened() {
                emit(Events.AD_SHOW)
                emit(Events.BANNER_OPEN)
            }
        }
        return adView
    }

    private fun computeAdSize(): Map<String, Any> {
        val width = mAdView!!.width
        val height = mAdView!!.height
        return mapOf(
            "size" to mapOf(
                "width" to pxToDp(width),
                "height" to pxToDp(height),
                "widthInPixels" to width,
                "heightInPixels" to height,
            )
        )
    }

    override fun show(ctx: Context) {
        if (mAdView!!.parent == null) {
            addBannerView()
        } else if (mAdView!!.visibility == View.GONE) {
            mAdView!!.resume()
            mAdView!!.visibility = View.VISIBLE
        } else {
            val wvParentView = getParentView(webView)
            if (rootLinearLayout !== wvParentView) {
                removeFromParentView(rootLinearLayout)
                addBannerView()
            }
        }
        ctx.resolve()
    }

    override fun hide(ctx: Context) {
        if (mAdView != null) {
            mAdView!!.pause()
            mAdView!!.visibility = View.GONE
        }
        ctx.resolve()
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        val w = adapter.activity.resources.displayMetrics.widthPixels
        if (w != screenWidth) {
            screenWidth = w
            adapter.activity.runOnUiThread { reloadBannerView() }
        }
    }

    private fun reloadBannerView() {
        if (mAdView == null || mAdView!!.visibility == View.GONE) return
        pauseBannerViews()
        if (mAdViewOld != null) removeBannerView(mAdViewOld!!)
        mAdViewOld = mAdView
        mAdView = createBannerView()
        mAdView!!.loadAd(adRequest)
        addBannerView()
    }

    override fun onPause(multitasking: Boolean) {
        pauseBannerViews()
        super.onPause(multitasking)
    }

    private fun pauseBannerViews() {
        if (mAdView != null) mAdView!!.pause()
        if (mAdViewOld != null && mAdViewOld != mAdView) {
            mAdViewOld!!.pause()
        }
    }

    override fun onResume(multitasking: Boolean) {
        super.onResume(multitasking)
        resumeBannerViews()
    }

    private fun resumeBannerViews() {
        if (mAdView != null) mAdView!!.resume()
        if (mAdViewOld != null) mAdViewOld!!.resume()
    }

    override fun onDestroy() {
        if (mAdView != null) {
            removeBannerView(mAdView!!)
            mAdView = null
        }
        if (mAdViewOld != null) {
            removeBannerView(mAdViewOld!!)
            mAdViewOld = null
        }
        if (mRelativeLayout != null) {
            removeFromParentView(mRelativeLayout)
            mRelativeLayout = null
        }
        super.onDestroy()
    }

    private fun removeBannerView(adView: AdView) {
        removeFromParentView(adView)
        adView.removeAllViews()
        adView.destroy()
    }

    private fun addBannerView() {
        if (mAdView == null) return
        if (offset == null) {
            if (getParentView(mAdView) === rootLinearLayout && rootLinearLayout != null) return
            addBannerViewWithLinearLayout()
        } else {
            if (getParentView(mAdView) === mRelativeLayout && mRelativeLayout != null) return
            addBannerViewWithRelativeLayout()
        }
        adapter.contentView?.let {
            it.bringToFront()
            it.requestLayout()
            it.requestFocus()
        }
    }

    private fun addBannerViewWithLinearLayout() {
        val wvParentView = getParentView(webView)
        if (rootLinearLayout == null) {
            rootLinearLayout = LinearLayout(adapter.activity)
        }
        if (wvParentView != null && wvParentView !== rootLinearLayout) {
            wvParentView.removeView(webView)
            val content = rootLinearLayout as LinearLayout?
            content!!.orientation = LinearLayout.VERTICAL
            rootLinearLayout!!.layoutParams = LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT,
                0.0f
            )
            webView.layoutParams = LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT,
                1.0f
            )
            rootLinearLayout!!.addView(webView)
            val view = getParentView(rootLinearLayout)
            if (view !== wvParentView) {
                removeFromParentView(rootLinearLayout)
                wvParentView.addView(rootLinearLayout)
            }
        }
        removeFromParentView(mAdView)
        if (isPositionTop) {
            rootLinearLayout!!.addView(mAdView, 0)
        } else {
            rootLinearLayout!!.addView(mAdView)
        }
        adapter.contentView?.let {
            for (i in 0 until it.childCount) {
                val view = it.getChildAt(i)
                (view as? RelativeLayout)?.bringToFront()
            }
        }
    }

    private fun addBannerViewWithRelativeLayout() {
        val paramsContent = RelativeLayout.LayoutParams(
            RelativeLayout.LayoutParams.MATCH_PARENT,
            RelativeLayout.LayoutParams.WRAP_CONTENT
        )
        paramsContent.addRule(if (isPositionTop) RelativeLayout.ALIGN_PARENT_TOP else RelativeLayout.ALIGN_PARENT_BOTTOM)
        if (mRelativeLayout == null) {
            mRelativeLayout = RelativeLayout(adapter.activity)
            val params = RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT
            )
            if (isPositionTop) {
                params.setMargins(0, offset!!, 0, 0)
            } else {
                params.setMargins(0, 0, 0, offset!!)
            }
            adapter.contentView?.addView(mRelativeLayout, params)
                ?: Log.e(TAG, "Unable to find content view")
        }
        removeFromParentView(mAdView)
        mRelativeLayout!!.addView(mAdView, paramsContent)
        mRelativeLayout!!.bringToFront()
    }

    private val isPositionTop: Boolean
        private get() = gravity == Gravity.TOP

    enum class AdSizeType {
        BANNER, LARGE_BANNER, MEDIUM_RECTANGLE, FULL_BANNER, LEADERBOARD, SMART_BANNER;

        companion object {
            fun getAdSize(adSize: Int): AdSize? {
                return when (values()[adSize]) {
                    BANNER -> AdSize.BANNER
                    LARGE_BANNER -> AdSize.LARGE_BANNER
                    MEDIUM_RECTANGLE -> AdSize.MEDIUM_RECTANGLE
                    FULL_BANNER -> AdSize.FULL_BANNER
                    LEADERBOARD -> AdSize.LEADERBOARD
                    SMART_BANNER -> AdSize.SMART_BANNER
                    else -> null
                }
            }
        }
    }

    companion object {
        private const val TAG = "AdMobPlus.Banner"

        @SuppressLint("StaticFieldLeak")
        private var rootLinearLayout: ViewGroup? = null
        private var screenWidth = 0
        fun destroyParentView() {
            val vg = getParentView(rootLinearLayout)
            vg?.removeAllViews()
            rootLinearLayout = null
        }

        private fun runJustBeforeBeingDrawn(view: View, runnable: Runnable) {
            val preDrawListener: ViewTreeObserver.OnPreDrawListener =
                object : ViewTreeObserver.OnPreDrawListener {
                    override fun onPreDraw(): Boolean {
                        view.viewTreeObserver.removeOnPreDrawListener(this)
                        runnable.run()
                        return true
                    }
                }
            view.viewTreeObserver.addOnPreDrawListener(preDrawListener)
        }
    }
}
