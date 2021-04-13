package admob.plugin.ads;

import android.annotation.SuppressLint;
import android.content.res.Configuration;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;

import org.apache.cordova.CordovaWebView;

import java.util.Objects;

import admob.plugin.ExecuteContext;
import admob.plugin.Generated.Events;

public class Banner extends AdBase implements IAdShow {
    private static final String TAG = "AdMobPlus.Banner";
    @SuppressLint("StaticFieldLeak")
    private static ViewGroup parentView;

    private final AdSize adSize;
    private final int gravity;
    private final Integer offset;
    private AdView mAdView;
    private RelativeLayout mRelativeLayout = null;
    private AdRequest mAdRequest = null;
    private AdView mAdViewOld = null;

    public Banner(ExecuteContext ctx) {
        super(ctx);

        this.adSize = ctx.optAdSize();
        this.gravity = "top".equals(ctx.optPosition()) ? Gravity.TOP : Gravity.BOTTOM;
        this.offset = ctx.optOffset();
    }

    public static void destroyParentView() {
        if (parentView == null) {
            return;
        }

        ViewGroup view = (ViewGroup) parentView.getParent();
        if (view != null) {
            view.removeAllViews();
        }
        parentView = null;
    }

    public void load(ExecuteContext ctx) {
        final AdRequest adRequest = ctx.optAdRequest();

        if (mAdView == null) {
            mAdView = createBannerView();
        }

        mAdView.loadAd(adRequest);
        mAdRequest = adRequest;
        ctx.success();
    }

    private AdView createBannerView() {
        AdView adView = new AdView(getActivity());
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
                if (mAdViewOld != null) {
                    removeBannerView(mAdViewOld);
                    mAdViewOld = null;
                }
                emit(Events.BANNER_LOAD);
            }

            @Override
            public void onAdOpened() {
                emit(Events.BANNER_OPEN);
            }
        });
        adView.addOnLayoutChangeListener((view, i, i1, i2, i3, i4, i5, i6, i7) -> {
            Log.d(TAG, "onLayoutChange: " + this.id);
        });
        adView.addOnAttachStateChangeListener(new View.OnAttachStateChangeListener() {
            @Override
            public void onViewAttachedToWindow(View view) {
                Log.d(TAG, "onViewAttachedToWindow");
            }

            @Override
            public void onViewDetachedFromWindow(View view) {
                Log.d(TAG, "onViewDetachedFromWindow");
            }
        });
        return adView;
    }

    public void show(ExecuteContext ctx) {
        if (mAdView.getParent() == null) {
            addBannerView();
        } else if (mAdView.getVisibility() == View.GONE) {
            mAdView.resume();
            mAdView.setVisibility(View.VISIBLE);
        } else {
            View view = getWebView();
            ViewGroup wvParentView = (ViewGroup) view.getParent();
            if (parentView != wvParentView) {
                parentView.removeAllViews();
                if (parentView.getParent() != null) {
                    ((ViewGroup) parentView.getParent()).removeView(parentView);
                }
                addBannerView();
            }
        }

        ctx.success();
    }

    public void hide(ExecuteContext ctx) {
        if (mAdView != null) {
            mAdView.pause();
            mAdView.setVisibility(View.GONE);
        }
        ctx.success();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE || newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) {
            reloadBannerView();
        }
    }

    private void reloadBannerView() {
        if (mAdRequest == null) return;

        if (mAdViewOld != null) {
            removeBannerView(mAdViewOld);
        }
        mAdViewOld = mAdView;
        if (mAdViewOld != null) {
            mAdViewOld.pause();
        }

        mAdView = createBannerView();
        mAdView.loadAd(mAdRequest);
        addBannerView();
    }

    @Override
    public void onPause(boolean multitasking) {
        if (mAdView != null) {
            mAdView.pause();
        }
        super.onPause(multitasking);
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        if (mAdView != null) {
            mAdView.resume();
        }
    }

    @Override
    public void onDestroy() {
        if (mAdView != null) {
            removeBannerView(mAdView);
            mAdView = null;
        }
        if (mAdViewOld != null) {
            removeBannerView(mAdViewOld);
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

    private void removeBannerView(@NonNull AdView adView) {
        final ViewGroup viewGroup = (ViewGroup) adView.getParent();
        if (viewGroup != null) {
            viewGroup.removeView(adView);
        }
        adView.removeAllViews();
        adView.destroy();
    }

    private void addBannerView() {
        Objects.requireNonNull(mAdView);
        if (this.offset == null) {
            addBannerViewWithLinearLayout();
        } else {
            addBannerViewWithRelativeLayout();
        }
    }

    private void addBannerViewWithLinearLayout() {
        View webView = getWebView();
        ViewGroup wvParentView = (ViewGroup) webView.getParent();
        if (parentView == null) {
            parentView = new LinearLayout(getActivity());
        }

        if (wvParentView != null && wvParentView != parentView) {
            wvParentView.removeView(webView);
            LinearLayout content = (LinearLayout) parentView;
            content.setOrientation(LinearLayout.VERTICAL);
            parentView.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    0.0F));
            webView.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    1.0F));
            parentView.addView(webView);

            ViewGroup view = (ViewGroup) parentView.getParent();
            if (view != wvParentView) {
                if (view != null) {
                    view.removeView(parentView);
                }
                wvParentView.addView(parentView);
            }
        }

        if (isPositionTop()) {
            parentView.addView(mAdView, 0);
        } else {
            parentView.addView(mAdView);
        }

        ViewGroup contentView = getContentView();
        if (contentView != null) {
            for (int i = 0; i < contentView.getChildCount(); i++) {
                View view = contentView.getChildAt(i);
                if (view instanceof RelativeLayout) {
                    view.bringToFront();
                }
            }
        }
    }

    private void addBannerViewWithRelativeLayout() {
        RelativeLayout.LayoutParams paramsContent = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.WRAP_CONTENT);
        paramsContent.addRule(isPositionTop() ? RelativeLayout.ALIGN_PARENT_TOP : RelativeLayout.ALIGN_PARENT_BOTTOM);

        if (mRelativeLayout == null) {
            mRelativeLayout = new RelativeLayout(getActivity());
            RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                    RelativeLayout.LayoutParams.MATCH_PARENT,
                    RelativeLayout.LayoutParams.MATCH_PARENT);
            if (isPositionTop()) {
                params.setMargins(0, this.offset, 0, 0);
            } else {
                params.setMargins(0, 0, 0, this.offset);
            }

            ViewGroup contentView = getContentView();
            if (contentView != null) {
                contentView.addView(mRelativeLayout, params);
            } else {
                Log.e(TAG, "Unable to find content view");
            }
        }

        mRelativeLayout.addView(mAdView, paramsContent);
        mRelativeLayout.bringToFront();
    }

    @Nullable
    private ViewGroup getContentView() {
        return (ViewGroup) getWebView().getRootView().findViewById(android.R.id.content);
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
