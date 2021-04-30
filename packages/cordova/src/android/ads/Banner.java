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
    private static ViewGroup rootLinearLayout;

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
        ViewGroup vg = getParentView(rootLinearLayout);
        if (vg != null) {
            vg.removeAllViews();
        }
        rootLinearLayout = null;
    }

    @Nullable
    private static ViewGroup getParentView(@Nullable View view) {
        return view == null ? null : (ViewGroup) view.getParent();
    }

    @Nullable
    private static ViewGroup getParentViewWithout(@Nullable View view) {
        ViewGroup viewParent = getParentView(view);
        if (viewParent != null) {
            viewParent.removeView(view);
        }
        return viewParent;
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
        return adView;
    }

    public void show(ExecuteContext ctx) {
        if (mAdView.getParent() == null) {
            addBannerView();
        } else if (mAdView.getVisibility() == View.GONE) {
            mAdView.resume();
            mAdView.setVisibility(View.VISIBLE);
        } else {
            ViewGroup wvParentView = getParentView(getWebView());
            if (rootLinearLayout != wvParentView) {
                getParentViewWithout(rootLinearLayout);
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

        pauseBannerViews();
        if (mAdViewOld != null) {
            removeBannerView(mAdViewOld);
        }
        mAdViewOld = mAdView;

        mAdView = createBannerView();
        mAdView.loadAd(mAdRequest);
        addBannerView();
    }

    @Override
    public void onPause(boolean multitasking) {
        pauseBannerViews();
        super.onPause(multitasking);
    }

    private void pauseBannerViews() {
        if (mAdView != null) {
            mAdView.pause();
        }
        if (mAdViewOld != null && mAdViewOld != mAdView) {
            mAdViewOld.pause();
        }
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        resumeBannerViews();
    }

    private void resumeBannerViews() {
        if (mAdView != null) {
            mAdView.resume();
        }
        if (mAdViewOld != null) {
            mAdViewOld.resume();
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
            getParentViewWithout(mRelativeLayout);
            mRelativeLayout = null;
        }

        super.onDestroy();
    }

    private void removeBannerView(@NonNull AdView adView) {
        getParentViewWithout(adView);
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
        ViewGroup wvParentView = getParentView(webView);
        if (rootLinearLayout == null) {
            rootLinearLayout = new LinearLayout(getActivity());
        }

        if (wvParentView != null && wvParentView != rootLinearLayout) {
            wvParentView.removeView(webView);
            LinearLayout content = (LinearLayout) rootLinearLayout;
            content.setOrientation(LinearLayout.VERTICAL);
            rootLinearLayout.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    0.0F));
            webView.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    1.0F));
            rootLinearLayout.addView(webView);

            ViewGroup view = getParentView(rootLinearLayout);
            if (view != wvParentView) {
                getParentViewWithout(rootLinearLayout);
                wvParentView.addView(rootLinearLayout);
            }
        }

        getParentViewWithout(mAdView);
        if (isPositionTop()) {
            rootLinearLayout.addView(mAdView, 0);
        } else {
            rootLinearLayout.addView(mAdView);
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

        getParentViewWithout(mAdView);
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

    public enum AdSizeType {
        BANNER, LARGE_BANNER, MEDIUM_RECTANGLE, FULL_BANNER, LEADERBOARD, SMART_BANNER;

        @Nullable
        public static AdSize getAdSize(int adSize) {
            switch (AdSizeType.values()[adSize]) {
                case BANNER:
                    return AdSize.BANNER;
                case LARGE_BANNER:
                    return AdSize.LARGE_BANNER;
                case MEDIUM_RECTANGLE:
                    return AdSize.MEDIUM_RECTANGLE;
                case FULL_BANNER:
                    return AdSize.FULL_BANNER;
                case LEADERBOARD:
                    return AdSize.LEADERBOARD;
                case SMART_BANNER:
                    return AdSize.SMART_BANNER;
                default:
                    return null;
            }
        }
    }
}
