package admob.plus.rn.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAd;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAdLoadCallback;

import admob.plus.core.Context;
import admob.plus.core.GenericAd;
import admob.plus.rn.ExecuteContext;
import admob.plus.rn.Generated.Events;

public class RewardedInterstitial extends AdBase implements GenericAd {
    private RewardedInterstitialAd mAd = null;
    private ServerSideVerificationOptions ssv = null;

    public RewardedInterstitial(ExecuteContext ctx) {
        super(ctx);

        this.ssv = ctx.optServerSideVerificationOptions();
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    @Override
    public void load(Context ctx) {
        clear();

        RewardedInterstitialAd.load(getAdapter().getActivity(), adUnitId, ctx.optAdRequest(), new RewardedInterstitialAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                emit(Events.AD_LOAD_FAIL, loadAdError);
                ctx.reject(loadAdError);
            }

            @Override
            public void onAdLoaded(@NonNull RewardedInterstitialAd rewardedAd) {
                mAd = rewardedAd;
                if (ssv != null) {
                    mAd.setServerSideVerificationOptions(ssv);
                }
                mAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        clear();
                        emit(Events.AD_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        clear();
                        emit(Events.AD_SHOW_FAIL, adError);
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        emit(Events.AD_SHOW);
                    }

                    @Override
                    public void onAdImpression() {
                        emit(Events.AD_IMPRESSION);
                    }
                });

                emit(Events.AD_LOAD);
                ctx.resolve();
            }
        });
    }

    @Override
    public boolean isLoaded() {
        return mAd != null;
    }

    @Override
    public void show(Context ctx) {
        mAd.show(getAdapter().getActivity(), rewardItem -> {
            emit(Events.AD_REWARD, rewardItem);
        });
        ctx.resolve();
    }

    private void clear() {
        if (mAd != null) {
            mAd = null;
        }
    }
}
