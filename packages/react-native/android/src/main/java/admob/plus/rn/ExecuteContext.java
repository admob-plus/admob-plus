package admob.plus.rn;

import android.app.Activity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import admob.plus.core.Context;

public class ExecuteContext implements Context {
    public static AdMobPlusRNModule plugin;
    public final ReadableMap opts;
    public final Promise promise;

    ExecuteContext(@Nullable ReadableMap opts, Promise promise) {
        this.opts = opts == null ? Arguments.createMap() : opts;
        this.promise = promise;
    }

    public Activity getActivity() {
        return plugin.reactContext.getCurrentActivity();
    }

    @Override
    public boolean has(@NonNull String name) {
        return opts.hasKey(name);
    }

    @Nullable
    @Override
    public Object opt(@NonNull String name) {
        return opts.getDynamic(name);
    }

    @Nullable
    @Override
    public Boolean optBoolean(@NonNull String name) {
        return opts.getBoolean(name);
    }

    @Nullable
    @Override
    public Double optDouble(@NonNull String name) {
        return opts.getDouble(name);
    }

    @Nullable
    @Override
    public Integer optInt(@NonNull String name) {
        return opts.getInt(name);
    }

    @Nullable
    @Override
    public String optString(@NonNull String name) {
        return opts.getString(name);
    }

    @NonNull
    @Override
    public List<String> optStringList(@NonNull String name) {
        List<String> result = new ArrayList<String>();
        ReadableArray a = opts.getArray(name);
        for (int i = 0; i < Objects.requireNonNull(a).size(); i++) {
            String testDeviceId = a.getString(i);
            result.add(testDeviceId);
        }
        return result;
    }

    @Nullable
    @Override
    public JSONObject optObject(@NonNull String name) {
        if (!has(name)) return null;
        return new JSONObject(Objects.requireNonNull(opts.getMap(name)).toHashMap());
    }

    @Override
    public void resolve() {
        promise.resolve(null);
    }

    @Override
    public void resolve(boolean data) {
        promise.resolve(data);
    }

    @Override
    public void reject(String msg) {
        promise.reject("unknown", msg);
    }
}
