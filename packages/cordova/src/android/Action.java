package admob.plugin;

import android.os.Bundle;

import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;

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

    public String getAdUnitID() {
        return this.opts.optString("adUnitID");
    }

    public AdRequest buildAdRequest() {
        Bundle extras = new Bundle();
        AdRequest.Builder builder = new AdRequest.Builder();
        if (this.opts.has("childDirectedTreatment")) {
            builder.tagForChildDirectedTreatment(opts.optBoolean("childDirectedTreatment"));
        }
        if (this.opts.has("underAgeOfConsent")) {
            extras.putBoolean("tag_for_under_age_of_consent", opts.optBoolean("underAgeOfConsent"));
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
    }
}
