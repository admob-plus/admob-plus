package admob.plugin;

import android.os.Bundle;

import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;

import org.json.JSONArray;
import org.json.JSONObject;

import admob.plugin.ads.AdBase;

public class Action {
    private JSONObject opts;

    Action(JSONArray args) {
        this.opts = args.optJSONObject(0);
    }

    public int optId() {
        return opts.optInt("id");
    }


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
        return new AdSize(adSizeObj.optInt("width"), adSizeObj.optInt("height"));
    }

    public String getAdUnitID() {
        return this.opts.optString("adUnitID");
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
        if (this.opts.has("underAgeOfConsent")) {
            extras.putBoolean("tag_for_under_age_of_consent", opts.optBoolean("underAgeOfConsent"));
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
    }
}
