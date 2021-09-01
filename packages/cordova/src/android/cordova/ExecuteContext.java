package admob.plus.cordova;

import android.app.Activity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.gms.ads.AdSize;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import admob.plus.cordova.ads.Banner.AdSizeType;
import admob.plus.core.Ad;
import admob.plus.core.Context;

import static admob.plus.core.Helper.jsonArray2stringList;

public class ExecuteContext implements Context {
    public static AdMob plugin;
    public final String actionKey;
    public final JSONArray args;
    public final CallbackContext callbackContext;
    public final JSONObject opts;

    ExecuteContext(String actionKey, JSONArray args, CallbackContext callbackContext) {
        this.actionKey = actionKey;
        this.args = args;
        this.callbackContext = callbackContext;
        this.opts = args.optJSONObject(0);
    }

    @Override
    public boolean has(String name) {
        return opts.has(name);
    }

    @Nullable
    @Override
    public Object opt(@Nullable String name) {
        return opts.opt(name);
    }

    @Nullable
    @Override
    public Boolean optBoolean(@Nullable String name) {
        if (!opts.has(name)) return null;
        return opts.optBoolean(name);
    }

    @Nullable
    @Override
    public Double optDouble(@Nullable String name) {
        if (!opts.has(name)) return null;
        return opts.optDouble(name);
    }

    @Nullable
    @Override
    public Integer optInt(@Nullable String name) {
        if (!opts.has(name)) return null;
        return opts.optInt(name);
    }

    @Nullable
    @Override
    public String optString(String name) {
        if (!opts.has(name)) return null;
        return opts.optString(name);
    }

    @NonNull
    @Override
    public List<String> optStringList(@Nullable String name) {
        return jsonArray2stringList(opts.optJSONArray(name));
    }

    @Nullable
    @Override
    public JSONObject optObject(@Nullable String name) {
        return opts.optJSONObject(name);
    }

    @Override
    public void resolve() {
        callbackContext.success();
    }

    @Override
    public void resolve(boolean data) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, data);
        sendResult(result);
    }

    @Override
    public void reject(String msg) {
        callbackContext.error(msg);
    }

    @Nullable
    public Integer optOffset() {
        if (opts.has("offset")) {
            return opts.optInt("offset");
        }
        return null;
    }

    @Nullable
    public <T extends Ad> T optAdOrCreate(Class<T> type) {
        Ad adOrNull = optAd();
        if (adOrNull != null) {
            try {
                return type.cast(adOrNull);
            } catch (ClassCastException e) {
                this.reject("Wrong ad type");
                return null;
            }
        }
        try {
            return type.getDeclaredConstructor(ExecuteContext.class).newInstance(this);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException | NoSuchMethodException e) {
            e.printStackTrace();
            this.reject("Fail to create ad");
        }
        return null;
    }

    public AdSize optAdSize() {
        final String name = "size";
        if (!opts.has(name)) {
            return AdSize.SMART_BANNER;
        }
        AdSize adSize = AdSizeType.getAdSize(opts.optInt(name));
        if (adSize != null) {
            return adSize;
        }
        JSONObject adSizeObj = opts.optJSONObject(name);
        if (adSizeObj == null) {
            return AdSize.SMART_BANNER;
        }
        return new AdSize(adSizeObj.optInt("width"), adSizeObj.optInt("height"));
    }

    public Activity getActivity() {
        return plugin.cordova.getActivity();
    }

    public void sendResult(PluginResult result) {
        callbackContext.sendPluginResult(result);
    }
}
