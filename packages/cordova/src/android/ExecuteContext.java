package admob.plugin;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;

import androidx.annotation.Nullable;

import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.RequestConfiguration;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import admob.plugin.ads.AdBase;

public class ExecuteContext {
    public static AdMob plugin;
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

    @Nullable
    public String optAdUnitID() {
        return this.opts.optString("adUnitId");
    }

    public String optPosition() {
        return opts.optString("position");
    }

    @Nullable
    public AdBase optAd() {
        return AdBase.getAd(optId());
    }

    @Nullable
    public <T extends AdBase> T optAdOrCreate(Class<T> type) {
        T ad = type.cast(optAd());
        if (ad == null) {
            try {
                ad = type.getDeclaredConstructor(ExecuteContext.class).newInstance(this);
            } catch (IllegalAccessException | InstantiationException | InvocationTargetException | NoSuchMethodException e) {
                e.printStackTrace();
                this.error("Fail to create ad");
            }
        }
        return ad;
    }

    @Nullable
    public AdBase optAdOrError() {
        AdBase ad = optAd();
        if (ad == null) {
            this.error("Ad not found");
        }
        return ad;
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
        final String param = "serverSideVerification";
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
        AdRequest.Builder builder = new AdRequest.Builder();
        if (this.opts.has("contentUrl")) {
            builder.setContentUrl(opts.optString("contentUrl"));
        }
        Bundle extras = new Bundle();
        if (this.opts.has("npa")) {
            extras.putString("npa", opts.optString("npa"));
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
    }

    public AdSize optAdSize() {
        final String name = "size";
        if (!opts.has(name)) {
            return AdSize.SMART_BANNER;
        }
        AdSize adSize = Generated.AdSizeType.getAdSize(opts.opt(name));
        if (adSize != null) {
            return adSize;
        }
        JSONObject adSizeObj = opts.optJSONObject(name);
        if (adSizeObj == null) {
            return AdSize.SMART_BANNER;
        }
        return new AdSize(adSizeObj.optInt("width"), adSizeObj.optInt("height"));
    }

    public Activity getActivity() {
        return plugin.cordova.getActivity();
    }

    public void sendResult(PluginResult result) {
        callbackContext.sendPluginResult(result);
    }

    public void success() {
        callbackContext.success();
    }

    public void success(boolean data) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, data);
        sendResult(result);
    }

    public void error(String message) {
        callbackContext.error(message);
    }
}
