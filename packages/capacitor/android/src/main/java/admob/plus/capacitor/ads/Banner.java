package admob.plus.capacitor.ads;

import android.annotation.SuppressLint;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.LinearLayout;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;

import java.util.Objects;

import admob.plus.capacitor.AdMobPlusPlugin;
import admob.plus.capacitor.ExecuteContext;
import admob.plus.capacitor.Generated.Events;
import admob.plus.core.Context;
import admob.plus.core.GenericAd;

import static admob.plus.capacitor.ExecuteContext.plugin;
import static admob.plus.core.Helper.getParentView;
import static admob.plus.core.Helper.removeFromParentView;

public class Banner extends AdBase implements GenericAd {
    @SuppressLint("StaticFieldLeak")
    private static ViewGroup parentView;
    private final AdSize adSize;
    private final int gravity;
    private AdView adView;

    public Banner(ExecuteContext ctx) {
        super(ctx);

        this.adSize = AdSize.SMART_BANNER;
        this.gravity = "top".equals(ctx.optPosition()) ? Gravity.TOP : Gravity.BOTTOM;
    }

    public boolean isLoaded() {
        return adView != null;
    }

    public void load(Context ctx) {
        if (adView == null) {
            adView = new AdView(getActivity());
            adView.setAdUnitId(adUnitId);
            adView.setAdSize(adSize);
            adView.setAdListener(new AdListener() {
                @Override
                public void onAdClicked() {
                    emit(Events.BANNER_CLICK);
                }

                @Override
                public void onAdClosed() {
                    emit(Events.BANNER_CLOSE);
                }

                @Override
                public void onAdFailedToLoad(LoadAdError error) {
                    emit(Events.BANNER_LOAD_FAIL, error);
                }

                @Override
                public void onAdImpression() {
                    emit(Events.BANNER_IMPRESSION);
                }

                @Override
                public void onAdLoaded() {
                    emit(Events.BANNER_LOAD);
                }

                @Override
                public void onAdOpened() {
                    emit(Events.BANNER_OPEN);
                }
            });
        }

        adView.loadAd(ctx.optAdRequest());
        ctx.resolve();
    }

    public void show(Context ctx) {
        Objects.requireNonNull(adView);

        WebView webView = plugin.getBridge().getWebView();

        if (getParentView(adView) == null) {
            addBannerView(plugin, adView);
        } else if (adView.getVisibility() == View.GONE) {
            adView.resume();
            adView.setVisibility(View.VISIBLE);
        } else {
            ViewGroup wvParentView = getParentView(webView);
            if (parentView != wvParentView) {
                parentView.removeAllViews();
                removeFromParentView(parentView);
                addBannerView(plugin, adView);
            }
        }

        ctx.resolve();
    }

    public void hide(Context ctx) {
        if (adView != null) {
            adView.pause();
            adView.setVisibility(View.GONE);
        }
        ctx.resolve();
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
