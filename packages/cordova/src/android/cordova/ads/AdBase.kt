package admob.plus.cordova.ads

import admob.plus.cordova.AdMob
import admob.plus.cordova.ExecuteContext
import admob.plus.core.Ad
import admob.plus.core.Adapter
import admob.plus.core.ads
import android.content.res.Configuration
import android.view.View
import android.view.ViewGroup
import com.google.android.gms.ads.AdRequest
import org.apache.cordova.CordovaWebView
import java.util.Objects

fun getParentView(view: View?): ViewGroup? {
    return if (view == null) null else view.parent as ViewGroup?
}

fun removeFromParentView(view: View?): ViewGroup? {
    val viewParent = getParentView(view)
    viewParent?.removeView(view)
    return viewParent
}

abstract class AdBase(ctx: ExecuteContext) : Ad {
    final override val id: String
    val adUnitId: String
    protected val adRequest: AdRequest

    private val plugin: AdMob

    override val adapter: Adapter get() = plugin

    val cordovaWebView: CordovaWebView get() = plugin.webView
    val webView: View get() = cordovaWebView.view
    val webViewParent: ViewGroup get() = webView.parent as ViewGroup

    init {
        id = Objects.requireNonNull<String>(ctx.optId())
        adUnitId = Objects.requireNonNull<String>(ctx.optAdUnitID())
        adRequest = ctx.optAdRequest()
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
