package admob.plus.cordova.ads;

import android.annotation.SuppressLint;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.Canvas;
import android.util.Log;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver.OnPreDrawListener;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.os.Trace;
import android.os.SystemClock;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.LoadAdError;

import java.lang.Math;
import java.util.HashMap;
import java.util.Base64;
import java.util.Objects;
import java.util.Timer;
import java.util.TimerTask;
import java.io.ByteArrayOutputStream;

import admob.plus.cordova.ExecuteContext;
import admob.plus.cordova.Generated.Events;
import admob.plus.core.Context;

import static admob.plus.core.Helper.pxToDp;
import static admob.plus.core.Helper.dpToPx;

public class Banner extends AdBase {
    private static final String TAG = "AdMobPlus.Banner";
    @SuppressLint("StaticFieldLeak")
    private static ViewGroup rootLinearLayout;
    private static int screenWidth = 0;

    private final AdSize adSize;
    private final int gravity;
    private final Integer offset;
    private final Boolean canvas;
    private final Float x;
    private final Float y;
    private Float width;
    private Float height;
    private Bitmap prevBitmap;
    private AdView mAdView;
    private RelativeLayout mRelativeLayout = null;
    private AdRequest mAdRequest = null;
    private AdView mAdViewOld = null;

    public Banner(ExecuteContext ctx) {
        super(ctx);

        this.adSize = ctx.optAdSize();
        this.gravity = "top".equals(ctx.optPosition()) ? Gravity.TOP : Gravity.BOTTOM;
        this.offset = ctx.optOffset();
        this.canvas = ctx.optBoolean("canvas");
        this.x = ctx.optFloat("x");
        this.y = ctx.optFloat("y");
        this.width = ctx.optFloat("width");
        this.height = ctx.optFloat("height");
        this.prevBitmap = null;
    }

    public static void destroyParentView() {
        ViewGroup vg = getParentView(rootLinearLayout);
        if (vg != null) vg.removeAllViews();
        rootLinearLayout = null;
    }

    @Nullable
    private static ViewGroup getParentView(@Nullable View view) {
        return view == null ? null : (ViewGroup) view.getParent();
    }

    @Nullable
    private static ViewGroup removeFromParentView(@Nullable View view) {
        ViewGroup viewParent = getParentView(view);
        if (viewParent != null) viewParent.removeView(view);
        return viewParent;
    }

    private static void runJustBeforeBeingDrawn(final View view, final Runnable runnable) {
        final OnPreDrawListener preDrawListener = new OnPreDrawListener() {
            @Override
            public boolean onPreDraw() {
                view.getViewTreeObserver().removeOnPreDrawListener(this);
                runnable.run();
                return true;
            }
        };
        view.getViewTreeObserver().addOnPreDrawListener(preDrawListener);
    }

    @Override
    public void load(Context ctx) {
        final AdRequest adRequest = ctx.optAdRequest();

        if (mAdView == null) {
            mAdView = createBannerView();
        }

        mAdView.loadAd(adRequest);
        mAdRequest = adRequest;
        ctx.resolve();
    }

    private Bitmap getBitmapFromView(View view) {
        Bitmap bitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        view.draw(canvas);
        return bitmap;
    }

    private AdView createBannerView() {
        AdView adView = new AdView(getActivity());
        adView.setAdUnitId(adUnitId);
        if(this.canvas != null) {
            AdSize customAdSize = new AdSize(Math.round(this.width), Math.round(this.height));
            adView.setAdSize(customAdSize);
        } else {
            adView.setAdSize(adSize);
        }
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

                runJustBeforeBeingDrawn(adView, new Runnable() {
                    @Override
                    public void run() {

                        int width = adView.getWidth();
                        int height = adView.getHeight();

                        emit(Events.BANNER_SIZE, new HashMap<String, Object>() {{
                            put("size", new HashMap<String, Object>() {{
                                put("width", pxToDp(width));
                                put("height", pxToDp(height));
                                put("widthInPixels", width);
                                put("heightInPixels", height);
                            }});
                        }});

                    }
                });

                emit(Events.BANNER_LOAD);
            }

