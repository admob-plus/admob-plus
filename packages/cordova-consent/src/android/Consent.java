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
        if ("checkConsent".equals(action)) {
            try {
                this.checkConsent(args, callbackContext);
            } catch (JSONException e) {
                Log.d(TAG, Log.getStackTraceString(e));
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
                return true;
            }
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
