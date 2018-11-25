package admob.plugin;

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
        AdRequest.Builder builder = new AdRequest.Builder();
        if (this.opts.has("forChildDirectedTreatment")) {
            builder.tagForChildDirectedTreatment(opts.optBoolean("forChildDirectedTreatment"));
        }
        return builder.build();
    }
}
