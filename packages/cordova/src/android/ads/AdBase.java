package admob.plugin.ads;

import android.util.SparseArray;

import com.google.android.gms.ads.AdRequest;

import org.json.JSONObject;

import admob.plugin.AdMob;


public abstract class AdBase {
    protected static AdMob plugin;

    private static SparseArray<AdBase> ads = new SparseArray<AdBase>();

    final int id;

    AdBase(int id) {
        this.id = id;
        ads.put(id, this);
    }

    public static void initialize(AdMob plugin) {
        AdBase.plugin = plugin;
    }

    public void destroy() {
        ads.remove(id);
    }

    static AdBase getAd(Integer id) {
        return ads.get(id);
    }

    AdRequest buildAdRequest(JSONObject opts) {
        AdRequest.Builder builder = new AdRequest.Builder();
        if (opts.has("forChildDirectedTreatment")) {
            builder.tagForChildDirectedTreatment(opts.optBoolean("forChildDirectedTreatment"));
        }
        return builder.build();
    }
}
