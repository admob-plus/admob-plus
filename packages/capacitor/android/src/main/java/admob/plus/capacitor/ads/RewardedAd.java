package admob.plus.capacitor.ads;

import androidx.annotation.NonNull;

import com.getcapacitor.PluginCall;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;

import admob.plus.capacitor.AdMobPlusPlugin;

public class RewardedAd extends AdBase {
    private com.google.android.gms.ads.rewarded.RewardedAd mRewardedAd = null;

    RewardedAd(int id, String adUnitID) {
        super(id, adUnitID);
    }

    public static RewardedAd getOrCreate(PluginCall call) {
        Integer id = call.getInt("id");
        RewardedAd rewardedAd = (RewardedAd) AdBase.getAd(id);
        if (rewardedAd == null) {
            rewardedAd = new RewardedAd(id, call.getString("adUnitId"));
        }
        return rewardedAd;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void load(AdMobPlusPlugin plugin, PluginCall call, AdRequest adRequest) {
        clear();

        com.google.android.gms.ads.rewarded.RewardedAd.load(plugin.getActivity(), adUnitId, adRequest, new RewardedAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mRewardedAd = null;
            }

            @Override
            public void onAdLoaded(@NonNull com.google.android.gms.ads.rewarded.RewardedAd rewardedAd) {
                mRewardedAd = rewardedAd;
                mRewardedAd.setFullScreenContentCallback(new FullScreenContentCallback(){
                    @Override
                    public void onAdShowedFullScreenContent() {
                        // Called when ad is shown.
                        mRewardedAd = null;
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        // Called when ad fails to show.
                    }

                    @Override
                    public void onAdDismissedFullScreenContent() {
                        // Called when ad is dismissed.
                        // Don't forget to set the ad reference to null so you
                        // don't show the ad a second time.
                    }
                });

            }
        });
    }

    public boolean isLoaded() {
        return mRewardedAd != null;
    }

    public void show(AdMobPlusPlugin plugin, PluginCall call) {
        if (!isLoaded()) {
            return;
        }

        mRewardedAd.show(plugin.getActivity(), new OnUserEarnedRewardListener() {
            @Override
            public void onUserEarnedReward(@NonNull RewardItem rewardItem) {
                // Handle the reward.
                int rewardAmount = rewardItem.getAmount();
                String rewardType = rewardItem.getType();
            }
        });

        call.resolve();
    }

    private void clear() {
        if (mRewardedAd != null) {
            mRewardedAd = null;
        }
    }
}
