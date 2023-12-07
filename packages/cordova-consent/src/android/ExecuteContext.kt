package cordova.plugin.consent

import android.app.Activity
import com.google.android.ump.ConsentDebugSettings
import com.google.android.ump.ConsentInformation
import com.google.android.ump.ConsentRequestParameters
import org.apache.cordova.CallbackContext
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONObject
import java.util.Objects

data class ExecuteContext(
    val actionKey: String,
    val args: JSONArray,
    val callbackContext: CallbackContext,
    val plugin: Consent,
) {
    val opts: JSONObject? = args.optJSONObject(0)

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

    fun resolve() {
        callbackContext.success()
    }

    fun resolve(data: Boolean) {
        val result = PluginResult(PluginResult.Status.OK, data)
        sendResult(result)
    }

    fun resolve(status: ConsentInformation.PrivacyOptionsRequirementStatus) {
        callbackContext.success(status.ordinal)
    }

    private fun sendResult(result: PluginResult?) {
        callbackContext.sendPluginResult(result)
    }

    private fun optConsentDebugSettings(): ConsentDebugSettings {
        val builder = ConsentDebugSettings.Builder(activity)
        if (opts!!.has("debugGeography")) {
            builder.setDebugGeography(opts.optInt("debugGeography"))
        }
        if (opts.has("testDeviceIds")) {
            val ids = opts.optJSONArray("testDeviceIds")
            for (i in 0 until Objects.requireNonNull(ids).length()) {
                val testDeviceId = ids?.optString(i)
                if (testDeviceId != null) {
                    builder.addTestDeviceHashedId(testDeviceId)
                }
            }
        }
        return builder.build()
    }

    private val activity: Activity
        get() = plugin.cordova.activity
}
