package admob.plugin.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;

import org.json.JSONException;
import org.json.JSONObject;

import admob.plugin.Action;
import admob.plugin.Generated.Events;

public class Rewarded extends AdBase {
    private RewardedAd mRewardedAd = null;

    Rewarded(int id, String adUnitId) {
        super(id, adUnitId);
    }

    public static Rewarded getOrCreate(Action action) {
        Rewarded rewarded = (Rewarded) action.getAd();
        if (rewarded == null) {
            rewarded = new Rewarded(action.optId(), action.getAdUnitID());
        }
        return rewarded;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void createAndLoad(AdRequest adRequest) {
        clear();

        RewardedAd.load(getActivity(), adUnitId, adRequest, new RewardedAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mRewardedAd = null;
                plugin.emit(Events.REWARDED_LOAD_FAIL, loadAdError.toString());
            }

            @Override
            public void onAdLoaded(@NonNull RewardedAd rewardedAd) {
                mRewardedAd = rewardedAd;
                mRewardedAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        plugin.emit(Events.REWARDED_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        plugin.emit(Events.REWARDED_SHOW_FAIL, adError.toString());
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        mRewardedAd = null;
                        plugin.emit(Events.REWARDED_SHOW);
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
        if (isLoaded()) {
            mRewardedAd.show(getActivity(), rewardItem -> {
                JSONObject data = new JSONObject();
                try {
                    data.put("amount", rewardItem.getAmount());
                    data.put("type", rewardItem.getType());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                plugin.emit(Events.REWARDED_REWARD, data);
            });
        }
    }

    private void clear() {
        if (mRewardedAd != null) {
            mRewardedAd = null;
        }
    }
}
