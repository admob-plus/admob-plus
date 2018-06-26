package admob.suite.interstitial;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.InterstitialAd;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;

import admob.suite.AbstractExecutor;
import admob.suite.AdMob;

public class InterstitialExecutor extends AbstractExecutor {
    private static final String TEST_AD_UNIT_ID = "ca-app-pub-3940256099942544/1033173712";
    private InterstitialAd interstitialAd = null;

    public InterstitialExecutor(AdMob plugin) {
        super(plugin);
    }

    @Override
    public void destroy() {
        interstitialAd = null;

        super.destroy();
    }

    public boolean prepare(JSONArray inputs, CallbackContext callbackContext) {
        interstitialAd = new InterstitialAd(plugin.cordova.getActivity());
        interstitialAd.setAdUnitId(TEST_AD_UNIT_ID);

        interstitialAd.setAdListener(new AdListener() {
            @Override
            public void onAdClosed() {
                plugin.emit("admob.interstitial.close");
            }

            @Override
            public void onAdFailedToLoad(int errorCode) {
                plugin.emit("admob.interstitial.load_fail");
            }

            @Override
            public void onAdLeftApplication() {
                plugin.emit("admob.interstitial.exit_app");
            }

            @Override
            public void onAdLoaded() {
                plugin.emit("admob.interstitial.load");
            }

            @Override
            public void onAdOpened() {
                plugin.emit("admob.interstitial.open");
            }
        });

        AdRequest adRequest = new AdRequest.Builder().build();
        interstitialAd.loadAd(adRequest);

        PluginResult result = new PluginResult(PluginResult.Status.OK, "");
        callbackContext.sendPluginResult(result);

        return true;
    }

    public boolean show(JSONArray inputs, CallbackContext callbackContext) {
        if (interstitialAd != null && interstitialAd.isLoaded()) {
            interstitialAd.show();
        }

        PluginResult result = new PluginResult(PluginResult.Status.OK, "");
        callbackContext.sendPluginResult(result);

        return true;
    }
}
