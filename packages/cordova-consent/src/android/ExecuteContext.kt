package cordova.plugin.consent

import android.app.Activity
import com.google.android.ump.ConsentDebugSettings
import com.google.android.ump.ConsentRequestParameters
import org.apache.cordova.CallbackContext
import org.json.JSONArray
import org.json.JSONObject
import java.util.Objects

class ExecuteContext internal constructor(
    val actionKey: String,
    val args: JSONArray,
    @JvmField val callbackContext: CallbackContext
) {
    val opts: JSONObject?

    init {
        opts = args.optJSONObject(0)
    }

    fun optId(): Int {
        return opts!!.optInt("id")
    }

    fun optConsentRequestParameters(): ConsentRequestParameters {
        val builder = ConsentRequestParameters.Builder()
        if (opts == null) {
            return builder.build()
        }
        if (opts.has("tagForUnderAgeOfConsent")) {
            builder.setTagForUnderAgeOfConsent(opts.optBoolean("tagForUnderAgeOfConsent"))
        }
        builder.setConsentDebugSettings(optConsentDebugSettings())
        return builder.build()
    }

    fun optConsentDebugSettings(): ConsentDebugSettings {
        val builder = ConsentDebugSettings.Builder(activity)
        if (opts!!.has("debugGeography")) {
            builder.setDebugGeography(opts.optInt("debugGeography"))
        }
        if (opts.has("testDeviceIds")) {
            val ids = opts.optJSONArray("testDeviceIds")
            for (i in 0 until Objects.requireNonNull(ids).length()) {
                val testDeviceId = ids.optString(i)
                if (testDeviceId != null) {
                    builder.addTestDeviceHashedId(testDeviceId)
                }
            }
        }
        return builder.build()
    }

    private val activity: Activity
        private get() = plugin!!.cordova.activity

    companion object {
        @JvmField
        var plugin: Consent? = null
    }
}
