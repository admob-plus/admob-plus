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
import org.json.JSONException;
import org.json.JSONObject;

import admob.plugin.Action;
import admob.plugin.Events;

public class BannerAd extends AdBase {
    private AdView adView;
    private ViewGroup parentView;
    private AdSize adSize;

    BannerAd(int id, String adUnitID, AdSize adSize) {
        super(id, adUnitID);
        this.adSize = adSize;
    }

    public static boolean executeShowAction(Action action, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BannerAd bannerAd = (BannerAd) action.getAd();
                if (bannerAd == null) {
                    bannerAd = new BannerAd(action.optId(), action.getAdUnitID(), action.getAdSize());
                }
                bannerAd.show(action.buildAdRequest());

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public static boolean executeHideAction(Action action, CallbackContext callbackContext) {
        plugin.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BannerAd bannerAd = (BannerAd) action.getAd();
                if (bannerAd != null) {
                    bannerAd.hide();
                }

                PluginResult result = new PluginResult(PluginResult.Status.OK, "");
                callbackContext.sendPluginResult(result);
            }
        });

        return true;
    }

    public void show(AdRequest adRequest) {
        if (adView == null) {
            adView = new AdView(plugin.cordova.getActivity());
            adView.setAdUnitId(adUnitID);
            adView.setAdSize(adSize);
            adView.setAdListener(new AdListener() {
                @Override
                public void onAdLoaded() {
                    plugin.emit(Events.BANNER_LOAD);
                }

                @Override
                public void onAdFailedToLoad(int errorCode) {
                    plugin.emit(Events.BANNER_LOAD_FAIL, buildErrorPayload(errorCode));
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
