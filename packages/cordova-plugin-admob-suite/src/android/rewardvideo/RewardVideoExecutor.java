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

            }

            @Override
            public void onRewardedVideoAdOpened() {

            }

            @Override
            public void onRewardedVideoStarted() {

            }

            @Override
            public void onRewardedVideoAdClosed() {

            }

            @Override
            public void onRewarded(RewardItem rewardItem) {

            }

            @Override
            public void onRewardedVideoAdLeftApplication() {

            }

            @Override
            public void onRewardedVideoAdFailedToLoad(int i) {

            }

            @Override
            public void onRewardedVideoCompleted() {

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
