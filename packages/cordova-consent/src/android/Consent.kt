package cordova.plugin.consent

import android.util.Log
import android.util.SparseArray
import com.google.android.ump.ConsentForm
import com.google.android.ump.ConsentInformation
import com.google.android.ump.FormError
import com.google.android.ump.UserMessagingPlatform
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaInterface
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.CordovaWebView
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

class Consent : CordovaPlugin() {
    private val eventQueue = ArrayList<PluginResult>()
    private val TAG = this.javaClass.simpleName
    private var readyCallbackContext: CallbackContext? = null
    override fun initialize(cordova: CordovaInterface, webView: CordovaWebView) {
        super.initialize(cordova, webView)
        ExecuteContext.plugin = this
    }

    override fun execute(
        actionKey: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        val ctx: ExecuteContext =
            ExecuteContext(actionKey, args, callbackContext)
        Log.d(TAG, actionKey)
        when (actionKey) {
            Generated.Actions.READY -> return executeReady(callbackContext)
            Generated.Actions.GET_CONSENT_STATUS -> callbackContext.success(
                consentStatus
            )

            Generated.Actions.GET_FORM_STATUS -> callbackContext.success(if (consentInformation.isConsentFormAvailable) 1 else 2)
            Generated.Actions.REQUEST_INFO_UPDATE -> return executeRequestInfoUpdate(
                ctx
            )

            Generated.Actions.LOAD_FORM -> return executeLoadForm(ctx)
            Generated.Actions.SHOW_FORM -> return executeShowForm(ctx)
            Generated.Actions.RESET -> {
                consentInformation.reset()
                callbackContext.success()
            }

            else -> return false
        }
        return true
    }

    private val consentStatus: Int
        private get() {
            val status = consentInformation.consentStatus
            return when (status) {
                ConsentInformation.ConsentStatus.NOT_REQUIRED -> Generated.ConsentStatus.NOT_REQUIRED
                ConsentInformation.ConsentStatus.REQUIRED -> Generated.ConsentStatus.REQUIRED
                else -> status
            }
        }

    private fun executeReady(callbackContext: CallbackContext): Boolean {
        if (readyCallbackContext == null) {
            for (result in eventQueue) {
                callbackContext.sendPluginResult(result)
            }
            eventQueue.clear()
        } else {
            Log.e(TAG, "Ready action should only be called once.")
        }
        readyCallbackContext = callbackContext
        emit(Generated.Events.READY)
        return true
    }

    private fun executeRequestInfoUpdate(ctx: ExecuteContext): Boolean {
        val params = ctx.optConsentRequestParameters()
        val consentInformation = consentInformation
        consentInformation.requestConsentInfoUpdate(
            cordova.activity,
            params, { ctx.callbackContext.success() }
        ) { formError: FormError -> ctx.callbackContext.error(formError.message) }
        return true
    }

    private fun executeLoadForm(ctx: ExecuteContext): Boolean {
        cordova.activity.runOnUiThread {
            UserMessagingPlatform.loadConsentForm(
                cordova.activity,
                { consentForm: ConsentForm ->
                    forms.put(consentForm.hashCode(), consentForm)
                    ctx.callbackContext.success(consentForm.hashCode())
                }
            ) { formError: FormError -> ctx.callbackContext.error(formError.message) }
        }
        return true
    }

    private fun executeShowForm(ctx: ExecuteContext): Boolean {
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
        return true
    }

    private val consentInformation: ConsentInformation
        private get() = UserMessagingPlatform.getConsentInformation(cordova.activity)

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
