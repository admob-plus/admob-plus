package admob.plus.rn.ads;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.rewarded.RewardItem;

import java.util.Objects;

import admob.plus.rn.ExecuteContext;

import static admob.plus.rn.ExecuteContext.ads;
import static admob.plus.rn.ExecuteContext.plugin;

public abstract class AdBase {
    final int id;
    final String adUnitId;

    AdBase(int id, @NonNull String adUnitId) {
        this.id = id;
        this.adUnitId = adUnitId;
        ads.put(id, this);
    }

    public AdBase(ExecuteContext ctx) {
        this(ctx.optId(), Objects.requireNonNull(ctx.optAdUnitID()));
    }

    public static AdBase getAd(Integer id) {
        return ads.get(id);
    }

    public void destroy() {
        ads.remove(id);
    }

    public void emit(String eventName) {
        this.emit(eventName, Arguments.createMap());
    }

    public void emit(String eventName, AdError error) {
        WritableMap map = Arguments.createMap();
        map.putInt("code", error.getCode());
        map.putString("message", error.getMessage());
        this.emit(eventName, map);
    }

    public void emit(String eventName, @NonNull RewardItem rewardItem) {
        WritableMap map = Arguments.createMap();
        WritableMap reward = Arguments.createMap();
        reward.putInt("amount", rewardItem.getAmount());
        reward.putString("type", rewardItem.getType());
        map.putMap("reward", reward);
        this.emit(eventName, map);
    }

    public void emit(String eventName, @Nullable WritableMap data) {
        WritableMap map = Arguments.createMap();
        if (data != null) {
            map.merge(data);
        }
        map.putInt("adId", id);
        plugin.emit(eventName, map);
    }
}
