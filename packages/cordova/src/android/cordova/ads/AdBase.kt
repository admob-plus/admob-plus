package admob.plus.cordova.ads

import admob.plus.cordova.AdMob
import admob.plus.cordova.ExecuteContext
import admob.plus.core.Ad
import admob.plus.core.Adapter
import admob.plus.cordova.ads
import admob.plus.core.buildAdRequest
import android.content.res.Configuration
import android.view.View
import android.view.ViewGroup
import org.apache.cordova.CordovaWebView
import org.json.JSONObject

fun getParentView(view: View?): ViewGroup? {
    return if (view == null) null else view.parent as ViewGroup?
}

fun removeFromParentView(view: View?): ViewGroup? {
    val viewParent = getParentView(view)
    viewParent?.removeView(view)
    return viewParent
}

abstract class AdBase(ctx: ExecuteContext) : Ad {
    protected val initOpts: JSONObject

    final override val id: String get() = initOpts.getString("id")
    val adUnitId: String get() = initOpts.getString("adUnitId")
    val adRequest get() = buildAdRequest(initOpts)

    private val plugin: AdMob

    override val adapter: Adapter get() = plugin

    val cordovaWebView: CordovaWebView get() = plugin.webView
    val webView: View get() = cordovaWebView.view
    val webViewParent: ViewGroup get() = webView.parent as ViewGroup

    init {
        initOpts = ctx.args.optJSONObject(0)
        plugin = ctx.plugin

        this.also { ads[id] = it }
    }

    fun destroy() {
        ads.remove(id)
    }

    open fun onConfigurationChanged(newConfig: Configuration) {}
    open fun onPause(multitasking: Boolean) {}
    open fun onResume(multitasking: Boolean) {}
    open fun onDestroy() {
        destroy()
    }
}
