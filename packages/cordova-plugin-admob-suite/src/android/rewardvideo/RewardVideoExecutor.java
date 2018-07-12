package admob.suite.rewardvideo;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.reward.RewardItem;
import com.google.android.gms.ads.reward.RewardedVideoAd;
import com.google.android.gms.ads.reward.RewardedVideoAdListener;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import admob.suite.AbstractExecutor;
import admob.suite.AdMob;
import admob.suite.Events;

public class RewardVideoExecutor extends AbstractExecutor {
    private RewardedVideoAd rewardedVideoAd;

    public RewardVideoExecutor(AdMob plugin) {
        super(plugin);
    }

    @Override
    public void destroy() {
        clearRewardedVideoAd();

        super.destroy();
    }

    public boolean prepare(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        String adUnitID = opts.optString("adUnitID");

        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                createAndLoadRewardedVideo(adUnitID);

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    private void createAndLoadRewardedVideo(String adUnitID) {
        clearRewardedVideoAd();

        rewardedVideoAd = MobileAds.getRewardedVideoAdInstance(plugin.cordova.getActivity());
        rewardedVideoAd.setRewardedVideoAdListener(new RewardedVideoAdListener() {
            @Override
            public void onRewardedVideoAdLoaded() {
                plugin.emit(Events.REWARD_VIDEO_LOAD);
            }

            @Override
            public void onRewardedVideoAdOpened() {
                plugin.emit(Events.REWARD_VIDEO_OPEN);
            }

            @Override
            public void onRewardedVideoStarted() {
                plugin.emit(Events.REWARD_VIDEO_START);
            }

            @Override
            public void onRewardedVideoAdClosed() {
                plugin.emit(Events.REWARD_VIDEO_CLOSE);
            }

            @Override
            public void onRewarded(RewardItem rewardItem) {
                plugin.emit(Events.REWARD_VIDEO_REWARD);
            }

            @Override
            public void onRewardedVideoAdLeftApplication() {
                plugin.emit(Events.REWARD_VIDEO_EXIT_APP);
            }

            @Override
            public void onRewardedVideoAdFailedToLoad(int i) {
                plugin.emit(Events.REWARD_VIDEO_LOAD_FAIL);
            }

            @Override
            public void onRewardedVideoCompleted() {
                plugin.emit(Events.REWARD_VIDEO_COMPLETE);
            }
        });
        rewardedVideoAd.loadAd(adUnitID, new AdRequest.Builder().build());
    }

    private void clearRewardedVideoAd() {
        if (rewardedVideoAd != null) {
            rewardedVideoAd.setRewardedVideoAdListener(null);
            rewardedVideoAd = null;
        }
    }
}
