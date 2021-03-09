package admob.plugin.ads;

import android.util.SparseArray;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.rewarded.RewardItem;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import admob.plugin.ExecuteContext;

public abstract class AdBase {
    private static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
    final int id;
    String adUnitId;

    AdBase(int id, String adUnitId) {
        this.id = id;
        this.adUnitId = adUnitId;
        ads.put(id, this);
    }

    public static AdBase getAd(Integer id) {
        return ads.get(id);
    }

    public void destroy() {
        ads.remove(id);
    }

    public void emit(ExecuteContext ctx, String eventType) {
        this.emit(ctx, eventType, new HashMap<String, Object>());
    }

    public void emit(ExecuteContext ctx, String eventType, AdError error) {
        Map<String, Object> data = new HashMap<String, Object>() {{
            put("code", error.getCode());
            put("message", error.getMessage());
            put("cause", error.getCause());
        }};
        this.emit(ctx, eventType, data);
    }

    public void emit(ExecuteContext ctx, String eventType, RewardItem rewardItem) {
        Map<String, Object> data = new HashMap<String, Object>() {{
            put("amount", rewardItem.getAmount());
            put("type", rewardItem.getType());
        }};
        this.emit(ctx, eventType, data);
    }

    public void emit(ExecuteContext ctx, String eventType, Map<String, Object> data) {
        JSONObject result = new JSONObject(data);
        try {
            result.put("adId", this.id);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ctx.plugin.emit(eventType, result);
    }
}
