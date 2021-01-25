package cordova.plugin.consent;

import android.util.Log;
import android.util.SparseArray;

import androidx.annotation.Nullable;

import com.google.android.ump.ConsentForm;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.FormError;
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

public class Consent extends CordovaPlugin {
    private static final SparseArray<ConsentForm> forms = new SparseArray<ConsentForm>();
    private final ArrayList<PluginResult> eventQueue = new ArrayList<PluginResult>();
    private final String TAG = this.getClass().getSimpleName();
    private CallbackContext readyCallbackContext = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String actionKey, JSONArray args, final CallbackContext callbackContext) {
        Action action = new Action(args);
        Log.d(TAG, actionKey);

        switch (actionKey) {
            case Actions.READY:
                return executeReady(callbackContext);
            case Actions.GET_STATUS:
                callbackContext.success(getConsentInformation().getConsentStatus());
                break;
            case Actions.IS_FORM_AVAILABLE:
                return executeIsConsentFormAvailable(callbackContext);
            case Actions.REQUEST_INFO_UPDATE:
                return executeRequestInfoUpdate(action, callbackContext);
            case Actions.LOAD_FORM:
                return executeLoadForm(action, callbackContext);
            case Actions.SHOW_FORM:
                return executeShowForm(action, callbackContext);
            case Actions.RESET:
                getConsentInformation().reset();
                callbackContext.success();
                break;
            default:
                return false;
        }

        return true;
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

    private boolean executeRequestInfoUpdate(Action action, CallbackContext callbackContext) {
        ConsentRequestParameters params = action.getConsentRequestParameters(cordova.getActivity());
        ConsentInformation consentInformation = getConsentInformation();
        consentInformation.requestConsentInfoUpdate(
                cordova.getActivity(),
                params,
                new ConsentInformation.OnConsentInfoUpdateSuccessListener() {
                    @Override
                    public void onConsentInfoUpdateSuccess() {
                        callbackContext.success();
                    }
                },
                new ConsentInformation.OnConsentInfoUpdateFailureListener() {
                    @Override
                    public void onConsentInfoUpdateFailure(FormError formError) {
                        callbackContext.error(formError.getMessage());
                    }
                });

        return true;
    }

    private boolean executeLoadForm(Action action, CallbackContext callbackContext) {
        UserMessagingPlatform.loadConsentForm(
                cordova.getActivity(),
                new UserMessagingPlatform.OnConsentFormLoadSuccessListener() {
                    @Override
                    public void onConsentFormLoadSuccess(ConsentForm consentForm) {
                        forms.put(consentForm.hashCode(), consentForm);
                        callbackContext.success(consentForm.hashCode());
                    }
                },
                new UserMessagingPlatform.OnConsentFormLoadFailureListener() {
                    @Override
                    public void onConsentFormLoadFailure(FormError formError) {
                        callbackContext.error(formError.getMessage());
                    }
                }
        );
        return true;
    }

    private boolean executeShowForm(Action action, CallbackContext callbackContext) {
        ConsentForm consentForm = forms.get(action.optId());
        consentForm.show(
                cordova.getActivity(),
                new ConsentForm.OnConsentFormDismissedListener() {
                    @Override
                    public void onConsentFormDismissed(@Nullable FormError formError) {
                        if (formError == null) {
                            callbackContext.success();
                        } else {
                            callbackContext.error(formError.getMessage());
                        }
                    }
                });
        return true;
    }

    private boolean executeIsConsentFormAvailable(CallbackContext callbackContext) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, getConsentInformation().isConsentFormAvailable());
        callbackContext.sendPluginResult(result);
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
