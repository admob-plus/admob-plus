package admob.plus.capacitor.ads

import admob.plus.capacitor.AdMobPlusPlugin
import admob.plus.capacitor.ExecuteContext
import admob.plus.capacitor.Generated
import admob.plus.core.Context
import admob.plus.core.GenericAd
import admob.plus.core.Helper.Companion.getParentView
import admob.plus.core.Helper.Companion.removeFromParentView
import android.annotation.SuppressLint
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.widget.LinearLayout
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.LoadAdError
import java.util.Objects

class Banner(ctx: ExecuteContext) : AdBase(ctx), GenericAd {
    private val adSize: AdSize
    private val gravity: Int
    private var adView: AdView? = null

    init {
        adSize = AdSize.SMART_BANNER
        gravity = if ("top" == ctx.optPosition()) Gravity.TOP else Gravity.BOTTOM
    }

    override val isLoaded: Boolean
        get() = adView != null

    override fun load(ctx: Context?) {
        if (adView == null) {
            adView = AdView(activity)
            adView!!.adUnitId = adUnitId
            adView!!.adSize = adSize
            adView!!.adListener = object : AdListener() {
                override fun onAdClicked() {
                    emit(Generated.Events.BANNER_CLICK)
                }

                override fun onAdClosed() {
                    emit(Generated.Events.BANNER_CLOSE)
                }

                override fun onAdFailedToLoad(error: LoadAdError) {
                    emit(Generated.Events.BANNER_LOAD_FAIL, error)
                }

                override fun onAdImpression() {
                    emit(Generated.Events.BANNER_IMPRESSION)
                }

                override fun onAdLoaded() {
                    emit(Generated.Events.BANNER_LOAD)
                }

                override fun onAdOpened() {
                    emit(Generated.Events.BANNER_OPEN)
                }
            }
        }
        adView!!.loadAd(ctx!!.optAdRequest())
        ctx.resolve()
    }

    override fun show(ctx: Context?) {
        Objects.requireNonNull(adView)
        val webView: WebView = ExecuteContext.Companion.plugin!!.getBridge().getWebView()
        if (getParentView(adView) == null) {
            addBannerView(ExecuteContext.Companion.plugin, adView)
        } else if (adView!!.visibility == View.GONE) {
            adView!!.resume()
            adView!!.visibility = View.VISIBLE
        } else {
            val wvParentView = getParentView(webView)
            if (parentView !== wvParentView) {
                parentView!!.removeAllViews()
                removeFromParentView(parentView)
                addBannerView(ExecuteContext.Companion.plugin, adView)
            }
        }
        ctx!!.resolve()
    }

    override fun hide(ctx: Context?) {
        if (adView != null) {
            adView!!.pause()
            adView!!.visibility = View.GONE
        }
        ctx!!.resolve()
    }

    override fun destroy() {
        if (adView != null) {
            adView!!.destroy()
            adView = null
        }
        super.destroy()
    }

    private fun addBannerView(plugin: AdMobPlusPlugin?, adView: AdView?) {
        val webView = plugin!!.bridge.webView
        val wvParentView = webView.parent as ViewGroup
        if (parentView == null) {
            parentView = LinearLayout(webView.context)
        }
        if (wvParentView != null && wvParentView !== parentView) {
            if (getParentView(parentView) != null) {
                parentView!!.removeAllViews()
                removeFromParentView(parentView)
            }
            wvParentView.removeView(webView)
            val content = parentView as LinearLayout?
            content!!.orientation = LinearLayout.VERTICAL
            parentView.setLayoutParams(
                LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    0.0f
                )
            )
            webView.layoutParams = LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT,
                1.0f
            )
            parentView.addView(webView)
            wvParentView.addView(parentView)
        }
        if (gravity == Gravity.TOP) {
            parentView!!.addView(adView, 0)
        } else {
            parentView!!.addView(adView)
        }
        parentView!!.bringToFront()
        parentView!!.requestLayout()
        parentView!!.requestFocus()
    }

    companion object {
        @SuppressLint("StaticFieldLeak")
        private var parentView: ViewGroup? = null
    }
}
