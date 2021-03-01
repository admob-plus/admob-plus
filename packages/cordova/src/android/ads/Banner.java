package admob.plugin.ads;

import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;

import org.json.JSONObject;

import admob.plugin.ExecuteContext;
import admob.plugin.Generated;
import admob.plugin.Generated.Events;

public class Banner extends AdBase {
    private static ViewGroup parentView;
    private final AdSize adSize;
    private final int gravity;
    private AdView adView;

    Banner(int id, String adUnitId, AdSize adSize, int gravity) {
        super(id, adUnitId);

        this.adSize = adSize;
        this.gravity = gravity;
    }

    public static Banner getOrCreate(ExecuteContext ctx) {
        Banner banner = (Banner) ctx.getAd();
        if (banner != null) {
            return banner;
        }
        return new Banner(
                ctx.optId(),
                ctx.getAdUnitID(),
                getAdSize(ctx),
                "top".equals(ctx.optPosition()) ? Gravity.TOP : Gravity.BOTTOM
        );
    }

    private static AdSize getAdSize(ExecuteContext ctx) {
        final String name = "size";
        if (!ctx.opts.has(name)) {
            return AdSize.SMART_BANNER;
        }
        AdSize adSize = Generated.AdSizeType.getAdSize(ctx.opts.opt(name));
        if (adSize != null) {
            return adSize;
        }
        JSONObject adSizeObj = ctx.opts.optJSONObject(name);
        if (adSizeObj == null) {
            return AdSize.SMART_BANNER;
        }
        return new AdSize(adSizeObj.optInt("width"), adSizeObj.optInt("height"));
    }

    public void show(ExecuteContext ctx) {
        AdRequest adRequest = ctx.buildAdRequest();

        if (adView == null) {
            adView = new AdView(ctx.getActivity());
            adView.setAdUnitId(adUnitId);
            adView.setAdSize(adSize);
            adView.setAdListener(new AdListener() {
                @Override
                public void onAdClicked() {
                    plugin.emit(Events.BANNER_CLICK);
                }

                @Override
                public void onAdClosed() {
                    plugin.emit(Events.BANNER_CLOSE);
                }

                @Override
                public void onAdFailedToLoad(LoadAdError error) {
                    plugin.emit(Events.BANNER_LOAD_FAIL, error.toString());
                }

                @Override
                public void onAdImpression() {
                    plugin.emit(Events.BANNER_IMPRESSION);
                }

                @Override
                public void onAdLoaded() {
                    plugin.emit(Events.BANNER_LOAD);
                }

                @Override
                public void onAdOpened() {
                    plugin.emit(Events.BANNER_OPEN);
                }
            });

            addBannerView(adView);
        } else if (adView.getVisibility() == View.GONE) {
            adView.resume();
            adView.setVisibility(View.VISIBLE);
        } else {
            View view = plugin.webView.getView();
            ViewGroup wvParentView = (ViewGroup) view.getParent();
            if (parentView != wvParentView) {
                parentView.removeAllViews();
                if (parentView.getParent() != null) {
                    ((ViewGroup) parentView.getParent()).removeView(parentView);
                }
                addBannerView(adView);
            }
        }

        adView.loadAd(adRequest);
        ctx.callbackContext.success();
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
            wvParentView.removeView(view);
            LinearLayout content = (LinearLayout) parentView;
            content.setOrientation(LinearLayout.VERTICAL);
            parentView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 0.0F));
            view.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 1.0F));
            parentView.addView(view);
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
