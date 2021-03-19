package admob.plugin;

import android.provider.Settings;
import android.util.Log;

import com.google.android.gms.ads.MobileAds;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import admob.plugin.Generated.Actions;
import admob.plugin.ads.Banner;
import admob.plugin.ads.Interstitial;
import admob.plugin.ads.Rewarded;
import admob.plugin.ads.RewardedInterstitial;

public class AdMob extends CordovaPlugin {
    private static final String TAG = "AdMob-Plus";
    private final ArrayList<PluginResult> eventQueue = new ArrayList<PluginResult>();
    private CallbackContext readyCallbackContext = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        ExecuteContext.plugin = this;
    }

    @Override
    public boolean execute(String actionKey, JSONArray args, CallbackContext callbackContext) {
        ExecuteContext ctx = new ExecuteContext(actionKey, args, callbackContext);

        switch (actionKey) {
            case Actions.READY:
                return executeReady(callbackContext);
            case Actions.START:
                MobileAds.initialize(cordova.getActivity(), status -> callbackContext.success(new JSONObject(new HashMap<String, Object>() {{
                    put("version", MobileAds.getVersionString());
                }})));
                break;
            case Actions.CONFIG_REQUEST:
                MobileAds.setRequestConfiguration(ctx.optRequestConfiguration());
                callbackContext.success();
                break;
            case Actions.BANNER_SHOW:
                return executeBannerShow(ctx);
            case Actions.BANNER_HIDE:
                return executeBannerHide(ctx);
            case Actions.INTERSTITIAL_IS_LOADED:
                return executeInterstitialIsLoaded(ctx);
            case Actions.INTERSTITIAL_LOAD:
                return executeInterstitialLoad(ctx);
            case Actions.INTERSTITIAL_SHOW:
                return executeInterstitialShow(ctx);
            case Actions.REWARDED_IS_LOADED:
                return executeRewardedIsLoaded(ctx);
            case Actions.REWARDED_LOAD:
                return executeRewardedLoad(ctx);
            case Actions.REWARDED_SHOW:
                return executeRewardedShow(ctx);
            case Actions.REWARDED_INTERSTITIAL_IS_LOADED:
                return executeRewardedInterstitialIsLoaded(ctx);
            case Actions.REWARDED_INTERSTITIAL_LOAD:
                return executeRewardedInterstitialLoad(ctx);
            case Actions.REWARDED_INTERSTITIAL_SHOW:
                return executeRewardedInterstitialShow(ctx);
            case Actions.SET_APP_MUTED: {
                boolean value = args.optBoolean(0);
                MobileAds.setAppMuted(value);
                callbackContext.success();
                break;
            }
            case Actions.SET_APP_VOLUME: {
                float value = BigDecimal.valueOf(args.optDouble(0)).floatValue();
                MobileAds.setAppVolume(value);
                callbackContext.success();
                break;
            }
            default:
                return false;
        }

        return true;
    }

    private boolean executeReady(CallbackContext callbackContext) {
        if (readyCallbackContext == null) {
            for (PluginResult result : eventQueue) {
                callbackContext.sendPluginResult(result);
            }
            eventQueue.clear();
        } else {
            Log.e(TAG, "Ready action should only be called once.");
        }
        readyCallbackContext = callbackContext;
        emit(Generated.Events.READY, new HashMap<String, Object>() {{
            put("isRunningInTestLab", isRunningInTestLab());
        }});
        return true;
    }

    private boolean executeBannerShow(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Banner banner = Banner.getOrCreate(ctx);
            banner.show(ctx);
        });
        return true;
    }

    private boolean executeBannerHide(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Banner banner = (Banner) ctx.optAdOrError();
            if (banner != null) {
                banner.hide();
                ctx.callbackContext.success();
            }
        });
        return true;
    }

    private boolean executeInterstitialIsLoaded(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Interstitial interstitial = (Interstitial) ctx.optAd();
            PluginResult result = new PluginResult(PluginResult.Status.OK, interstitial != null && interstitial.isLoaded());
            ctx.callbackContext.sendPluginResult(result);
        });
        return true;
    }

    private boolean executeInterstitialLoad(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Interstitial interstitial = Interstitial.getOrCreate(ctx);
            interstitial.load(ctx);
        });
        return true;
    }

    private boolean executeInterstitialShow(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Interstitial interstitial = (Interstitial) ctx.optAdOrError();
            if (interstitial != null) {
                interstitial.show(ctx);
            }
        });
        return true;
    }

    private boolean executeRewardedIsLoaded(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Rewarded rewarded = ctx.optAd(Rewarded.class);
            PluginResult result = new PluginResult(PluginResult.Status.OK, rewarded != null && rewarded.isLoaded());
            ctx.callbackContext.sendPluginResult(result);
        });
        return true;
    }

    private boolean executeRewardedLoad(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Rewarded rewarded = Rewarded.getOrCreate(ctx);
            rewarded.load(ctx);
        });
        return true;
    }

    private boolean executeRewardedShow(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Rewarded rewarded = (Rewarded) ctx.optAdOrError();
            if (rewarded != null) {
                rewarded.show(ctx);
            }
        });
        return true;
    }

    private boolean executeRewardedInterstitialIsLoaded(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            RewardedInterstitial ad = (RewardedInterstitial) ctx.optAd();
            PluginResult result = new PluginResult(PluginResult.Status.OK, ad != null && ad.isLoaded());
            ctx.callbackContext.sendPluginResult(result);
        });
        return true;
    }

    private boolean executeRewardedInterstitialLoad(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            RewardedInterstitial ad = RewardedInterstitial.getOrCreate(ctx);
            ad.load(ctx);
        });
        return true;
    }

    private boolean executeRewardedInterstitialShow(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            RewardedInterstitial ad = (RewardedInterstitial) ctx.optAdOrError();
            if (ad != null) {
                ad.show(ctx);
            }
        });
        return true;
    }

    @Override
    public void onDestroy() {
        readyCallbackContext = null;

        super.onDestroy();
    }

    public void emit(String eventName) {
        emit(eventName, null);
    }

    public void emit(String eventName, Map<String, Object> data) {
        JSONObject event = new JSONObject(new HashMap<String, Object>() {{
            put("type", eventName);
            put("data", data);
        }});

        PluginResult result = new PluginResult(PluginResult.Status.OK, event);
        result.setKeepCallback(true);
        if (readyCallbackContext == null) {
            eventQueue.add(result);
        } else {
            readyCallbackContext.sendPluginResult(result);
        }
    }

    private boolean isRunningInTestLab() {
        String testLabSetting = Settings.System.getString(cordova.getActivity().getContentResolver(),
                "firebase.test.lab");
        return "true".equals(testLabSetting);
    }
}
