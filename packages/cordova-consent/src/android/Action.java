package cordova.plugin.consent;

import android.content.Context;

import com.google.android.ump.ConsentDebugSettings;
import com.google.android.ump.ConsentRequestParameters;

import org.json.JSONArray;
import org.json.JSONObject;

public class Action {
    private final JSONObject opts;

    Action(JSONArray args) {
        this.opts = args.optJSONObject(0);
    }

    public int optId() {
        return opts.optInt("id");
    }

    public ConsentRequestParameters getConsentRequestParameters(Context context) {
        ConsentRequestParameters.Builder builder = new ConsentRequestParameters.Builder();
        if (this.opts == null) {
            return builder.build();
        }

        if (this.opts.has("tagForUnderAgeOfConsent")) {
            builder.setTagForUnderAgeOfConsent(this.opts.optBoolean("tagForUnderAgeOfConsent"));
        }

        builder.setConsentDebugSettings(getConsentDebugSettings(context, this.opts.optJSONObject("debugSettings")));

        return builder.build();
    }

    private ConsentDebugSettings getConsentDebugSettings(Context context, JSONObject debugSettings) {
        ConsentDebugSettings.Builder builder = new ConsentDebugSettings.Builder(context);

        if (debugSettings.has("debugGeography")) {
            builder.setDebugGeography(debugSettings.optInt("debugGeography"));
        }

        if (debugSettings.has("testDeviceIds")) {
            JSONArray ids = debugSettings.optJSONArray("testDeviceIds");
            for (int i = 0; i < ids.length(); i++) {
                String testDeviceId = ids.optString(i);
                if (testDeviceId != null) {
                    builder.addTestDeviceHashedId(testDeviceId);
                }
            }
        }

        return builder.build();
    }
}