            @Override
            public void onAdOpened() {
                emit(Events.BANNER_OPEN);
            }
        });
        return adView;
    }

    @Override
    public void show(Context ctx) {
        if (mAdView.getParent() == null) {
            addBannerView();
        } else if (mAdView.getVisibility() == View.GONE) {
            mAdView.resume();
            mAdView.setVisibility(View.VISIBLE);
        } else {
            ViewGroup wvParentView = getParentView(getWebView());
            if (rootLinearLayout != wvParentView) {
                removeFromParentView(rootLinearLayout);
                addBannerView();
            }
        }

        if(mAdView.getParent() != null)
        {
            Integer x = ctx.optInt("x");
            Integer y = ctx.optInt("y");

            if (x != null && y != null)  {
                mAdView.setX((float) dpToPx(x));
                mAdView.setY((float) dpToPx(y));
            }

            Float width = ctx.optFloat("width");
            Float height = ctx.optFloat("height");

            if (this.canvas != null && width != null && width > 0 && height != null && height > 0 && (Float.compare(width, this.width) != 0 || Float.compare(height, this.height) != 0)) {
                this.width = width;
                this.height = height;
                reloadBannerView();
            }
        }

        ctx.resolve();
    }

    @Override
    public void hide(Context ctx) {
        if (mAdView != null) {
            mAdView.pause();
            mAdView.setVisibility(View.GONE);
        }
        ctx.resolve();
    }

    public void destroy(Context ctx) {
        if (mAdView != null) {
            removeBannerView(mAdView);
        }
        ctx.resolve();
    }

    public void getAdViewImage(Context ctx) {
        if (mAdView != null && mAdView.getWidth() > 0 && mAdView.getHeight() > 0) {
            Bitmap bitmap = getBitmapFromView(mAdView);
            if(this.prevBitmap == null || !bitmap.sameAs(this.prevBitmap)) { // Check if bitmap is different from prev
                this.prevBitmap = bitmap;
                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                bitmap.compress(CompressFormat.JPEG, 80, bos); 
                byte[] bb = bos.toByteArray();
                String image = Base64.getEncoder().encodeToString(bb);

                int width = mAdView.getWidth();
                int height = mAdView.getHeight();

                ctx.resolveString(image);
            }
            else {
                ctx.resolveString("");
            }
        } else {
            ctx.resolveString("");
        }
    }

    public void simulateClickEvent(Context ctx) {

        Float x = ctx.optFloat("x");
        Float y = ctx.optFloat("y");

        long downTime = SystemClock.uptimeMillis();
        long eventTime = SystemClock.uptimeMillis() + 30;

        MotionEvent motionEvent1 = MotionEvent.obtain(
            downTime, 
            eventTime, 
            MotionEvent.ACTION_DOWN,
            (float) dpToPx(x),
            (float) dpToPx(y),
            0
        );

        MotionEvent motionEvent2 = MotionEvent.obtain(
            downTime + 60, 
            eventTime + 90, 
            MotionEvent.ACTION_UP,
            (float) dpToPx(x),
            (float) dpToPx(y),
            0
        );

        // Dispatch touch event to view
        mAdView.dispatchTouchEvent(motionEvent1);
        mAdView.dispatchTouchEvent(motionEvent2);

        ctx.resolve();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        int w = getActivity().getResources().getDisplayMetrics().widthPixels;
        if (w != screenWidth) {
            screenWidth = w;
            getActivity().runOnUiThread(this::reloadBannerView);
        }
    }

    private void reloadBannerView() {
        if (mAdRequest == null) return;
        if (mAdView == null || mAdView.getVisibility() == View.GONE) return;

        pauseBannerViews();
        if (mAdViewOld != null) removeBannerView(mAdViewOld);
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
        if (mAdView != null) mAdView.pause();
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
        if (mAdView != null) mAdView.resume();
        if (mAdViewOld != null) mAdViewOld.resume();
    }

    @Override
    public void onDestroy() {
        if (mAdView != null) {
            removeBannerView(mAdView);
            mAdView = null;
        }
        if (mAdViewOld != null) {
            removeBannerView(mAdViewOld);
            mAdViewOld = null;
        }
        if (mRelativeLayout != null) {
            removeFromParentView(mRelativeLayout);
            mRelativeLayout = null;
        }
        super.onDestroy();
    }

    private void removeBannerView(@NonNull AdView adView) {
        removeFromParentView(adView);
        adView.removeAllViews();
        adView.destroy();
    }

    private void addBannerView() {
        if (mAdView == null) return;
        if (this.offset == null && this.canvas == null) {
            if (getParentView(mAdView) == rootLinearLayout && rootLinearLayout != null) return;
            addBannerViewWithLinearLayout();
        } else {
            if (getParentView(mAdView) == mRelativeLayout && mRelativeLayout != null) return;
            addBannerViewWithRelativeLayout();
        }

        ViewGroup contentView = getContentView();
        if (contentView != null) {
            if(this.canvas == null) {
                contentView.bringToFront();
            } else {
                contentView.setZ(-10);
            }
            contentView.requestLayout();
            contentView.requestFocus();
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
                removeFromParentView(rootLinearLayout);
                wvParentView.addView(rootLinearLayout);
            }
        }

        removeFromParentView(mAdView);
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

        RelativeLayout.LayoutParams paramsContent;

        if(this.canvas == null) {
            paramsContent = new RelativeLayout.LayoutParams(
                    RelativeLayout.LayoutParams.MATCH_PARENT,
                    RelativeLayout.LayoutParams.WRAP_CONTENT);
            paramsContent.addRule(isPositionTop() ? RelativeLayout.ALIGN_PARENT_TOP : RelativeLayout.ALIGN_PARENT_BOTTOM);
        } else {
            paramsContent = new RelativeLayout.LayoutParams(
                    (int) dpToPx(this.width),
                    (int) dpToPx(this.height));
        }

        if (mRelativeLayout == null) {
            mRelativeLayout = new RelativeLayout(getActivity());
            RelativeLayout.LayoutParams params;
            if(this.canvas == null || true) {
                params = new RelativeLayout.LayoutParams(
                       RelativeLayout.LayoutParams.MATCH_PARENT,
                       RelativeLayout.LayoutParams.MATCH_PARENT);
            } else {
                params = new RelativeLayout.LayoutParams(
                        (int) dpToPx(this.width),
                        (int) dpToPx(this.height));
            }
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

        removeFromParentView(mAdView);
        mRelativeLayout.addView(mAdView, paramsContent);

        if(this.canvas == null) {
            mRelativeLayout.bringToFront();
        } else {
            mRelativeLayout.setZ(-10);
            mAdView.setX((float) dpToPx(Objects.requireNonNull(this.x)));
            mAdView.setY((float) dpToPx(Objects.requireNonNull(this.y)));
        }
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
