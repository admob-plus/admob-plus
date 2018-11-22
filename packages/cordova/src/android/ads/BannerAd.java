package admob.plugin.ads;

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

import admob.plugin.Events;

public class BannerAd extends AdBase {
    private AdView adView;
    private ViewGroup parentView;

    private String adUnitID;

    private BannerAd(int id, String adUnitID) {
        super(id);

        this.adUnitID = adUnitID;
    }

    public static boolean executeShowAction(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);

        final BannerAd bannerAd = getOrCreate(opts);
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                bannerAd.show();

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return false;
    }

    public static boolean executeHideAction(JSONArray args, CallbackContext callbackContext) {
        JSONObject opts = args.optJSONObject(0);
        final int id = opts.optInt("id");

        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BannerAd bannerAd = getAd(id);
                if (bannerAd != null) {
                    bannerAd.hide();
                }

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    private static BannerAd getAd(int id) {
        AdBase ad = AdBase.getAd(id);
        return (ad != null) ? (BannerAd) ad : null;
    }

    private static BannerAd getOrCreate(JSONObject opts) {
        int id = opts.optInt("id");
        String adUnitID = opts.optString("adUnitID");
        BannerAd ad = getAd(id);
        return (ad != null) ? ad : new BannerAd(id, adUnitID);
    }

    public void show() {
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

    public void hide() {
        if (adView != null) {
            adView.pause();
            adView.setVisibility(View.GONE);
        }
    }

    @Override
    public void destroy() {
        if (adView != null) {
            adView.destroy();
            adView = null;
        }

        super.destroy();
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
