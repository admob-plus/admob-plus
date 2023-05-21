package admob.plus.cordova

import admob.plus.cordova.ads.AdSizeType
import admob.plus.core.Context
import admob.plus.core.jsonArray2stringList
import admob.plus.core.pxToDp
import android.app.Activity
import android.content.res.Resources
import com.google.android.gms.ads.AdSize
import org.apache.cordova.CallbackContext
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONObject

data class ExecuteContext(
    val action: String,
    val args: JSONArray,
    val callbackContext: CallbackContext,
    val plugin: AdMob,
) : Context {
    private val opts by lazy { args.optJSONObject(0) }

    override val activity: Activity get() = plugin.cordova.activity

    override fun has(name: String): Boolean {
        return opts.has(name)
    }

    override fun optBoolean(name: String): Boolean? {
        return if (opts.has(name)) opts.optBoolean(name) else null
    }

    override fun optDouble(name: String): Double? {
        return if (opts.has(name)) opts.optDouble(name) else null
    }

    override fun optInt(name: String): Int? {
        return if (opts.has(name)) opts.optInt(name) else null
    }

    override fun optString(name: String): String? {
        return if (opts.has(name)) opts.optString(name) else null
    }

    override fun optStringList(name: String): List<String> {
        return jsonArray2stringList(opts.optJSONArray(name))
    }

    override fun optObject(name: String): JSONObject? {
        return opts.optJSONObject(name)
    }

    override fun emit(eventName: String, data: Map<String, Any>) {
        plugin.emit(eventName, data)
    }

    override fun resolve() {
        callbackContext.success()
    }

    override fun resolve(data: Boolean) {
        val result = PluginResult(PluginResult.Status.OK, data)
        sendResult(result)
    }

    fun resolve(data: Map<String, Any>) {
        callbackContext.success(JSONObject(data))
    }

    override fun reject(msg: String?) {
        callbackContext.error(msg)
    }

    fun optAdSize(): AdSize {
        val name = "size"
        if (!opts.has(name)) {
            return AdSize.SMART_BANNER
        }
        val adSizeObj = opts.optJSONObject(name)
        val adSize = AdSizeType.getAdSize(opts.optInt(name))
        if (adSizeObj == null) {
            return adSize ?: AdSize.SMART_BANNER
        }
        val adaptive = adSizeObj.optString("adaptive")
        val w =
            pxToDp(if (adSizeObj.has("width")) adSizeObj.optInt("width") else Resources.getSystem().displayMetrics.widthPixels)
        if ("inline" == adaptive) {
            if (adSizeObj.has("maxHeight")) {
                return AdSize.getInlineAdaptiveBannerAdSize(
                    w,
                    pxToDp(adSizeObj.optInt("maxHeight"))
                )
            }
        } else {
            return when (adSizeObj.optString("orientation")) {
                "portrait" -> AdSize.getPortraitAnchoredAdaptiveBannerAdSize(
                    activity, w
                )

                "landscape" -> AdSize.getLandscapeAnchoredAdaptiveBannerAdSize(
                    activity, w
                )

                else -> AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(
                    activity, w
                )
            }
        }
        return AdSize(w, pxToDp(adSizeObj.optInt("height")))
    }

    fun optOffset(): Int? {
        return if (opts.has("offset")) {
            opts.optInt("offset")
        } else null
    }

    fun sendResult(result: PluginResult?) {
        callbackContext.sendPluginResult(result)
    }
}
