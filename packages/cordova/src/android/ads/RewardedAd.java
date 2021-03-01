package admob.plugin.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;

import admob.plugin.Action;
import admob.plugin.Generated.Events;

public class RewardedAd extends AdBase {
    private com.google.android.gms.ads.rewarded.RewardedAd mRewardedAd = null;

    RewardedAd(int id, String adUnitId) {
        super(id, adUnitId);
    }

    public static RewardedAd getOrCreate(Action action) {
        RewardedAd rewardedAd = (RewardedAd) action.getAd();
        if (rewardedAd == null) {
            rewardedAd = new RewardedAd(action.optId(), action.getAdUnitID());
        }
        return rewardedAd;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void createAndLoad(AdRequest adRequest) {
        clear();

        com.google.android.gms.ads.rewarded.RewardedAd.load(getActivity(), adUnitId, adRequest, new RewardedAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mRewardedAd = null;
                plugin.emit(Events.REWARDED_LOAD_FAIL, buildErrorPayload(loadAdError.getCode()));
            }

            @Override
            public void onAdLoaded(@NonNull com.google.android.gms.ads.rewarded.RewardedAd rewardedAd) {
                mRewardedAd = rewardedAd;
                mRewardedAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdShowedFullScreenContent() {
                        mRewardedAd = null;
                        plugin.emit(Events.REWARDED_OPEN);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        plugin.emit(Events.REWARDED_SHOW_FAIL, buildErrorPayload(adError.getCode()));
                    }

                    @Override
                    public void onAdDismissedFullScreenContent() {
                        plugin.emit(Events.REWARDED_CLOSE);
                    }
                });
                plugin.emit(Events.REWARDED_LOAD);
            }
        });
    }

    public boolean isLoaded() {
        return mRewardedAd != null;
    }

    public void show() {
        if (!isLoaded()) {
            return;
        }
        mRewardedAd.show(getActivity(), new OnUserEarnedRewardListener() {
            @Override
            public void onUserEarnedReward(@NonNull RewardItem rewardItem) {
                int rewardAmount = rewardItem.getAmount();
                String rewardType = rewardItem.getType();
                plugin.emit(Events.REWARDED_REWARD);
            }
        });
    }

    private void clear() {
        if (mRewardedAd != null) {
            mRewardedAd = null;
        }
    }
}
