package admob.plus.cordova;

import android.app.Activity;
import android.content.res.Configuration;
import android.util.Log;

import com.google.android.gms.ads.MobileAds;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import admob.plus.AdMobHelper;
import admob.plus.cordova.Generated.Actions;
import admob.plus.cordova.ads.AdBase;
import admob.plus.cordova.ads.AppOpen;
import admob.plus.cordova.ads.Banner;
import admob.plus.cordova.ads.IAdIsLoaded;
import admob.plus.cordova.ads.IAdShow;
import admob.plus.cordova.ads.Interstitial;
import admob.plus.cordova.ads.Rewarded;
import admob.plus.cordova.ads.RewardedInterstitial;

import static admob.plus.cordova.ExecuteContext.ads;

public class AdMob extends CordovaPlugin {
    private static final String TAG = "AdMobPlus";
    private final ArrayList<PluginResult> eventQueue = new ArrayList<PluginResult>();
    public AdMobHelper helper;
    private CallbackContext readyCallbackContext = null;

    @Override
    protected void pluginInitialize() {
        super.pluginInitialize();
        Log.i(TAG, "Initialize plugin");

        helper = new AdMobHelper(new AdMobHelper.Adapter() {
            @Override
            public Activity getActivity() {
                return cordova.getActivity();
            }
        });
        ExecuteContext.plugin = this;
    }

    @Override
    public boolean execute(String actionKey, JSONArray args, CallbackContext callbackContext) {
        Log.d(TAG, String.format("Execute %s", actionKey));
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
                MobileAds.setRequestConfiguration(helper.buildRequestConfiguration(ctx.opts));
                callbackContext.success();
                break;
            case Actions.CREATE_AD:
                String adType = ctx.optString("type");
                if (adType == null) {
                    ctx.error("ad type is missing");
                } else {
                    switch (adType) {
                        case "app-open":
                            new AppOpen(ctx);
                            break;
                    }
                    ctx.success();
                }
                break;
            case Actions.APP_OPEN_TRY_TO_PRESENT:
                cordova.getActivity().runOnUiThread(() -> {
                    AppOpen ad = (AppOpen) ctx.optAdOrError();
                    if (ad != null) {
                        ad.showOrLoad();
                        ctx.success();
                    } else {
                        ctx.error("cannot find ad");
                    }
                });
                break;
            case Actions.BANNER_LOAD:
                return executeBannerLoad(ctx);
            case Actions.BANNER_SHOW:
                return executeBannerShow(ctx);
            case Actions.BANNER_HIDE:
                return executeBannerHide(ctx);
            case Actions.INTERSTITIAL_LOAD:
                return executeInterstitialLoad(ctx);
            case Actions.REWARDED_LOAD:
                return executeRewardedLoad(ctx);
            case Actions.REWARDED_INTERSTITIAL_LOAD:
                return executeRewardedInterstitialLoad(ctx);
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
            case Actions.INTERSTITIAL_IS_LOADED:
            case Actions.REWARDED_IS_LOADED:
            case Actions.REWARDED_INTERSTITIAL_IS_LOADED:
                return executeAdIsLoaded(ctx);
            case Actions.INTERSTITIAL_SHOW:
            case Actions.REWARDED_SHOW:
            case Actions.REWARDED_INTERSTITIAL_SHOW:
                return executeAdShow(ctx);
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
            put("isRunningInTestLab", helper.isRunningInTestLab());
        }});
        return true;
    }

    private boolean executeBannerLoad(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Banner banner = ctx.optAdOrCreate(Banner.class);
            if (banner != null) {
                banner.load(ctx);
            }
        });
        return true;
    }

    private boolean executeBannerShow(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Banner banner = (Banner) ctx.optAdOrError();
            if (banner != null) {
                banner.show(ctx);
            }
        });
        return true;
    }

    private boolean executeBannerHide(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Banner banner = (Banner) ctx.optAdOrError();
            if (banner != null) {
                banner.hide(ctx);
            }
        });
        return true;
    }

    private boolean executeAdIsLoaded(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            IAdIsLoaded ad = (IAdIsLoaded) ctx.optAdOrError();
            if (ad != null) {
                ctx.success(ad.isLoaded());
            }
        });
        return true;
    }

    private boolean executeInterstitialLoad(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Interstitial ad = ctx.optAdOrCreate(Interstitial.class);
            if (ad != null) {
                ad.load(ctx);
            }
        });
        return true;
    }

    private boolean executeAdShow(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            IAdShow ad = (IAdShow) ctx.optAdOrError();
            if (ad != null) {
                ad.show(ctx);
            }
        });
        return true;
    }

    private boolean executeRewardedLoad(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            Rewarded ad = ctx.optAdOrCreate(Rewarded.class);
            if (ad != null) {
                ad.load(ctx);
            }
        });
        return true;
    }

    private boolean executeRewardedInterstitialLoad(ExecuteContext ctx) {
        cordova.getActivity().runOnUiThread(() -> {
            RewardedInterstitial ad = ctx.optAdOrCreate(RewardedInterstitial.class);
            if (ad != null) {
                ad.load(ctx);
            }
        });
        return true;
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        for (int i = 0; i < ads.size(); i++) {
            AdBase ad = ads.valueAt(i);
            ad.onConfigurationChanged(newConfig);
        }
    }

    @Override
    public void onPause(boolean multitasking) {
        for (int i = 0; i < ads.size(); i++) {
            AdBase ad = ads.valueAt(i);
            ad.onPause(multitasking);
        }
        super.onPause(multitasking);
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        for (int i = 0; i < ads.size(); i++) {
            AdBase ad = ads.valueAt(i);
            ad.onResume(multitasking);
        }
    }

    @Override
    public void onDestroy() {
        readyCallbackContext = null;

        for (int i = 0; i < ads.size(); i++) {
            AdBase ad = ads.valueAt(i);
            ad.onDestroy();
        }

        Banner.destroyParentView();

        super.onDestroy();
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
}
