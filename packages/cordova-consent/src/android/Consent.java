package cordova.plugin.consent;

import android.util.Log;
import android.util.SparseArray;
import com.google.ads.consent.*;
import org.apache.cordova.*;
import org.json.*;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;

public class Consent extends CordovaPlugin {
    private String TAG = this.getClass().getSimpleName();

    private CallbackContext readyCallbackContext = null;
    private static SparseArray<ConsentForm> forms = new SparseArray<ConsentForm>();

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) {
        try {
            if ("ready".equals(action)) {
                readyCallbackContext = callbackContext;
                emit("ready");
            } else if ("checkConsent".equals(action)) {
                this.checkConsent(args, callbackContext);
            } else if ("isRequestLocationInEeaOrUnknown".equals(action)) {
                cordova.getThreadPool().execute(new Runnable() {
                    @Override
                    public void run() {
                        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK,
                                ConsentInformation.getInstance(cordova.getActivity().getApplicationContext())
                                        .isRequestLocationInEeaOrUnknown()));
                    }
                });
            } else if ("addTestDevice".equals(action)) {
                ConsentInformation.getInstance(cordova.getActivity().getApplicationContext())
                        .addTestDevice(args.getString(0));
                callbackContext.success();
            } else if ("setDebugGeography".equals(action)) {
                String geography = args.getString(0);
                if ("EEA".equals(geography)) {
                    ConsentInformation.getInstance(cordova.getActivity().getApplicationContext())
                            .setDebugGeography(DebugGeography.DEBUG_GEOGRAPHY_EEA);
                } else if ("NOT_EEA".equals(geography)) {
                    ConsentInformation.getInstance(cordova.getActivity().getApplicationContext())
                            .setDebugGeography(DebugGeography.DEBUG_GEOGRAPHY_NOT_EEA);
                } else {
                    return false;
                }
                callbackContext.success();
            } else if ("loadConsentForm".equals(action)) {
                loadConsentForm(args, callbackContext);
            } else if ("showConsentForm".equals(action)) {
                showConsentForm(args, callbackContext);
            }else if("requestTrackingAuthorization".equals(action)){
                // Only for iOS
                callbackContext.success("NOT_IOS");
            } else {
                return false;
            }
            return true;
        } catch (JSONException e) {
            Log.d(TAG, Log.getStackTraceString(e));
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
            return true;
        }
    }

    @Override
    public void onDestroy() {
        readyCallbackContext = null;

        super.onDestroy();
    }

    private void checkConsent(JSONArray args, final CallbackContext callbackContext) throws JSONException {
        ConsentInformation consentInformation = ConsentInformation
                .getInstance(cordova.getActivity().getApplicationContext());
        String[] publisherIds = convertJSONArray(args.getJSONArray(0));
        consentInformation.requestConsentInfoUpdate(publisherIds, new ConsentInfoUpdateListener() {
            @Override
            public void onConsentInfoUpdated(ConsentStatus consentStatus) {
                // User's consent status successfully updated.
                callbackContext.success(consentStatus.toString());
            }

            @Override
            public void onFailedToUpdateConsentInfo(String errorDescription) {
                // User's consent status failed to update.
                callbackContext.error(errorDescription);
            }
        });
    }

    private void loadConsentForm(final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        JSONObject obj = args.optJSONObject(0);
        int id = obj.getInt("id");
        URL privacyUrl = null;
        Boolean adFree = false;
        Boolean nonPersonalizedAds = false;
        Boolean personalizedAds = false;
        try {
            privacyUrl = new URL(obj.getString("privacyUrl"));
            adFree = obj.getBoolean("adFree");
            nonPersonalizedAds = obj.getBoolean("nonPersonalizedAds");
            personalizedAds = obj.getBoolean("personalizedAds");
        } catch (MalformedURLException e) {
            e.printStackTrace();
            callbackContext.error("Invalid privacyUrl");
            return;
        }
        ConsentForm.Builder formBuilder = new ConsentForm.Builder(cordova.getActivity(), privacyUrl)
                .withListener(new ConsentFormListener() {
                    @Override
                    public void onConsentFormLoaded() {
                        Log.d(TAG, "Consent form loaded successfully.");
                        emit("consent.form.loaded");
                    }

                    @Override
                    public void onConsentFormOpened() {
                        Log.d(TAG, "Consent form was displayed.");
                        emit("consent.form.opened");
                    }

                    @Override
                    public void onConsentFormClosed(ConsentStatus consentStatus, Boolean userPrefersAdFree) {
                        Log.d(TAG, "Consent form was closed.");
                        JSONObject data = new JSONObject();
                        try {
                            data.put("consentStatus", consentStatus.toString());
                            data.put("userPrefersAdFree", userPrefersAdFree);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        emit("consent.form.closed", data);
                    }

                    @Override
                    public void onConsentFormError(String errorDescription) {
                        Log.d(TAG, "Consent form error: " + errorDescription);
                        JSONObject data = new JSONObject();
                        try {
                            data.put("errorDescription", errorDescription);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        emit("consent.form.error", data);
                    }
                });

        if(personalizedAds) {
            formBuilder = formBuilder.withPersonalizedAdsOption();
        }

        if(nonPersonalizedAds) {
            formBuilder = formBuilder.withNonPersonalizedAdsOption();
        }

        if(adFree) {
            formBuilder = formBuilder.withAdFreeOption();
        }

        final ConsentForm.Builder formBuilderFinal = formBuilder;
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ConsentForm form = formBuilderFinal.build();
                forms.put(id, form);
                form.load();
            }
        });
        callbackContext.success();
    }

    private void showConsentForm(final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        JSONObject obj = args.optJSONObject(0);
        int id = obj.getInt("id");
        final ConsentForm form = forms.get(id);
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                form.show();
            }
        });
        callbackContext.success();
    }

    private String[] convertJSONArray(JSONArray arr) throws JSONException {
        List<String> list = new ArrayList<String>();
        for (int i = 0; i < arr.length(); i++) {
            list.add(arr.getString(i));
        }
        return list.toArray(new String[list.size()]);
    }

    private void emit(String eventType) {
        emit(eventType, false);
    }

    private void emit(final String eventType, final Object data) {
        final JSONObject event = new JSONObject();
        try {
            event.put("type", eventType);
            event.put("data", data);
        } catch (final JSONException e) {
            e.printStackTrace();
        }

        final PluginResult result = new PluginResult(PluginResult.Status.OK, event);
        result.setKeepCallback(true);
        if (readyCallbackContext == null) {
        } else {
            readyCallbackContext.sendPluginResult(result);
        }
    }
}
