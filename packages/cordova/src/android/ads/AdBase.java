package admob.plugin.ads;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.rewarded.RewardItem;

import java.util.HashMap;
import java.util.Map;

import admob.plugin.ExecuteContext;

import static admob.plugin.ExecuteContext.ads;

public abstract class AdBase {
    final int id;
    final String adUnitId;

    AdBase(int id, String adUnitId) {
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

    public void onPause(boolean multitasking) {
    }

    public void onResume(boolean multitasking) {
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

    public void emit(String eventType, Map<String, Object> data) {
        ExecuteContext.plugin.emit(eventType, new HashMap<String, Object>(data) {{
            put("adId", id);
        }});
    }
}
