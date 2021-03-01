package admob.plugin.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

import admob.plugin.Action;
import admob.plugin.Generated.Events;

public class InterstitialAd extends AdBase {
    private com.google.android.gms.ads.interstitial.InterstitialAd mInterstitialAd = null;

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

        com.google.android.gms.ads.interstitial.InterstitialAd.load(getActivity(), adUnitId, adRequest, new InterstitialAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull com.google.android.gms.ads.interstitial.InterstitialAd interstitialAd) {
                mInterstitialAd = interstitialAd;
                mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        plugin.emit(Events.INTERSTITIAL_CLOSE);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        // TODO
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        plugin.emit(Events.INTERSTITIAL_OPEN);
                        mInterstitialAd = null;
                    }
                });

                plugin.emit(Events.INTERSTITIAL_LOAD);
            }

            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mInterstitialAd = null;
                plugin.emit(Events.INTERSTITIAL_LOAD_FAIL, buildErrorPayload(loadAdError.getCode()));
            }
        });
    }

    public boolean isLoaded() {
        return mInterstitialAd != null;
    }

    public void show() {
        if (isLoaded()) {
            mInterstitialAd.show(getActivity());
        }
    }

    private void clear() {
        if (mInterstitialAd != null) {
            mInterstitialAd.setFullScreenContentCallback(null);
            mInterstitialAd = null;
        }
    }
}
