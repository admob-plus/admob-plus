package admob.plugin.ads;

import android.app.Activity;
import android.util.SparseArray;

import org.json.JSONException;
import org.json.JSONObject;

import admob.plugin.AdMob;


public abstract class AdBase {
    private static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
    protected static AdMob plugin;
    final int id;
    String adUnitId;

    AdBase(int id, String adUnitId) {
        this.id = id;
        this.adUnitId = adUnitId;
        ads.put(id, this);
    }

    public static void initialize(AdMob plugin) {
        AdBase.plugin = plugin;
    }

    public static AdBase getAd(Integer id) {
        return ads.get(id);
    }

    JSONObject buildErrorPayload(int errorCode) {
        JSONObject data = new JSONObject();
        try {
            data.put("errorCode", errorCode);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return data;
    }

    protected Activity getActivity() {
        return plugin.cordova.getActivity();
    }

    public void destroy() {
        ads.remove(id);
    }
}
