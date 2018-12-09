package admob.plugin.ads;

import com.google.android.gms.ads.AdRequest;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import admob.plugin.Action;
import admob.plugin.Events;

public class InterstitialAd extends AdBase {
    private com.google.android.gms.ads.InterstitialAd interstitialAd = null;

    InterstitialAd(int id, String adUnitID) {
        super(id, adUnitID);
    }

    public static boolean executeLoadAction(Action action, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                InterstitialAd interstitialAd = (InterstitialAd) action.getAd();
                if (interstitialAd == null) {
                    interstitialAd = new InterstitialAd(action.optId(), action.getAdUnitID());
                }
                interstitialAd.load(action.buildAdRequest(), action.getAdUnitID());

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public static boolean executeShowAction(Action action, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                InterstitialAd interstitialAd = (InterstitialAd) action.getAd();
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

    @Override
    String getLoadedEvent() {
        return Events.INTERSTITIAL_LOAD;
    }

    @Override
    String getFailedToLoadEvent() {
        return Events.INTERSTITIAL_LOAD_FAIL;
    }

    @Override
    String getOpenedEvent() {
        return Events.INTERSTITIAL_OPEN;
    }

    @Override
    String getClosedEvent() {
        return Events.INTERSTITIAL_CLOSE;
    }

    @Override
    String getLeftApplicationEvent() {
        return Events.INTERSTITIAL_EXIT_APP;
    }

    @Override
    String getImpressionEvent() {
        return Events.INTERSTITIAL_IMPRESSION;
    }

    @Override
    String getClickedEvent() {
        return Events.INTERSTITIAL_CLICK;
    }

    private void load(AdRequest adRequest, String adUnitID) {
        clear();

        interstitialAd = new com.google.android.gms.ads.InterstitialAd(plugin.cordova.getActivity());
        interstitialAd.setAdUnitId(adUnitID);

        interstitialAd.setAdListener(new AdListener(this));

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
