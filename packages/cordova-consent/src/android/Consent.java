package cordova.plugin.consent;

import android.util.Log;
import android.util.SparseArray;

import com.google.android.ump.ConsentForm;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.UserMessagingPlatform;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import cordova.plugin.consent.Generated.Actions;
import cordova.plugin.consent.Generated.ConsentStatus;

public class Consent extends CordovaPlugin {
    private static final SparseArray<ConsentForm> forms = new SparseArray<ConsentForm>();
    private final ArrayList<PluginResult> eventQueue = new ArrayList<PluginResult>();
    private final String TAG = this.getClass().getSimpleName();
    private CallbackContext readyCallbackContext = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        ExecuteContext.plugin = this;
    }

    @Override
    public boolean execute(String actionKey, JSONArray args, final CallbackContext callbackContext) {
        ExecuteContext ctx = new ExecuteContext(actionKey, args, callbackContext);
        Log.d(TAG, actionKey);

        switch (actionKey) {
            case Actions.READY:
                return executeReady(callbackContext);
            case Actions.GET_CONSENT_STATUS:
                callbackContext.success(getConsentStatus());
                break;
            case Actions.GET_FORM_STATUS:
                callbackContext.success(getConsentInformation().isConsentFormAvailable() ? 1 : 2);
                break;
            case Actions.REQUEST_INFO_UPDATE:
                return executeRequestInfoUpdate(ctx);
            case Actions.LOAD_FORM:
                return executeLoadForm(ctx);
            case Actions.SHOW_FORM:
                return executeShowForm(ctx);
            case Actions.RESET:
                getConsentInformation().reset();
                callbackContext.success();
                break;
            default:
                return false;
        }

        return true;
    }

    private int getConsentStatus() {
        int status = getConsentInformation().getConsentStatus();
        switch (status) {
            case ConsentInformation.ConsentStatus.NOT_REQUIRED:
                return ConsentStatus.NOT_REQUIRED;
            case ConsentInformation.ConsentStatus.REQUIRED:
                return ConsentStatus.REQUIRED;
            default:
                return status;
        }
    }

    private boolean executeReady(CallbackContext callbackContext) {
        if (readyCallbackContext == null) {
            for (PluginResult result : eventQueue) {
                callbackContext.sendPluginResult(result);
            }
            eventQueue.clear();
        } else {
            Log.e(TAG, "Ready action should only be called once.");
        }
        readyCallbackContext = callbackContext;
        emit(Generated.Events.READY);
        return true;
    }

    private boolean executeRequestInfoUpdate(ExecuteContext ctx) {
        ConsentRequestParameters params = ctx.optConsentRequestParameters();
        ConsentInformation consentInformation = getConsentInformation();
        consentInformation.requestConsentInfoUpdate(
                cordova.getActivity(),
                params,
                ctx.callbackContext::success,
                formError -> ctx.callbackContext.error(formError.getMessage()));

        return true;
    }

    private boolean executeLoadForm(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            UserMessagingPlatform.loadConsentForm(
                    cordova.getActivity(),
                    consentForm -> {
                        forms.put(consentForm.hashCode(), consentForm);
                        ctx.callbackContext.success(consentForm.hashCode());
                    },
                    formError -> ctx.callbackContext.error(formError.getMessage())
            );
        });
        return true;
    }

    private boolean executeShowForm(ExecuteContext ctx) {
        final ConsentForm consentForm = forms.get(ctx.optId());
        cordova.getActivity().runOnUiThread(() -> {
            consentForm.show(
                    cordova.getActivity(),
                    formError -> {
                        if (formError == null) {
                            ctx.callbackContext.success();
                        } else {
                            ctx.callbackContext.error(formError.getMessage());
                        }
                    });
        });
        return true;
    }

    private ConsentInformation getConsentInformation() {
        return UserMessagingPlatform.getConsentInformation(cordova.getActivity());
    }

    @Override
    public void onDestroy() {
        readyCallbackContext = null;

        super.onDestroy();
    }

    public void emit(String eventType) {
        emit(eventType, null);
    }

    public void emit(String eventType, Object data) {
        JSONObject event = new JSONObject();
        try {
            event.put("type", eventType);
            event.put("data", data);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        PluginResult result = new PluginResult(PluginResult.Status.OK, event);
        result.setKeepCallback(true);
        if (readyCallbackContext == null) {
            eventQueue.add(result);
        } else {
            readyCallbackContext.sendPluginResult(result);
        }
    }
}
