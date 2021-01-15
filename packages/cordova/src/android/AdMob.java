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
import admob.plugin.ads.RewardedVideoAd;

public class AdMob extends CordovaPlugin {
    private static final String TAG = "AdMob-Plus";
    private final ArrayList<PluginResult> eventQueue = new ArrayList<PluginResult>();
    private CallbackContext readyCallbackContext = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        MobileAds.initialize(cordova.getActivity(), new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {
                emit(Generated.Events.INIT_COMPLETE);
            }
        });
        AdBase.initialize(this);
    }

    @Override
    public boolean execute(String actionKey, JSONArray args, CallbackContext callbackContext) {
        Action action = new Action(args);

        if (Actions.READY.equals(actionKey)) {
            return executeReady(callbackContext);
        } else if (Actions.CONFIG_REQUEST.equals(actionKey)) {
            MobileAds.setRequestConfiguration(action.getRequestConfiguration());
            return ok(callbackContext);
        } else if (Actions.BANNER_SHOW.equals(actionKey)) {
            return executeBannerShow(action, callbackContext);
        } else if (Actions.BANNER_HIDE.equals(actionKey)) {
            return executeBannerHide(action, callbackContext);
        } else if (Actions.INTERSTITIAL_IS_LOADED.equals(actionKey)) {
            return InterstitialAd.executeIsLoadedAction(action, callbackContext);
        } else if (Actions.INTERSTITIAL_LOAD.equals(actionKey)) {
            return InterstitialAd.executeLoadAction(action, callbackContext);
        } else if (Actions.INTERSTITIAL_SHOW.equals(actionKey)) {
            return InterstitialAd.executeShowAction(action, callbackContext);
        } else if (Actions.REWARDED_IS_READY.equals(actionKey)) {
            return RewardedVideoAd.executeIsReadyAction(action, callbackContext);
        } else if (Actions.REWARDED_LOAD.equals(actionKey)) {
            return RewardedVideoAd.executeLoadAction(action, callbackContext);
        } else if (Actions.REWARDED_SHOW.equals(actionKey)) {
            return RewardedVideoAd.executeShowAction(action, callbackContext);
        } else if (Actions.SET_APP_MUTED.equals(actionKey)) {
            boolean value = args.optBoolean(0);
            MobileAds.setAppMuted(value);
            return ok(callbackContext);
        } else if (Actions.SET_APP_VOLUME.equals(actionKey)) {
            float value = BigDecimal.valueOf(args.optDouble(0)).floatValue();
            MobileAds.setAppVolume(value);
            return ok(callbackContext);
        }

        return false;
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

    public boolean executeBannerShow(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BannerAd bannerAd = BannerAd.getOrCreate(action);
                bannerAd.show(action.buildAdRequest());
                ok(callbackContext);
            }
        });

        return true;
    }

    public boolean executeBannerHide(Action action, CallbackContext callbackContext) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BannerAd bannerAd = (BannerAd) action.getAd();
                if (bannerAd != null) {
                    bannerAd.hide();
                }
                ok(callbackContext);
            }
        });

        return true;
    }

    private boolean ok(CallbackContext callbackContext) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, "");
        callbackContext.sendPluginResult(result);
        return true;
    }

    @Override
    public void onDestroy() {
        readyCallbackContext = null;

        super.onDestroy();
    }

    public void emit(String eventType) {
        emit(eventType, false);
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
