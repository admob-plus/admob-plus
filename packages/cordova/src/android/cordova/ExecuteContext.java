package admob.plus.cordova;

import android.app.Activity;
import android.os.Bundle;
import android.util.SparseArray;

import androidx.annotation.Nullable;

import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;

import admob.plus.cordova.ads.AdBase;
import admob.plus.cordova.ads.Banner.AdSizeType;

public class ExecuteContext {
    public static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
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

    public int optId() {
        return opts.optInt("id");
    }

    @Nullable
    public String optString(String name) {
        return this.opts.optString(name);
    }

    @Nullable
    public String optAdUnitID() {
        return optString("adUnitId");
    }

    public String optPosition() {
        return optString("position");
    }

    @Nullable
    public Integer optOffset() {
        if (opts.has("offset")) {
            return opts.optInt("offset");
        }
        return null;
    }

    @Nullable
    public AdBase optAd() {
        return AdBase.getAd(optId());
    }

    @Nullable
    public <T extends AdBase> T optAdOrCreate(Class<T> type) {
        AdBase adOrNull = optAd();
        if (adOrNull != null) {
            try {
                return type.cast(adOrNull);
            } catch (ClassCastException e) {
                this.error("Wrong ad type");
                return null;
            }
        }
        try {
            return type.getDeclaredConstructor(ExecuteContext.class).newInstance(this);
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException | NoSuchMethodException e) {
            e.printStackTrace();
            this.error("Fail to create ad");
        }
        return null;
    }

    @Nullable
    public AdBase optAdOrError() {
        AdBase ad = optAd();
        if (ad == null) {
            this.error("Ad not found");
        }
        return ad;
    }

    @Nullable
    public ServerSideVerificationOptions optServerSideVerificationOptions() {
        final String param = "serverSideVerification";
        if (!this.opts.has(param)) {
            return null;
        }
        JSONObject serverSideVerification = this.opts.optJSONObject(param);
        if (serverSideVerification == null) {
            return null;
        }

        ServerSideVerificationOptions.Builder builder = new ServerSideVerificationOptions.Builder();
        if (serverSideVerification.has("customData")) {
            builder.setCustomData(serverSideVerification.optString("customData"));
        }
        if (serverSideVerification.has("userId")) {
            builder.setUserId(serverSideVerification.optString("userId"));
        }
        return builder.build();
    }

    public AdRequest optAdRequest() {
        AdRequest.Builder builder = new AdRequest.Builder();
        if (this.opts.has("contentUrl")) {
            builder.setContentUrl(opts.optString("contentUrl"));
        }
        Bundle extras = new Bundle();
        if (this.opts.has("npa")) {
            extras.putString("npa", opts.optString("npa"));
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
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

    public void success() {
        callbackContext.success();
    }

    public void success(boolean data) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, data);
        sendResult(result);
    }

    public void error(String message) {
        callbackContext.error(message);
    }
}
