package admob.plugin;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.RequestConfiguration;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;

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
    public AdBase optAd() {
        return AdBase.getAd(optId());
    }

    @Nullable
    public <T extends AdBase> T optAd(Class<T> type) {
        return type.cast(optAd());
    }

    @Nullable
    public AdBase getAdOrError() {
        AdBase ad = optAd();
        if (ad == null) {
            callbackContext.error("Ad not found");
        }
        return ad;
    }

    @Nullable
    public String optAdUnitID() {
        return this.opts.optString("adUnitId");
    }

    public RequestConfiguration optRequestConfiguration() {
        RequestConfiguration.Builder builder = new RequestConfiguration.Builder();
        if (this.opts.has("maxAdContentRating")) {
            builder.setMaxAdContentRating(this.opts.optString("maxAdContentRating"));
        }
        Integer tagForChildDirectedTreatment = optChildDirectedTreatmentTag();
        if (tagForChildDirectedTreatment != null) {
            builder.setTagForChildDirectedTreatment(tagForChildDirectedTreatment);
        }
        Integer tagForUnderAgeOfConsent = optUnderAgeOfConsentTag();
        if (tagForUnderAgeOfConsent != null) {
            builder.setTagForUnderAgeOfConsent(tagForChildDirectedTreatment);
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

    @Nullable
    private Integer optChildDirectedTreatmentTag() {
        String name = "tagForChildDirectedTreatment";
        if (!this.opts.has(name)) {
            return null;
        }

        if (this.opts.opt(name) == null) {
            return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED;
        }

        if (this.opts.optBoolean(name)) {
            return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE;
        }

        return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE;
    }

    @Nullable
    private Integer optUnderAgeOfConsentTag() {
        String name = "tagForUnderAgeOfConsent";
        if (!this.opts.has(name)) {
            return null;
        }

        if (this.opts.opt(name) == null) {
            return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED;
        }

        if (this.opts.optBoolean(name)) {
            return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE;
        }

        return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE;
    }

    @Nullable
    public ServerSideVerificationOptions optServerSideVerificationOptions() {
        String param = "serverSideVerification";
        if (!this.opts.has(param)) {
            return null;
        }
        JSONObject serverSideVerification = this.opts.optJSONObject(param);
        if (serverSideVerification == null) {
            return null;
        }

        ServerSideVerificationOptions.Builder builder = new ServerSideVerificationOptions.Builder();
        if (serverSideVerification.has("customData")) {
            builder.setCustomData(serverSideVerification.optString("customData"));
        }
        if (serverSideVerification.has("userId")) {
            builder.setUserId(serverSideVerification.optString("userId"));
        }
        return builder.build();
    }

    public AdRequest optAdRequest() {
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
