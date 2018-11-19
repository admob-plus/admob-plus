package admob.plugin.banner;

import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import admob.plugin.AbstractExecutor;
import admob.plugin.AdMob;
import admob.plugin.Events;

public class BannerExecutor extends AbstractExecutor {
    /**
     * The adView to display to the user.
     */
    private AdView adView;

    private ViewGroup parentView;

    public BannerExecutor(AdMob plugin) {
        super(plugin);
    }

    public boolean show(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        String adUnitID = opts.optString("adUnitID");

        String finalAdUnitID = adUnitID;
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                showBanner(finalAdUnitID);

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public boolean hide(JSONArray args, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (adView != null) {
                    adView.pause();
                    adView.setVisibility(View.GONE);
                }

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

    private void showBanner(String adUnitID) {
        if (adView == null) {
            adView = new AdView(plugin.cordova.getActivity());
            adView.setAdUnitId(adUnitID);
            adView.setAdSize(AdSize.SMART_BANNER);
            adView.setAdListener(new AdListener() {
                @Override
                public void onAdLoaded() {
                    plugin.emit(Events.BANNER_LOAD);
                }

                @Override
                public void onAdFailedToLoad(int errorCode) {
                    plugin.emit(Events.BANNER_LOAD_FAIL);
                }

                @Override
                public void onAdOpened() {
                    plugin.emit(Events.BANNER_OPEN);
                }

                @Override
                public void onAdClosed() {
                    plugin.emit(Events.BANNER_CLOSE);
                }

                @Override
                public void onAdLeftApplication() {
                    plugin.emit(Events.BANNER_EXIT_APP);
                }
            });

           addBannerView(adView);
        } else if (adView.getVisibility() == View.GONE) {
            adView.resume();
            adView.setVisibility(View.VISIBLE);
        }

        AdRequest adRequest = createAdRequestBuilder().build();
        adView.loadAd(adRequest);
    }

    private void addBannerView(AdView adView) {
       View view = plugin.webView.getView();
       ViewGroup wvParentView = (ViewGroup) view.getParent();
       if (parentView == null) {
           parentView = new LinearLayout(plugin.webView.getContext());
       }

       if (wvParentView != null && wvParentView != parentView) {
           ViewGroup rootView = (ViewGroup)(view.getParent());
           wvParentView.removeView(view);
           ((LinearLayout) parentView).setOrientation(LinearLayout.VERTICAL);
           parentView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 0.0F));
           view.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 1.0F));
           parentView.addView(view);
           rootView.addView(parentView);
       }

       parentView.addView(adView);
       parentView.bringToFront();
       parentView.requestLayout();
       parentView.requestFocus();
    }
}
