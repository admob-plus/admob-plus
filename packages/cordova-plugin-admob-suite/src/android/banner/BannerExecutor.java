package admob.suite.banner;

import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;

import admob.suite.AbstractExecutor;
import admob.suite.AdMob;

public class BannerExecutor extends AbstractExecutor {
    /**
     * The adView to display to the user.
     */
    private AdView adView;

    public BannerExecutor(AdMob plugin) {
        super(plugin);
    }

    public boolean show(JSONArray args, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                showBanner();

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    @Override
    public void destroy() {
        if (adView != null) {
            adView.destroy();
            adView = null;
        }
    }


    private void showBanner() {
        if (adView == null) {

            adView = new AdView(plugin.cordova.getActivity());
            adView.setAdUnitId("ca-app-pub-3940256099942544/6300978111");
            adView.setAdSize(AdSize.SMART_BANNER);
            adView.setAdListener(new AdListener() {
                @Override
                public void onAdLoaded() {
                }

                @Override
                public void onAdFailedToLoad(int errorCode) {
                }

                @Override
                public void onAdOpened() {
                }

                @Override
                public void onAdLeftApplication() {
                }

                @Override
                public void onAdClosed() {
                }
            });

            FrameLayout layout = (FrameLayout) plugin.webView.getView().getParent();
            layout.addView(adView);
        }

        AdRequest adRequest = new AdRequest.Builder()
                .addTestDevice(AdRequest.DEVICE_ID_EMULATOR)
                .build();
        adView.loadAd(adRequest);
    }
}
