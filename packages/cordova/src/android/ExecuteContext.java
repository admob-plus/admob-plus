package admob.plugin;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.RequestConfiguration;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import admob.plugin.ads.AdBase;

public class ExecuteContext {
    public final AdMob plugin;
    public final String actionKey;
    public final JSONArray args;
    public final CallbackContext callbackContext;
    public final JSONObject opts;

    ExecuteContext(AdMob plugin, String actionKey, JSONArray args, CallbackContext callbackContext) {
        this.plugin = plugin;
        this.actionKey = actionKey;
        this.args = args;
        this.callbackContext = callbackContext;
        this.opts = args.optJSONObject(0);
    }

    public int optId() {
        return opts.optInt("id");
    }

    public String optPosition() {
        return opts.optString("position");
    }

    @Nullable
    public AdBase getAd() {
        return AdBase.getAd(optId());
    }

    @Nullable
    public String getAdUnitID() {
        return this.opts.optString("adUnitId");
    }

    public RequestConfiguration getRequestConfiguration() {
        RequestConfiguration.Builder builder = new RequestConfiguration.Builder();
        if (this.opts.has("maxAdContentRating")) {
            builder.setMaxAdContentRating(this.opts.optString("maxAdContentRating"));
        }
        if (this.opts.has("tagForChildDirectedTreatment")) {
            builder.setTagForChildDirectedTreatment(this.opts.optInt("tagForChildDirectedTreatment"));
        }
        if (this.opts.has("tagForUnderAgeOfConsent")) {
            builder.setTagForUnderAgeOfConsent(this.opts.optInt("tagForUnderAgeOfConsent"));
        }
        if (this.opts.has("testDeviceIds")) {
            List<String> testDeviceIds = new ArrayList<String>();
            JSONArray ids = this.opts.optJSONArray("testDeviceIds");
            for (int i = 0; i < ids.length(); i++) {
                String testDeviceId = ids.optString(i);
                if (testDeviceId != null) {
                    testDeviceIds.add(testDeviceId);
                }
            }
            builder.setTestDeviceIds(testDeviceIds);
        }
        return builder.build();
    }

    public AdRequest buildAdRequest() {
        Bundle extras = new Bundle();
        AdRequest.Builder builder = new AdRequest.Builder();
        if (this.opts.has("npa")) {
            extras.putString("npa", opts.optString("npa"));
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
    }

    public Activity getActivity() {
        return plugin.cordova.getActivity();
    }
}
