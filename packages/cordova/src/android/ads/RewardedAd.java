package admob.plugin.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewarded.RewardedAdCallback;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;

import admob.plugin.Action;
import admob.plugin.Generated.Events;

public class RewardedAd extends AdBase {
    private com.google.android.gms.ads.rewarded.RewardedAd rewardedAd = null;

    RewardedAd(int id, String adUnitID) {
        super(id, adUnitID);
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

        rewardedAd = new com.google.android.gms.ads.rewarded.RewardedAd(getActivity(), this.adUnitID);
        rewardedAd.loadAd(adRequest, new RewardedAdLoadCallback() {
            @Override
            public void onRewardedAdLoaded() {
                plugin.emit(Events.REWARDED_LOAD);
            }

            @Override
            public void onRewardedAdFailedToLoad(LoadAdError adError) {
                plugin.emit(Events.REWARDED_LOAD_FAIL, buildErrorPayload(adError.getCode()));
            }
        });
    }

    public boolean isLoaded() {
        return rewardedAd != null && rewardedAd.isLoaded();
    }

    public void show() {
        if (!isLoaded()) {
            return;
        }
        rewardedAd.show(getActivity(), new RewardedAdCallback() {
            @Override
            public void onRewardedAdOpened() {
                plugin.emit(Events.REWARDED_OPEN);
            }

            @Override
            public void onRewardedAdClosed() {
                plugin.emit(Events.REWARDED_CLOSE);
            }

            @Override
            public void onUserEarnedReward(@NonNull RewardItem reward) {
                plugin.emit(Events.REWARDED_REWARD);
            }

            @Override
            public void onRewardedAdFailedToShow(AdError adError) {
                plugin.emit(Events.REWARDED_SHOW_FAIL, buildErrorPayload(adError.getCode()));
            }
        });
    }

    private void clear() {
        if (rewardedAd != null) {
            rewardedAd = null;
        }
    }
}
