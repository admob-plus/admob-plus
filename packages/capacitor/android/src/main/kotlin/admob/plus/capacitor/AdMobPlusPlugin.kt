package admob.plus.capacitor

import admob.plus.capacitor.ads.Banner
import admob.plus.capacitor.ads.Interstitial
import admob.plus.capacitor.ads.Rewarded
import admob.plus.capacitor.ads.RewardedInterstitial
import admob.plus.core.GenericAd
import admob.plus.core.Helper
import android.app.Activity
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.initialization.InitializationStatus
import org.json.JSONException
import org.json.JSONObject

@CapacitorPlugin(name = "AdMobPlus")
class AdMobPlusPlugin : Plugin(), Helper.Adapter {
    private var helper: Helper? = null
    override fun load() {
        super.load()
        helper = Helper(this)
        ExecuteContext.Companion.plugin = this
    }

    @PluginMethod
    fun trackingAuthorizationStatus(call: PluginCall) {
        try {
            call.resolve(JSObject("{\"status\": false}"))
        } catch (ex: JSONException) {
            call.reject(ex.toString())
        }
    }

    @PluginMethod
    fun requestTrackingAuthorization(call: PluginCall) {
        try {
            call.resolve(JSObject("{\"status\": false}"))
        } catch (ex: JSONException) {
            call.reject(ex.toString())
        }
    }

    @PluginMethod
    fun start(call: PluginCall) {
        MobileAds.initialize(context) { status: InitializationStatus? ->
            helper!!.configForTestLab()
            call.resolve()
        }
    }

    @PluginMethod
    fun configure(call: PluginCall) {
        val ctx = ExecuteContext(call)
        ctx.configure(helper!!)
    }

    @PluginMethod
    fun configRequest(call: PluginCall) {
        val ctx = ExecuteContext(call)
        MobileAds.setRequestConfiguration(ctx.optRequestConfiguration())
        helper!!.configForTestLab()
        ctx.resolve()
    }

    @PluginMethod
    fun adCreate(call: PluginCall) {
        val ctx = ExecuteContext(call)
        getBridge().executeOnMainThread {
            val adClass = ctx.optString("cls")
            if (adClass == null) {
                ctx.reject("ad cls is missing")
            } else {
                when (adClass) {
                    "BannerAd" -> Banner(ctx)
                    "InterstitialAd" -> Interstitial(ctx)
                    "RewardedAd" -> Rewarded(ctx)
                    "RewardedInterstitialAd" -> RewardedInterstitial(ctx)
                    else -> ctx.reject("ad cls is not supported: $adClass")
                }
                ctx.resolve()
            }
        }
    }

    @PluginMethod
    fun adIsLoaded(call: PluginCall) {
        val ctx = ExecuteContext(call)
        getBridge().executeOnMainThread {
            val ad = ctx.optAdOrError() as GenericAd?
            if (ad != null) {
                ctx.resolve(ad.isLoaded)
            }
        }
    }

    @PluginMethod
    fun adLoad(call: PluginCall) {
        val ctx = ExecuteContext(call)
        getBridge().executeOnMainThread {
            val ad = ctx.optAdOrError() as GenericAd?
            ad?.load(ctx)
        }
    }

    @PluginMethod
    fun adShow(call: PluginCall) {
        val ctx = ExecuteContext(call)
        getBridge().executeOnMainThread {
            val ad = ctx.optAdOrError() as GenericAd?
            if (ad != null) {
                if (ad.isLoaded) {
                    ad.show(ctx)
                } else {
                    ctx.reject("ad is not loaded")
                }
            }
        }
    }

    @PluginMethod
    fun adHide(call: PluginCall) {
        val ctx = ExecuteContext(call)
        getBridge().executeOnMainThread {
            val ad = ctx.optAdOrError() as GenericAd?
            ad?.hide(ctx)
        }
    }

    fun emit(eventName: String?, data: JSObject?) {
        notifyListeners(eventName, data)
    }

    override val activity: Activity
        get() = getActivity()

    override fun emit(eventName: String?, data: Map<String?, Any?>?) {
        try {
            emit(eventName, JSObject.fromJSONObject(JSONObject(data)))
        } catch (e: JSONException) {
            e.printStackTrace()
        }
    }
}
