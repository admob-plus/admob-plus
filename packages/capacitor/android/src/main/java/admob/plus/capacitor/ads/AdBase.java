package admob.plus.capacitor.ads;

import android.util.SparseArray;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.rewarded.RewardItem;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import admob.plus.capacitor.ExecuteContext;

import static admob.plus.capacitor.ExecuteContext.plugin;

public abstract class AdBase {
    private static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
    final int id;
    final String adUnitId;

    AdBase(int id, @NonNull String adUnitId) {
        this.id = id;
        this.adUnitId = adUnitId;
        ads.put(id, this);
    }

    public AdBase(ExecuteContext ctx) {
        this(ctx.optId(), ctx.optAdUnitID());
    }

    public static AdBase getAd(Integer id) {
        return ads.get(id);
    }

    public void destroy() {
        ads.remove(id);
    }

    public void emit(String eventName) {
        this.emit(eventName, new HashMap<String, Object>());
    }

    public void emit(String eventName, AdError error) {
        this.emit(eventName, new HashMap<String, Object>() {{
            put("code", error.getCode());
            put("message", error.getMessage());
            put("cause", error.getCause());
        }});
    }

    public void emit(String eventName, RewardItem rewardItem) {
        this.emit(eventName, new HashMap<String, Object>() {{
            put("reward", new HashMap<String, Object>() {{
                put("amount", rewardItem.getAmount());
                put("type", rewardItem.getType());
            }});
        }});
    }

    public void emit(String eventName, Map<String, Object> data) {
        ExecuteContext.emit(eventName, new HashMap<String, Object>(data) {{
            put("adId", id);
        }});
    }
}
