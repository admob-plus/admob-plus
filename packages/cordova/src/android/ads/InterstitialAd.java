package admob.plugin.ads;

import com.google.android.gms.ads.AdRequest;

import admob.plugin.Action;
import admob.plugin.Generated.Events;

public class InterstitialAd extends AdBase {
    private com.google.android.gms.ads.InterstitialAd interstitialAd = null;

    InterstitialAd(int id, String adUnitID) {
        super(id, adUnitID);
    }

    public static InterstitialAd getOrCreate(Action action) {
        InterstitialAd interstitialAd = (InterstitialAd) action.getAd();
        if (interstitialAd == null) {
            interstitialAd = new InterstitialAd(action.optId(), action.getAdUnitID());
        }
        return interstitialAd;
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
    String getImpressionEvent() {
        return Events.INTERSTITIAL_IMPRESSION;
    }

    @Override
    String getClickedEvent() {
        return Events.INTERSTITIAL_CLICK;
    }

    public void load(AdRequest adRequest, String adUnitID) {
        clear();

        interstitialAd = new com.google.android.gms.ads.InterstitialAd(plugin.cordova.getActivity());
        interstitialAd.setAdUnitId(adUnitID);
        interstitialAd.setAdListener(new AdListener(this));
        interstitialAd.loadAd(adRequest);
    }

    public boolean isLoaded() {
        return interstitialAd != null && interstitialAd.isLoaded();
    }

    public void show() {
        if (isLoaded()) {
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
