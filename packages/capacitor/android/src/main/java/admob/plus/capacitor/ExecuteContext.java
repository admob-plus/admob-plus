package admob.plus.capacitor;

import android.app.Activity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import admob.plus.capacitor.ads.AdBase;
import admob.plus.core.Context;
import admob.plus.core.Helper;

public class ExecuteContext implements Context {
    public static AdMobPlusPlugin plugin;
    public final PluginCall call;

    ExecuteContext(PluginCall call) {
        this.call = call;
    }

    @Nullable
    public <T extends AdBase> T optAdOrCreate(Class<T> type) {
        T ad = type.cast(optAd());
        if (ad == null) {
            try {
                ad = type.getDeclaredConstructor(ExecuteContext.class).newInstance(this);
            } catch (IllegalAccessException | InstantiationException | InvocationTargetException | NoSuchMethodException e) {
                e.printStackTrace();
                this.reject("Fail to create ad");
            }
        }
        return ad;
    }

    public Activity getActivity() {
        return plugin.getActivity();
    }

    @Override
    public boolean has(String name) {
        return call.hasOption(name);
    }

    @Nullable
    @Override
    public Object opt(@Nullable String name) {
        return call.getData().opt(name);
    }

    @Nullable
    @Override
    public Boolean optBoolean(@Nullable String name) {
        return call.getBoolean(name);
    }

    @Nullable
    @Override
    public Double optDouble(String name) {
        return call.getDouble(name);
    }

    @Nullable
    @Override
    public Float optFloat(String name) {
        return call.getFloat(name);
    }

    @Nullable
    @Override
    public Integer optInt(@Nullable String name) {
        return call.getInt(name);
    }

    @Nullable
    @Override
    public String optString(@Nullable String name) {
        return call.getString(name);
    }

    @NonNull
    @Override
    public List<String> optStringList(@Nullable String name) {
        return Helper.jsonArray2stringList(call.getArray(name));
    }

    @Nullable
    @Override
    public JSONObject optObject(@Nullable String name) {
        return call.getObject(name, null);
    }

    @Override
    public void resolve() {
        call.resolve();
    }

    @Override
    public void resolve(boolean data) {
        try {
            call.resolve(new JSObject("true"));
        } catch (JSONException e) {
            e.printStackTrace();
            reject();
        }
    }

    @Override
    public void reject(String msg) {
        call.reject(msg);
    }
}
