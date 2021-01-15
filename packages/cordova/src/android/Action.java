package admob.plugin;

import android.os.Bundle;

import androidx.annotation.Nullable;

import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.RequestConfiguration;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import admob.plugin.ads.AdBase;

public class Action {
    private final JSONObject opts;

    Action(JSONArray args) {
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

    public AdSize getAdSize() {
        final String name = "size";
        if (!this.opts.has(name)) {
            return AdSize.SMART_BANNER;
        }
        AdSize adSize = AdSizeType.getAdSize(this.opts.opt(name));
        if (adSize != null) {
            return adSize;
        }
        JSONObject adSizeObj = this.opts.optJSONObject(name);
        if (adSizeObj == null) {
            return AdSize.SMART_BANNER;
        }
        return new AdSize(adSizeObj.optInt("width"), adSizeObj.optInt("height"));
    }

    @Nullable
    public String getAdUnitID() {
        return this.opts.optString("adUnitID");
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
        JSONArray testDevices = this.opts.optJSONArray("testDevices");
        if (testDevices != null) {
            for (int i = 0; i < testDevices.length(); i++) {
                String testDevice = testDevices.optString(i);
                if (testDevice != null) {
                    builder.addTestDevice(testDevice);
                }
            }
        }
        if (this.opts.has("childDirected")) {
            builder.tagForChildDirectedTreatment(opts.optBoolean("childDirected"));
        }
        if (this.opts.has("npa")) {
            extras.putString("npa", opts.optString("npa"));
        }
        if (this.opts.has("underAgeOfConsent")) {
            extras.putBoolean("tag_for_under_age_of_consent", opts.optBoolean("underAgeOfConsent"));
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
    }
}
