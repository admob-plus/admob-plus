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

public class Rewarded extends AdBase {
    private RewardedAd mAd = null;

    Rewarded(int id, String adUnitId) {
        super(id, adUnitId);
    }

    public static Rewarded getOrCreate(ExecuteContext ctx) {
        Rewarded rewarded = (Rewarded) ctx.optAd();
        if (rewarded == null) {
            rewarded = new Rewarded(ctx.optId(), ctx.optAdUnitID());
        }
        return rewarded;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void load(ExecuteContext ctx) {
        AdRequest adRequest = ctx.buildAdRequest();

        clear();

        RewardedAd.load(ctx.getActivity(), adUnitId, adRequest, new RewardedAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mAd = null;
                emit(ctx, Events.REWARDED_LOAD_FAIL, loadAdError);
                ctx.callbackContext.error(loadAdError.toString());
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
                        emit(ctx, Events.REWARDED_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        emit(ctx, Events.REWARDED_SHOW_FAIL, adError);
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        mAd = null;
                        emit(ctx, Events.REWARDED_SHOW);
                    }
                });

                emit(ctx, Events.REWARDED_LOAD);
                ctx.callbackContext.success();
            }
        });
    }

    public boolean isLoaded() {
        return mAd != null;
    }

    public void show(ExecuteContext ctx) {
        if (isLoaded()) {
            mAd.show(ctx.getActivity(), rewardItem -> {
                emit(ctx, Events.REWARDED_REWARD, rewardItem);
            });
            ctx.callbackContext.success();
        } else {
            ctx.callbackContext.error("Ad is not loaded");
        }
    }

    private void clear() {
        if (mAd != null) {
            mAd = null;
        }
    }
}
