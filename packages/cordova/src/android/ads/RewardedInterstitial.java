package admob.plugin.ads;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAd;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAdLoadCallback;

import org.json.JSONException;
import org.json.JSONObject;

import admob.plugin.ExecuteContext;
import admob.plugin.Generated.Events;

public class RewardedInterstitial extends AdBase {
    private RewardedInterstitialAd mAd = null;

    RewardedInterstitial(int id, String adUnitId) {
        super(id, adUnitId);
    }

    public static RewardedInterstitial getOrCreate(ExecuteContext ctx) {
        RewardedInterstitial rewarded = (RewardedInterstitial) ctx.getAd();
        if (rewarded == null) {
            rewarded = new RewardedInterstitial(ctx.optId(), ctx.getAdUnitID());
        }
        return rewarded;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    public void createAndLoad(ExecuteContext ctx) {
        AdRequest adRequest = ctx.buildAdRequest();

        clear();

        RewardedInterstitialAd.load(ctx.getActivity(), adUnitId, adRequest, new RewardedInterstitialAdLoadCallback() {
            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                mAd = null;
                ctx.plugin.emit(Events.REWARDED_INTERSTITIAL_LOAD_FAIL, loadAdError.toString());
                ctx.callbackContext.error(loadAdError.toString());
            }

            @Override
            public void onAdLoaded(@NonNull RewardedInterstitialAd rewardedAd) {
                mAd = rewardedAd;
                mAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        ctx.plugin.emit(Events.REWARDED_INTERSTITIAL_DISMISS);
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        ctx.plugin.emit(Events.REWARDED_INTERSTITIAL_SHOW_FAIL, adError.toString());
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        mAd = null;
                        ctx.plugin.emit(Events.REWARDED_INTERSTITIAL_SHOW);
                    }
                });

                ctx.plugin.emit(Events.REWARDED_INTERSTITIAL_LOAD);
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
                JSONObject data = new JSONObject();
                try {
                    data.put("amount", rewardItem.getAmount());
                    data.put("type", rewardItem.getType());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                ctx.plugin.emit(Events.REWARDED_INTERSTITIAL_REWARD, data);
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
