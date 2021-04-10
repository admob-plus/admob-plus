package admob.plugin.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;

import admob.plugin.ExecuteContext;
import admob.plugin.Generated.Events;

public class Rewarded extends AdBase implements IAdIsLoaded, IAdLoad, IAdShow {
    private RewardedAd mAd = null;

    public Rewarded(ExecuteContext ctx) {
        super(ctx);
    }

    @Override
    public void onDestroy() {
        clear();

        super.onDestroy();
    }

    public void load(ExecuteContext ctx) {
        AdRequest adRequest = ctx.optAdRequest();

        clear();

        RewardedAd.load(ctx.getActivity(), adUnitId, adRequest, new RewardedAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mAd = null;
                emit(Events.REWARDED_LOAD_FAIL, loadAdError);
                ctx.error(loadAdError.toString());
            }

            @Override
            public void onAdLoaded(@NonNull RewardedAd rewardedAd) {
                mAd = rewardedAd;
                ServerSideVerificationOptions ssv = ctx.optServerSideVerificationOptions();
                if (ssv != null) {
                    mAd.setServerSideVerificationOptions(ssv);
                }
                mAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        emit(Events.REWARDED_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        emit(Events.REWARDED_SHOW_FAIL, adError);
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        mAd = null;
                        emit(Events.REWARDED_SHOW);
                    }

                    @Override
                    public void onAdImpression() {
                        emit(Events.REWARDED_IMPRESSION);
                    }
                });

                emit(Events.REWARDED_LOAD);
                ctx.success();
            }
        });
    }

    public boolean isLoaded() {
        return mAd != null;
    }

    public void show(ExecuteContext ctx) {
        if (isLoaded()) {
            mAd.show(ctx.getActivity(), rewardItem -> {
                emit(Events.REWARDED_REWARD, rewardItem);
            });
            ctx.success();
        } else {
            ctx.error("Ad is not loaded");
        }
    }

    private void clear() {
        if (mAd != null) {
            mAd = null;
        }
    }
}
