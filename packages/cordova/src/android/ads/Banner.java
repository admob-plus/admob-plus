package admob.plugin.ads;

import android.annotation.SuppressLint;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;

import org.apache.cordova.CordovaWebView;

import admob.plugin.ExecuteContext;
import admob.plugin.Generated.Events;

public class Banner extends AdBase implements IAdShow {
    @SuppressLint("StaticFieldLeak")
    private static ViewGroup parentView;
    private final AdSize adSize;
    private final int gravity;
    private final Integer offset;
    private AdView adView;
    private RelativeLayout mRelativeLayout = null;

    public Banner(ExecuteContext ctx) {
        super(ctx);

        this.adSize = ctx.optAdSize();
        this.gravity = "top".equals(ctx.optPosition()) ? Gravity.TOP : Gravity.BOTTOM;
        this.offset = ctx.optOffset();
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
        ctx.success();
    }

    public void show(ExecuteContext ctx) {
        if (adView.getParent() == null) {
            addBannerView(ctx);
        } else if (adView.getVisibility() == View.GONE) {
            adView.resume();
            adView.setVisibility(View.VISIBLE);
        } else {
            View view = getWebView();
            ViewGroup wvParentView = (ViewGroup) view.getParent();
            if (parentView != wvParentView) {
                parentView.removeAllViews();
                if (parentView.getParent() != null) {
                    ((ViewGroup) parentView.getParent()).removeView(parentView);
                }
                addBannerView(ctx);
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
    public void onPause(boolean multitasking) {
        if (adView != null) {
            adView.pause();
        }
        super.onPause(multitasking);
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        if (adView != null) {
            adView.resume();
        }
    }

    @Override
    public void onDestroy() {
        if (adView != null) {
            final ViewGroup viewGroup = (ViewGroup) adView.getParent();
            if (viewGroup != null)
            {
                viewGroup.removeView(adView);
            }
            adView.removeAllViews();
            adView.destroy();
            adView = null;
        }
        if (mRelativeLayout != null) {
            ViewGroup parentView = (ViewGroup) mRelativeLayout.getParent();
            if (parentView != null) {
                parentView.removeView(mRelativeLayout);
            }
            mRelativeLayout = null;
        }

        super.onDestroy();
    }

    private void addBannerView(ExecuteContext ctx) {
        if (this.offset == null) {
            addBannerViewWithLinearLayout(ctx);
        } else {
            addBannerViewWithRelativeLayout(ctx);
        }
    }

    private void addBannerViewWithLinearLayout(ExecuteContext ctx) {
        View view = getWebView();
        ViewGroup wvParentView = (ViewGroup) view.getParent();
        if (parentView == null) {
            parentView = new LinearLayout(getCordovaWebView().getContext());
        }

        if (wvParentView != null && wvParentView != parentView) {
            wvParentView.removeView(view);
            LinearLayout content = (LinearLayout) parentView;
            content.setOrientation(LinearLayout.VERTICAL);
            parentView.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    0.0F));
            view.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    1.0F));
            parentView.addView(view);
            wvParentView.addView(parentView);
        }

        if (isPositionTop()) {
            parentView.addView(adView, 0);
        } else {
            parentView.addView(adView);
        }
        parentView.bringToFront();
        parentView.requestLayout();
        parentView.requestFocus();
    }

    private void addBannerViewWithRelativeLayout(ExecuteContext ctx) {
        RelativeLayout.LayoutParams paramsContent = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.WRAP_CONTENT);
        paramsContent.addRule(isPositionTop() ? RelativeLayout.ALIGN_PARENT_TOP : RelativeLayout.ALIGN_PARENT_BOTTOM);

        if (mRelativeLayout == null) {
            mRelativeLayout = new RelativeLayout(ctx.getActivity());
            RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                    RelativeLayout.LayoutParams.MATCH_PARENT,
                    RelativeLayout.LayoutParams.MATCH_PARENT);
            if (isPositionTop()) {
                params.setMargins(0, this.offset, 0, 0);
            } else {
                params.setMargins(0, 0, 0, this.offset);
            }
            try {
                ((ViewGroup) (((View) getCordovaWebView().getClass()
                        .getMethod("getView")
                        .invoke(getCordovaWebView())).getParent()))
                        .addView(mRelativeLayout, params);
            } catch (Exception e) {
                ((ViewGroup) getCordovaWebView()).addView(mRelativeLayout, params);
            }
        }

        mRelativeLayout.addView(adView, paramsContent);
        mRelativeLayout.bringToFront();
    }

    private CordovaWebView getCordovaWebView() {
        return ExecuteContext.plugin.webView;
    }

    private View getWebView() {
        return getCordovaWebView().getView();
    }

    private boolean isPositionTop() {
        return gravity == Gravity.TOP;
    }
}
