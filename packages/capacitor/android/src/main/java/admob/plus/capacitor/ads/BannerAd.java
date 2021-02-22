package admob.plus.capacitor.ads;

import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.LinearLayout;

import com.getcapacitor.PluginCall;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;

import admob.plus.capacitor.AdMobPlusPlugin;

public class BannerAd extends AdBase {
    private static ViewGroup parentView;
    private final AdSize adSize;
    private final int gravity;
    private AdView adView;

    BannerAd(int id, String adUnitId, AdSize adSize, int gravity) {
        super(id, adUnitId);

        this.adSize = adSize;
        this.gravity = gravity;
    }

    public static BannerAd getOrCreate(PluginCall call) {
        Integer id = call.getInt("id");
        BannerAd bannerAd = (BannerAd) AdBase.getAd(id);
        if (bannerAd != null) {
            return bannerAd;
        }
        return new BannerAd(
                id,
                call.getString("adUnitId"),
                AdSize.SMART_BANNER,
                "top".equals(call.getString("position")) ? Gravity.TOP : Gravity.BOTTOM
        );
    }

    public void show(AdMobPlusPlugin plugin, PluginCall call, AdRequest adRequest) {
        WebView webView = plugin.getBridge().getWebView();

        if (adView == null) {
            adView = new AdView(plugin.getActivity());
            adView.setAdUnitId(adUnitId);
            adView.setAdSize(adSize);
            adView.setAdListener(new AdListener() {
                @Override
                public void onAdClicked() {

                }

                @Override
                public void onAdClosed() {

                }

                @Override
                public void onAdFailedToLoad(LoadAdError error) {

                }

                @Override
                public void onAdImpression() {

                }

                @Override
                public void onAdLoaded() {

                }

                @Override
                public void onAdOpened() {

                }
            });

            addBannerView(plugin, adView);
        } else if (adView.getVisibility() == View.GONE) {
            adView.resume();
            adView.setVisibility(View.VISIBLE);
        } else {
            ViewGroup wvParentView = (ViewGroup) webView.getParent();
            if (parentView != wvParentView) {
                parentView.removeAllViews();
                if (parentView.getParent() != null) {
                    ((ViewGroup) parentView.getParent()).removeView(parentView);
                }
                addBannerView(plugin, adView);
            }
        }

        adView.loadAd(adRequest);

        call.resolve();
    }

    public void hide(AdMobPlusPlugin plugin, PluginCall call) {
        if (adView != null) {
            adView.pause();
            adView.setVisibility(View.GONE);
        }

        call.resolve();
    }

    @Override
    public void destroy() {
        if (adView != null) {
            adView.destroy();
            adView = null;
        }

        super.destroy();
    }

    private void addBannerView(AdMobPlusPlugin plugin, AdView adView) {
        WebView webView = plugin.getBridge().getWebView();
        ViewGroup wvParentView = (ViewGroup) webView.getParent();
        if (parentView == null) {
            parentView = new LinearLayout(webView.getContext());
        }

        if (wvParentView != null && wvParentView != parentView) {
            wvParentView.removeView(webView);
            LinearLayout content = (LinearLayout) parentView;
            content.setOrientation(LinearLayout.VERTICAL);
            parentView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 0.0F));
            webView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 1.0F));
            parentView.addView(webView);
            wvParentView.addView(parentView);
        }

        if (gravity == Gravity.TOP) {
            parentView.addView(adView, 0);
        } else {
            parentView.addView(adView);
        }
        parentView.bringToFront();
        parentView.requestLayout();
        parentView.requestFocus();
    }
}
