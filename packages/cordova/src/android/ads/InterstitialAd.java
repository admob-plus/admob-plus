package admob.plugin.ads;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.LoadAdError;

import admob.plugin.Action;
import admob.plugin.Generated.Events;

public class InterstitialAd extends AdBase {
    private com.google.android.gms.ads.InterstitialAd interstitialAd = null;

    InterstitialAd(int id, String adUnitId) {
        super(id, adUnitId);
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

    public void load(AdRequest adRequest, String adUnitId) {
        clear();

        interstitialAd = new com.google.android.gms.ads.InterstitialAd(getActivity());
        interstitialAd.setAdUnitId(adUnitId);
        interstitialAd.setAdListener(new AdListener() {
            @Override
            public void onAdClicked() {
                plugin.emit(Events.INTERSTITIAL_CLICK);
            }

            @Override
            public void onAdClosed() {
                plugin.emit(Events.INTERSTITIAL_CLOSE);
            }

            @Override
            public void onAdFailedToLoad(LoadAdError error) {
                plugin.emit(Events.INTERSTITIAL_LOAD_FAIL, buildErrorPayload(error.getCode()));
            }

            @Override
            public void onAdImpression() {
                plugin.emit(Events.INTERSTITIAL_IMPRESSION);
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
