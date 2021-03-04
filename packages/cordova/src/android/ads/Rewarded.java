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

import admob.plugin.ExecuteContext;
import admob.plugin.Generated.Events;

public class Rewarded extends AdBase {
    private RewardedAd mRewardedAd = null;

    Rewarded(int id, String adUnitId) {
        super(id, adUnitId);
    }

    public static Rewarded getOrCreate(ExecuteContext ctx) {
        Rewarded rewarded = (Rewarded) ctx.getAd();
        if (rewarded == null) {
            rewarded = new Rewarded(ctx.optId(), ctx.getAdUnitID());
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
                mRewardedAd = null;
                ctx.plugin.emit(Events.REWARDED_LOAD_FAIL, loadAdError.toString());
                ctx.callbackContext.error(loadAdError.toString());
            }

            @Override
            public void onAdLoaded(@NonNull RewardedAd rewardedAd) {
                mRewardedAd = rewardedAd;
                mRewardedAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        ctx.plugin.emit(Events.REWARDED_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        ctx.plugin.emit(Events.REWARDED_SHOW_FAIL, adError.toString());
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        mRewardedAd = null;
                        ctx.plugin.emit(Events.REWARDED_SHOW);
                    }
                });

                ctx.plugin.emit(Events.REWARDED_LOAD);
                ctx.callbackContext.success();
            }
        });
    }

    public boolean isLoaded() {
        return mRewardedAd != null;
    }

    public void show(ExecuteContext ctx) {
        if (isLoaded()) {
            mRewardedAd.show(ctx.getActivity(), rewardItem -> {
                JSONObject data = new JSONObject();
                try {
                    data.put("amount", rewardItem.getAmount());
                    data.put("type", rewardItem.getType());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                ctx.plugin.emit(Events.REWARDED_REWARD, data);
            });
            ctx.callbackContext.success();
        } else {
            ctx.callbackContext.error("Ad is not loaded");
        }
    }

    private void clear() {
        if (mRewardedAd != null) {
            mRewardedAd = null;
        }
    }
}
