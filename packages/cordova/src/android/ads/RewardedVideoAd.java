package admob.plugin.ads;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.reward.RewardItem;
import com.google.android.gms.ads.reward.RewardedVideoAdListener;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import admob.plugin.Events;

public class RewardedVideoAd extends AdBase {
    private com.google.android.gms.ads.reward.RewardedVideoAd rewardedVideoAd = null;

    RewardedVideoAd(int id) {
        super(id);
    }

    public static boolean executeIsReadyAction(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        final int id = opts.optInt("id");

        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RewardedVideoAd rewardedVideoAd = getAd(id);

                PluginResult result = new PluginResult(PluginResult.Status.OK, rewardedVideoAd != null && rewardedVideoAd.isReady());
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public static boolean executeLoadAction(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        final String adUnitID = opts.optString("adUnitID");

        final RewardedVideoAd rewardedVideoAd = getOrCreate(opts);
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                rewardedVideoAd.createAndLoad(adUnitID);

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public static boolean executeShowAction(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        final int id = opts.optInt("id");

        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RewardedVideoAd rewardedVideoAd = getAd(id);
                if (rewardedVideoAd != null) {
                    rewardedVideoAd.show();
                }

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    @Override
    public void destroy() {
        clear();

        super.destroy();
    }

    private static RewardedVideoAd getAd(int id) {
        AdBase ad = AdBase.getAd(id);
        return (ad != null) ? (RewardedVideoAd) ad : null;
    }

    private static RewardedVideoAd getOrCreate(JSONObject opts) {
        int id = opts.optInt("id");
        RewardedVideoAd ad = getAd(id);
        return (ad != null) ? ad : new RewardedVideoAd(id);
    }

    private void createAndLoad(String adUnitID) {
        clear();

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
        AdRequest adRequest = createAdRequestBuilder().build();
        rewardedVideoAd.loadAd(adUnitID, adRequest);
    }

    private boolean isReady() {
        return rewardedVideoAd != null && rewardedVideoAd.isLoaded();
    }

    private void show() {
        if (isReady()) {
            rewardedVideoAd.show();
        }
    }

    private void clear() {
        if (rewardedVideoAd != null) {
            rewardedVideoAd.setRewardedVideoAdListener(null);
            rewardedVideoAd = null;
        }
    }
}
