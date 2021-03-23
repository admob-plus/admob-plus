package admob.plugin.ads;

import android.annotation.SuppressLint;
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

public class Banner extends AdBase implements IAdShow {
    @SuppressLint("StaticFieldLeak")
    private static ViewGroup parentView;
    private final AdSize adSize;
    private final int gravity;
    private AdView adView;

    public Banner(ExecuteContext ctx) {
        super(ctx);

        this.adSize = ctx.optAdSize();
        this.gravity = "top".equals(ctx.optPosition()) ? Gravity.TOP : Gravity.BOTTOM;
    }

    public void load(ExecuteContext ctx) {
        AdRequest adRequest = ctx.optAdRequest();

        if (adView == null) {
            adView = new AdView(ctx.getActivity());
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

        adView.loadAd(adRequest);
    }

    public void show(ExecuteContext ctx) {
        load(ctx);

        if (adView.getParent() == null) {
            addBannerView(ctx, adView);
        } else if (adView.getVisibility() == View.GONE) {
            adView.resume();
            adView.setVisibility(View.VISIBLE);
        } else {
            View view = ExecuteContext.plugin.webView.getView();
            ViewGroup wvParentView = (ViewGroup) view.getParent();
            if (parentView != wvParentView) {
                parentView.removeAllViews();
                if (parentView.getParent() != null) {
                    ((ViewGroup) parentView.getParent()).removeView(parentView);
                }
                addBannerView(ctx, adView);
            }
        }

        ctx.success();
    }

    public void hide(ExecuteContext ctx) {
        if (adView != null) {
            adView.pause();
            adView.setVisibility(View.GONE);
        }
        ctx.success();
    }

    @Override
    public void destroy() {
        if (adView != null) {
            adView.destroy();
            adView = null;
        }

        super.destroy();
    }

    private void addBannerView(ExecuteContext ctx, AdView adView) {
        View view = ExecuteContext.plugin.webView.getView();
        ViewGroup wvParentView = (ViewGroup) view.getParent();
        if (parentView == null) {
            parentView = new LinearLayout(ExecuteContext.plugin.webView.getContext());
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
