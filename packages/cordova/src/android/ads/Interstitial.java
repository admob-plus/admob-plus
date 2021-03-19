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

public class Interstitial extends AdBase implements IAdIsLoaded, IAdLoad, IAdShow {
    private InterstitialAd mAd = null;

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
        AdRequest adRequest = ctx.optAdRequest();
        String adUnitId = ctx.optAdUnitID();

        clear();

        InterstitialAd.load(ctx.getActivity(), adUnitId, adRequest, new InterstitialAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull InterstitialAd interstitialAd) {
                mAd = interstitialAd;
                mAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        emit(Events.INTERSTITIAL_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        emit(Events.INTERSTITIAL_SHOW_FAIL, adError);
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        mAd = null;
                        emit(Events.INTERSTITIAL_SHOW);
                    }

                    @Override
                    public void onAdImpression() {
                        emit(Events.INTERSTITIAL_IMPRESSION);
                    }
                });

                emit(Events.INTERSTITIAL_LOAD);
                ctx.callbackContext.success();
            }

            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mAd = null;
                emit(Events.INTERSTITIAL_LOAD_FAIL, loadAdError);
                ctx.callbackContext.error(loadAdError.toString());
            }
        });
    }

    public boolean isLoaded() {
        return mAd != null;
    }

    public void show(ExecuteContext ctx) {
        if (isLoaded()) {
            mAd.show(ctx.getActivity());
            ctx.callbackContext.success();
        } else {
            ctx.callbackContext.error("Ad is not loaded");
        }
    }

    private void clear() {
        if (mAd != null) {
            mAd.setFullScreenContentCallback(null);
            mAd = null;
        }
    }
}
