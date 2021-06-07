package admob.plus.rn.ads;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.rewarded.RewardItem;

import java.util.Map;

import admob.plus.core.Ad;
import admob.plus.core.Helper;
import admob.plus.rn.ExecuteContext;

import static admob.plus.core.Helper.NOT_IMPLEMENTED;
import static admob.plus.rn.ExecuteContext.plugin;

public abstract class AdBase extends Ad {
    public AdBase(ExecuteContext ctx) {
        super(ctx);
    }

    @Override
    protected Helper.Adapter getAdapter() {
        return plugin;
    }

    @Override
    public void emit(String eventName) {
        this.emit(eventName, Arguments.createMap());
    }

    @Override
    public void emit(String eventName, AdError error) {
        WritableMap map = Arguments.createMap();
        map.putInt("code", error.getCode());
        map.putString("message", error.getMessage());
        this.emit(eventName, map);
    }

    @Override
    public void emit(String eventName, @NonNull RewardItem rewardItem) {
        WritableMap map = Arguments.createMap();
        WritableMap reward = Arguments.createMap();
        reward.putInt("amount", rewardItem.getAmount());
        reward.putString("type", rewardItem.getType());
        map.putMap("reward", reward);
        this.emit(eventName, map);
    }

    @Override
    protected void emit(String eventName, Map<String, Object> data) {
        NOT_IMPLEMENTED();
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
