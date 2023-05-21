package admob.plus.cordova.ads

import android.util.Log
import admob.plus.cordova.ExecuteContext
import admob.plus.core.Context

class WebViewAd(ctx: ExecuteContext) : AdBase(ctx) {
    init {
        Log.d(TAG, "WebViewAd")
    }

    override val isLoaded: Boolean
        get() = false

    override fun load(ctx: Context) {
        ctx.resolve()
    }

    override fun show(ctx: Context) {
        ctx.resolve()
    }

    override fun hide(ctx: Context) {
        ctx.resolve()
    }

    companion object {
        private const val TAG = "AdMobPlus.WebViewAd"
    }
}