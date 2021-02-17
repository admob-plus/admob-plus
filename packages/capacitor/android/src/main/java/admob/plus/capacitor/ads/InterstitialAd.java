package admob.plus.capacitor.ads;

import androidx.annotation.NonNull;

import com.getcapacitor.PluginCall;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

import admob.plus.capacitor.AdMobPlusPlugin;

public class InterstitialAd extends AdBase {
    private com.google.android.gms.ads.interstitial.InterstitialAd mInterstitialAd = null;

    InterstitialAd(int id, String adUnitId) {
        super(id, adUnitId);
    }

    public static InterstitialAd getOrCreate(PluginCall call) {
        Integer id = call.getInt("id");
        InterstitialAd interstitialAd = (InterstitialAd) AdBase.getAd(id);
        if (interstitialAd == null) {
            interstitialAd = new InterstitialAd(id, call.getString("adUnitId"));
        }
        return interstitialAd;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void load(AdMobPlusPlugin plugin, PluginCall call, AdRequest adRequest) {
        clear();

        com.google.android.gms.ads.interstitial.InterstitialAd.load(plugin.getActivity(), adUnitId, adRequest, new InterstitialAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull com.google.android.gms.ads.interstitial.InterstitialAd interstitialAd) {
                mInterstitialAd = interstitialAd;

                mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        // Called when fullscreen content is dismissed.
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        // Called when fullscreen content failed to show.
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        // Called when fullscreen content is shown.
                        // Make sure to set your reference to null so you don't
                        // show it a second time.
                        mInterstitialAd = null;
                    }
                });

                call.resolve();
            }

            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mInterstitialAd = null;
                call.reject(loadAdError.getMessage());
            }
        });
    }

    public boolean isLoaded() {
        return mInterstitialAd != null;
    }

    public void show(AdMobPlusPlugin plugin, PluginCall call) {
        if (isLoaded()) {
            mInterstitialAd.show(plugin.getActivity());
        }
        call.resolve();
    }

    private void clear() {
        if (mInterstitialAd != null) {
            mInterstitialAd.setFullScreenContentCallback(null);
            mInterstitialAd = null;
        }
    }
}
