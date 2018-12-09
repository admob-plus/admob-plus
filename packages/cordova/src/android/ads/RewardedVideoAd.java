package admob.plugin.ads;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.reward.RewardItem;
import com.google.android.gms.ads.reward.RewardedVideoAdListener;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;

import admob.plugin.Action;
import admob.plugin.Events;

public class RewardedVideoAd extends AdBase {
    private com.google.android.gms.ads.reward.RewardedVideoAd rewardedVideoAd = null;

    RewardedVideoAd(int id, String adUnitID) {
        super(id, adUnitID);
    }

    public static boolean executeIsReadyAction(Action action, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RewardedVideoAd rewardedVideoAd = (RewardedVideoAd) action.getAd();

                PluginResult result = new PluginResult(PluginResult.Status.OK, rewardedVideoAd != null && rewardedVideoAd.isReady());
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public static boolean executeLoadAction(Action action, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RewardedVideoAd rewardedVideoAd = (RewardedVideoAd) action.getAd();
                if (rewardedVideoAd == null) {
                    rewardedVideoAd = new RewardedVideoAd(action.optId(), action.getAdUnitID());
                }
                rewardedVideoAd.createAndLoad(action.buildAdRequest());

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public static boolean executeShowAction(Action action, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                RewardedVideoAd rewardedVideoAd = (RewardedVideoAd) action.getAd();
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

    @Override
    String getLoadedEvent() {
        return Events.REWARD_VIDEO_LOAD;
    }

    @Override
    String getFailedToLoadEvent() {
        return Events.REWARD_VIDEO_LOAD_FAIL;
    }

    @Override
    String getOpenedEvent() {
        return Events.REWARD_VIDEO_OPEN;
    }

    @Override
    String getClosedEvent() {
        return Events.REWARD_VIDEO_CLOSE;
    }

    @Override
    String getLeftApplicationEvent() {
        return Events.REWARD_VIDEO_EXIT_APP;
    }

    private void createAndLoad(AdRequest adRequest) {
        clear();

        rewardedVideoAd = MobileAds.getRewardedVideoAdInstance(plugin.cordova.getActivity());
        rewardedVideoAd.setRewardedVideoAdListener(new RewardedVideoAdListener() {
            @Override
            public void onRewardedVideoAdLoaded() {
                plugin.emit(getLoadedEvent());
            }

            @Override
            public void onRewardedVideoAdOpened() {
                plugin.emit(getOpenedEvent());
            }

            @Override
            public void onRewardedVideoStarted() {
                plugin.emit(Events.REWARD_VIDEO_START);
            }

            @Override
            public void onRewardedVideoAdClosed() {
                plugin.emit(getClosedEvent());
            }

            @Override
            public void onRewarded(RewardItem rewardItem) {
                plugin.emit(Events.REWARD_VIDEO_REWARD);
            }

            @Override
            public void onRewardedVideoAdLeftApplication() {
                plugin.emit(getLeftApplicationEvent());
            }

            @Override
            public void onRewardedVideoAdFailedToLoad(int errorCode) {
                plugin.emit(getFailedToLoadEvent(), buildErrorPayload(errorCode));
            }

            @Override
            public void onRewardedVideoCompleted() {
                plugin.emit(Events.REWARD_VIDEO_COMPLETE);
            }
        });
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
