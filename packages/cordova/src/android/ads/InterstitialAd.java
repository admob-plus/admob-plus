package admob.plugin.ads;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import admob.plugin.Events;

public class InterstitialAd extends AdBase {
    private com.google.android.gms.ads.InterstitialAd interstitialAd = null;

    InterstitialAd(int id) {
        super(id);
    }

    public static boolean executeLoadAction(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        final String adUnitID = opts.optString("adUnitID");

        final InterstitialAd interstitialAd = getOrCreate(opts);
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                interstitialAd.load(adUnitID);

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public static boolean executeShowAction(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        final int id = opts.optInt("id");

        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                InterstitialAd interstitialAd = getAd(id);
                if (interstitialAd != null) {
                    interstitialAd.show();
                }

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    private static InterstitialAd getAd(int id) {
        AdBase ad = AdBase.getAd(id);
        return (ad != null) ? (InterstitialAd) ad : null;
    }

    private static InterstitialAd getOrCreate(JSONObject opts) {
        int id = opts.optInt("id");
        InterstitialAd ad = getAd(id);
        return (ad != null) ? ad : new InterstitialAd(id);
    }

    private void load(String adUnitID) {
        clear();

        interstitialAd = new com.google.android.gms.ads.InterstitialAd(plugin.cordova.getActivity());
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

        AdRequest adRequest = createAdRequestBuilder().build();
        interstitialAd.loadAd(adRequest);
    }

    private void show() {
        if (interstitialAd != null && interstitialAd.isLoaded()) {
            interstitialAd.show();
        }
    }

    private void clear() {
        if (interstitialAd != null) {
            interstitialAd.setAdListener(null);
            interstitialAd = null;
        }
    }
}
