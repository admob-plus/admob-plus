package admob.plugin.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

import admob.plugin.ExecuteContext;
import admob.plugin.Generated.Events;

public class Interstitial extends AdBase {
    private InterstitialAd mInterstitialAd = null;

    Interstitial(int id, String adUnitId) {
        super(id, adUnitId);
    }

    public static Interstitial getOrCreate(ExecuteContext ctx) {
        Interstitial interstitial = (Interstitial) ctx.optAd();
        if (interstitial == null) {
            interstitial = new Interstitial(ctx.optId(), ctx.optAdUnitID());
        }
        return interstitial;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void load(ExecuteContext ctx) {
        AdRequest adRequest = ctx.buildAdRequest();
        String adUnitId = ctx.optAdUnitID();

        clear();

        InterstitialAd.load(ctx.getActivity(), adUnitId, adRequest, new InterstitialAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull InterstitialAd interstitialAd) {
                mInterstitialAd = interstitialAd;
                mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        emit(ctx, Events.INTERSTITIAL_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        emit(ctx, Events.INTERSTITIAL_SHOW_FAIL, adError);
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        mInterstitialAd = null;
                        emit(ctx, Events.INTERSTITIAL_SHOW);
                    }
                });

                emit(ctx, Events.INTERSTITIAL_LOAD);
                ctx.callbackContext.success();
            }

            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mInterstitialAd = null;
                emit(ctx, Events.INTERSTITIAL_LOAD_FAIL, loadAdError);
                ctx.callbackContext.error(loadAdError.toString());
            }
        });
    }

    public boolean isLoaded() {
        return mInterstitialAd != null;
    }

    public void show(ExecuteContext ctx) {
        if (isLoaded()) {
            mInterstitialAd.show(ctx.getActivity());
            ctx.callbackContext.success();
        } else {
            ctx.callbackContext.error("Ad is not loaded");
        }
    }

    private void clear() {
        if (mInterstitialAd != null) {
            mInterstitialAd.setFullScreenContentCallback(null);
            mInterstitialAd = null;
        }
    }
}
