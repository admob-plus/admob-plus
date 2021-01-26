package admob.plugin;

import android.provider.Settings;
import android.util.Log;

import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.util.ArrayList;

import admob.plugin.Generated.Actions;
import admob.plugin.ads.AdBase;
import admob.plugin.ads.BannerAd;
import admob.plugin.ads.InterstitialAd;
import admob.plugin.ads.RewardedAd;

public class AdMob extends CordovaPlugin {
    private static final String TAG = "AdMob-Plus";
    private final ArrayList<PluginResult> eventQueue = new ArrayList<PluginResult>();
    private CallbackContext readyCallbackContext = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        AdBase.initialize(this);
    }

    @Override
    public boolean execute(String actionKey, JSONArray args, CallbackContext callbackContext) {
        Action action = new Action(args);

        switch (actionKey) {
            case Actions.READY:
                return executeReady(callbackContext);
            case Actions.START:
                MobileAds.initialize(cordova.getActivity(), new OnInitializationCompleteListener() {
                    @Override
                    public void onInitializationComplete(InitializationStatus initializationStatus) {
                        callbackContext.success();
                    }
                });
                break;
            case Actions.CONFIG_REQUEST:
                MobileAds.setRequestConfiguration(action.getRequestConfiguration());
                callbackContext.success();
            case Actions.BANNER_SHOW:
                return executeBannerShow(action, callbackContext);
            case Actions.BANNER_HIDE:
                return executeBannerHide(action, callbackContext);
            case Actions.INTERSTITIAL_IS_LOADED:
                return executeInterstitialIsLoaded(action, callbackContext);
            case Actions.INTERSTITIAL_LOAD:
                return executeInterstitialLoad(action, callbackContext);
            case Actions.INTERSTITIAL_SHOW:
                return executeInterstitialShow(action, callbackContext);
            case Actions.REWARDED_IS_LOADED:
                return executeRewardedIsLoaded(action, callbackContext);
            case Actions.REWARDED_LOAD:
                return executeRewardedLoad(action, callbackContext);
            case Actions.REWARDED_SHOW:
                return executeRewardedShow(action, callbackContext);
            case Actions.SET_APP_MUTED: {
                boolean value = args.optBoolean(0);
                MobileAds.setAppMuted(value);
                callbackContext.success();
            }
            case Actions.SET_APP_VOLUME: {
                float value = BigDecimal.valueOf(args.optDouble(0)).floatValue();
                MobileAds.setAppVolume(value);
                callbackContext.success();
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
        JSONObject data = new JSONObject();
        try {
            data.put("isRunningInTestLab", isRunningInTestLab());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        emit(Generated.Events.READY, data);
        return true;
    }

    private boolean executeBannerShow(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BannerAd bannerAd = BannerAd.getOrCreate(action);
                bannerAd.show(action.buildAdRequest());
                callbackContext.success();
            }
        });
        return true;
    }

    private boolean executeBannerHide(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BannerAd bannerAd = (BannerAd) action.getAd();
                if (bannerAd != null) {
                    bannerAd.hide();
                }
                callbackContext.success();
            }
        });
        return true;
    }

    private boolean executeInterstitialIsLoaded(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                InterstitialAd interstitialAd = (InterstitialAd) action.getAd();
                PluginResult result = new PluginResult(PluginResult.Status.OK, interstitialAd != null && interstitialAd.isLoaded());
                callbackContext.sendPluginResult(result);
            }
        });
        return true;
    }

    private boolean executeInterstitialLoad(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                InterstitialAd interstitialAd = InterstitialAd.getOrCreate(action);
                interstitialAd.load(action.buildAdRequest(), action.getAdUnitID());
                callbackContext.success();
            }
        });
        return true;
    }

    private boolean executeInterstitialShow(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                InterstitialAd interstitialAd = (InterstitialAd) action.getAd();
                if (interstitialAd != null) {
                    interstitialAd.show();
                }
                callbackContext.success();
            }
        });
        return true;
    }

    private boolean executeRewardedIsLoaded(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RewardedAd rewardedAd = (RewardedAd) action.getAd();
                PluginResult result = new PluginResult(PluginResult.Status.OK, rewardedAd != null && rewardedAd.isLoaded());
                callbackContext.sendPluginResult(result);
            }
        });
        return true;
    }

    private boolean executeRewardedLoad(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RewardedAd rewardedAd = RewardedAd.getOrCreate(action);
                rewardedAd.createAndLoad(action.buildAdRequest());
                callbackContext.success();
            }
        });
        return true;
    }

    private boolean executeRewardedShow(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RewardedAd rewardedAd = (RewardedAd) action.getAd();
                if (rewardedAd != null) {
                    rewardedAd.show();
                }
                callbackContext.success();
            }
        });
        return true;
    }

    @Override
    public void onDestroy() {
        readyCallbackContext = null;

        super.onDestroy();
    }

    public void emit(String eventType) {
        emit(eventType, null);
    }

    public void emit(String eventType, Object data) {
        JSONObject event = new JSONObject();
        try {
            event.put("type", eventType);
            event.put("data", data);
        } catch (JSONException e) {
            e.printStackTrace();
        }

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
