package admob.plus.capacitor.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAd;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAdLoadCallback;

import admob.plus.capacitor.ExecuteContext;
import admob.plus.capacitor.Generated.Events;
import admob.plus.core.Context;
import admob.plus.core.GenericAd;

public class RewardedInterstitial extends AdBase implements GenericAd {
    private RewardedInterstitialAd mAd = null;

    public RewardedInterstitial(ExecuteContext ctx) {
        super(ctx);
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void load(Context ctx) {
        clear();

        RewardedInterstitialAd.load(getActivity(), adUnitId, ctx.optAdRequest(), new RewardedInterstitialAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                clear();
                emit(Events.REWARDED_INTERSTITIAL_LOAD_FAIL, loadAdError);
                ctx.reject(loadAdError);
            }

            @Override
            public void onAdLoaded(@NonNull RewardedInterstitialAd rewardedAd) {
                mAd = rewardedAd;
                ServerSideVerificationOptions ssv = ctx.optServerSideVerificationOptions();
                if (ssv != null) {
                    mAd.setServerSideVerificationOptions(ssv);
                }
                mAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        clear();
                        emit(Events.REWARDED_INTERSTITIAL_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        emit(Events.REWARDED_INTERSTITIAL_SHOW_FAIL, adError);
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        emit(Events.REWARDED_INTERSTITIAL_SHOW);
                    }

                    @Override
                    public void onAdImpression() {
                        emit(Events.REWARDED_INTERSTITIAL_IMPRESSION);
                    }
                });

                emit(Events.REWARDED_INTERSTITIAL_LOAD);
                ctx.resolve();
            }
        });
    }

    public boolean isLoaded() {
        return mAd != null;
    }

    public void show(Context ctx) {
        mAd.show(getActivity(), rewardItem -> {
            emit(Events.REWARDED_INTERSTITIAL_REWARD, rewardItem);
        });
        ctx.resolve();
    }

    private void clear() {
        if (mAd != null) {
            mAd.setFullScreenContentCallback(null);
            mAd = null;
        }
    }
}
