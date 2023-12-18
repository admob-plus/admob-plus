package cordova.plugin.consent

import android.util.Log
import android.util.SparseArray
import com.google.android.ump.ConsentForm
import com.google.android.ump.ConsentInformation
import com.google.android.ump.FormError
import com.google.android.ump.UserMessagingPlatform
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject


class Consent : CordovaPlugin() {
    private val eventQueue = ArrayList<PluginResult>()
    private val TAG = this.javaClass.simpleName
    private var readyCallbackContext: CallbackContext? = null

    private val actions = mapOf(
        Actions.READY to ::executeReady,
        Actions.GET_CONSENT_STATUS to ::executeGetConsentStatus,
        Actions.GET_FORM_STATUS to ::executeGetFormStatus,
        Actions.REQUEST_INFO_UPDATE to ::executeRequestInfoUpdate,
        Actions.LOAD_FORM to ::executeLoadForm,
        Actions.SHOW_FORM to ::executeShowForm,
        Actions.RESET to ::executeReset,
        Actions.CAN_REQUEST_ADS to ::executeCanRequestAds,
        Actions.LOAD_AND_SHOW_IF_REQUIRED to ::executeLoadAndShowIfRequired,
        Actions.SHOW_PRIVACY_OPTIONS_FORM to ::executeShowPrivacyOptionsForm,
        Actions.PRIVACY_OPTIONS_REQUIREMENT_STATUS to ::executePrivacyOptionsRequirementStatus,
    )

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        val ctx =
            ExecuteContext(action, args, callbackContext, this)
        Log.d(TAG, action)
        return actions[action]?.invoke(ctx) != null
    }

    private val consentStatus: Int
        get() {
            return when (val status = consentInformation.consentStatus) {
                ConsentInformation.ConsentStatus.NOT_REQUIRED -> ConsentStatus.NOT_REQUIRED
                ConsentInformation.ConsentStatus.REQUIRED -> ConsentStatus.REQUIRED
                else -> status
            }
        }

    private fun executeReady(ctx: ExecuteContext) {
        if (readyCallbackContext == null) {
            for (result in eventQueue) {
                ctx.callbackContext.sendPluginResult(result)
            }
            eventQueue.clear()
        } else {
            Log.e(TAG, "Ready action should only be called once.")
        }
        readyCallbackContext = ctx.callbackContext
        emit(Events.READY)
    }

    private fun executeCanRequestAds(ctx: ExecuteContext) {
        ctx.resolve(consentInformation.canRequestAds())
    }

    private fun executeLoadAndShowIfRequired(ctx: ExecuteContext) {
        cordova.activity.runOnUiThread {
            UserMessagingPlatform.loadAndShowConsentFormIfRequired(
                cordova.activity
            ) { loadAndShowError ->
                loadAndShowError?.let {
                    ctx.callbackContext.error(it.message)
                } ?: run {
                    ctx.resolve()
                }
            }
        }
    }

    private fun executeShowPrivacyOptionsForm(ctx: ExecuteContext) {
        cordova.activity.runOnUiThread {
            UserMessagingPlatform.showPrivacyOptionsForm(cordova.activity) { formError ->
                formError?.let {
                    ctx.callbackContext.error(it.message)
                } ?: run {
                    ctx.resolve()
                }
            }
        }
    }

    private fun executePrivacyOptionsRequirementStatus(ctx: ExecuteContext) {
        ctx.resolve(consentInformation.privacyOptionsRequirementStatus)
    }

    private fun executeGetConsentStatus(ctx: ExecuteContext) {
        ctx.callbackContext.success(consentStatus)
    }

    private fun executeGetFormStatus(ctx: ExecuteContext) {
        ctx.callbackContext.success(if (consentInformation.isConsentFormAvailable) 1 else 2)
    }

    private fun executeRequestInfoUpdate(ctx: ExecuteContext) {
        val params = ctx.optConsentRequestParameters()
        val consentInformation = consentInformation
        cordova.activity.runOnUiThread {
            consentInformation.requestConsentInfoUpdate(
                cordova.activity,
                params, { ctx.callbackContext.success() }
            ) { formError: FormError -> ctx.callbackContext.error(formError.message) }
        }
    }

    private fun executeLoadForm(ctx: ExecuteContext) {
        cordova.activity.runOnUiThread {
            UserMessagingPlatform.loadConsentForm(
                cordova.activity,
                { consentForm: ConsentForm ->
                    forms.put(consentForm.hashCode(), consentForm)
                    ctx.callbackContext.success(consentForm.hashCode())
                }
            ) { formError: FormError -> ctx.callbackContext.error(formError.message) }
        }
    }

    private fun executeShowForm(ctx: ExecuteContext) {
        val consentForm = forms[ctx.optId()]
        cordova.activity.runOnUiThread {
            consentForm.show(
                cordova.activity
            ) { formError: FormError? ->
                if (formError == null) {
                    ctx.callbackContext.success()
                } else {
                    ctx.callbackContext.error(formError.message)
                }
            }
        }
    }

    private fun executeReset(ctx: ExecuteContext) {
        consentInformation.reset()
        ctx.callbackContext.success()
    }

    private val consentInformation: ConsentInformation
        get() = UserMessagingPlatform.getConsentInformation(cordova.activity)

    override fun onDestroy() {
        readyCallbackContext = null
        super.onDestroy()
    }

    @JvmOverloads
    fun emit(eventType: String?, data: Any? = null) {
        val event = JSONObject()
        try {
            event.put("type", eventType)
            event.put("data", data)
        } catch (e: JSONException) {
            e.printStackTrace()
        }
        val result = PluginResult(PluginResult.Status.OK, event)
        result.keepCallback = true
        if (readyCallbackContext == null) {
            eventQueue.add(result)
        } else {
            readyCallbackContext!!.sendPluginResult(result)
        }
    }

    companion object {
        private val forms = SparseArray<ConsentForm>()
    }
}
