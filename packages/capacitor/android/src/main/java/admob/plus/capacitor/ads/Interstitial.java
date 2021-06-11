package admob.plus.capacitor.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

import admob.plus.capacitor.ExecuteContext;
import admob.plus.capacitor.Generated.Events;
import admob.plus.core.Context;
import admob.plus.core.GenericAd;

public class Interstitial extends AdBase implements GenericAd {
    private InterstitialAd mAd = null;

    public Interstitial(ExecuteContext ctx) {
        super(ctx);
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void load(Context ctx) {
        clear();

        InterstitialAd.load(getActivity(), adUnitId, ctx.optAdRequest(), new InterstitialAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull InterstitialAd interstitialAd) {
                mAd = interstitialAd;

                mAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        clear();
                        emit(Events.INTERSTITIAL_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        emit(Events.INTERSTITIAL_SHOW_FAIL, adError);
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        emit(Events.INTERSTITIAL_SHOW);
                    }

                    @Override
                    public void onAdImpression() {
                        emit(Events.INTERSTITIAL_IMPRESSION);
                    }
                });

                emit(Events.INTERSTITIAL_LOAD);
                ctx.resolve();
            }

            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                clear();
                emit(Events.INTERSTITIAL_LOAD_FAIL, loadAdError);
                ctx.reject(loadAdError.getMessage());
            }
        });
    }

    public boolean isLoaded() {
        return mAd != null;
    }

    public void show(Context ctx) {
        mAd.show(getActivity());
        ctx.resolve();
   }

    private void clear() {
        if (mAd != null) {
            mAd.setFullScreenContentCallback(null);
            mAd = null;
        }
    }
}
