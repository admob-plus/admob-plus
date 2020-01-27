package cordova.plugin.consent;

import android.util.Log;
import com.google.ads.consent.*;
import org.apache.cordova.*;
import org.json.*;
import java.util.*;

public class Consent extends CordovaPlugin {
    private String TAG = this.getClass().getSimpleName();

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        try {
            if ("checkConsent".equals(action)) {
                this.checkConsent(args, callbackContext);
            } else if ("isRequestLocationInEeaOrUnknown".equals(action)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, ConsentInformation
                        .getInstance(cordova.getActivity().getApplicationContext()).isRequestLocationInEeaOrUnknown()));
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
                }
                callbackContext.success();
            }
            return true;
        } catch (JSONException e) {
            Log.d(TAG, Log.getStackTraceString(e));
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
            return true;
        }
        return false;
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

    private String[] convertJSONArray(JSONArray arr) throws JSONException {
        List<String> list = new ArrayList<String>();
        for (int i = 0; i < arr.length(); i++) {
            list.add(arr.getString(i));
        }
        return list.toArray(new String[list.size()]);
    }
}
