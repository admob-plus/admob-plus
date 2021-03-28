package cordova.plugin.consent;

import android.app.Activity;

import com.google.android.ump.ConsentDebugSettings;
import com.google.android.ump.ConsentRequestParameters;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Objects;

public class ExecuteContext {
    public static Consent plugin;
    public final String actionKey;
    public final JSONArray args;
    public final CallbackContext callbackContext;
    public final JSONObject opts;

    ExecuteContext(String actionKey, JSONArray args, CallbackContext callbackContext) {
        this.actionKey = actionKey;
        this.args = args;
        this.callbackContext = callbackContext;
        this.opts = args.optJSONObject(0);
    }

    public int optId() {
        return opts.optInt("id");
    }

    public ConsentRequestParameters optConsentRequestParameters() {
        ConsentRequestParameters.Builder builder = new ConsentRequestParameters.Builder();
        if (this.opts == null) {
            return builder.build();
        }

        if (this.opts.has("tagForUnderAgeOfConsent")) {
            builder.setTagForUnderAgeOfConsent(this.opts.optBoolean("tagForUnderAgeOfConsent"));
        }

        builder.setConsentDebugSettings(optConsentDebugSettings());

        return builder.build();
    }

    public ConsentDebugSettings optConsentDebugSettings() {
        ConsentDebugSettings.Builder builder = new ConsentDebugSettings.Builder(getActivity());

        if (opts.has("debugGeography")) {
            builder.setDebugGeography(opts.optInt("debugGeography"));
        }

        if (opts.has("testDeviceIds")) {
            JSONArray ids = opts.optJSONArray("testDeviceIds");
            for (int i = 0; i < Objects.requireNonNull(ids).length(); i++) {
                String testDeviceId = ids.optString(i);
                if (testDeviceId != null) {
                    builder.addTestDeviceHashedId(testDeviceId);
                }
            }
        }

        return builder.build();
    }

    private Activity getActivity() {
        return plugin.cordova.getActivity();
    }
}
