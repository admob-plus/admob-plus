package admob.plus.capacitor;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.InterstitialAd;


public class Interstitial extends Ad {
    private InterstitialAd interstitial = null;

    Interstitial(int id, AdmobPlus plugin) {
        super(id, plugin);
    }

    @Override
    String getAdType() {
        return "interstitial";
    }

    @Override
    void remove() {
        if (interstitial != null) {
            interstitial.setAdListener(null);
            interstitial = null;
        }

        super.remove();
    }

    void load(String adUnitId, AdRequest adRequest) {
        interstitial = new InterstitialAd(plugin.getContext());
        interstitial.setAdUnitId(adUnitId);
        interstitial.setAdListener(new Ad.Listener(this));
        interstitial.loadAd(adRequest);
    }

    Boolean isLoaded() {
        return interstitial != null && interstitial.isLoaded();
    }

    void show() {
        if (isLoaded()) {
            interstitial.show();
        }
    }
}
