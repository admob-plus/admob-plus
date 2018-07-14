package admob.suite.interstitial;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.InterstitialAd;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import admob.suite.AbstractExecutor;
import admob.suite.AdMob;
import admob.suite.Events;

public class InterstitialExecutor extends AbstractExecutor {
    private InterstitialAd interstitialAd = null;

    public InterstitialExecutor(AdMob plugin) {
        super(plugin);
    }

    @Override
    public void destroy() {
        clearInterstitialAd();

        super.destroy();
    }

    public boolean load(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        String adUnitID = opts.optString("adUnitID");

        String finalAdUnitID = adUnitID;
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                createAndLoadInterstitial(finalAdUnitID);

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public boolean show(JSONArray args, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                showInterstitial();

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    private void createAndLoadInterstitial(String adUnitID) {
        clearInterstitialAd();

        interstitialAd = new InterstitialAd(plugin.cordova.getActivity());
        interstitialAd.setAdUnitId(adUnitID);

        interstitialAd.setAdListener(new AdListener() {
            @Override
            public void onAdClosed() {
                plugin.emit(Events.INTERSTITIAL_CLOSE);
            }

            @Override
            public void onAdFailedToLoad(int errorCode) {
                plugin.emit(Events.INTERSTITIAL_LOAD_FAIL);
            }

            @Override
            public void onAdLeftApplication() {
                plugin.emit(Events.INTERSTITIAL_EXIT_APP);
            }

            @Override
            public void onAdLoaded() {
                plugin.emit(Events.INTERSTITIAL_LOAD);
            }

            @Override
            public void onAdOpened() {
                plugin.emit(Events.INTERSTITIAL_OPEN);
            }
        });

        AdRequest adRequest = new AdRequest.Builder().build();
        interstitialAd.loadAd(adRequest);
    }

    private void clearInterstitialAd() {
        if (interstitialAd != null) {
            interstitialAd.setAdListener(null);
            interstitialAd = null;
        }
    }

    private void showInterstitial() {
        if (interstitialAd != null && interstitialAd.isLoaded()) {
            interstitialAd.show();
        }
    }
}
