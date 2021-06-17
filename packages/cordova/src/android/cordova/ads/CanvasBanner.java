package admob.plus.cordova.ads;

import android.annotation.SuppressLint;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.Canvas;
import android.util.Log;
import android.util.Base64;
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
import java.util.Objects;
import java.util.Timer;
import java.util.TimerTask;
import java.io.ByteArrayOutputStream;

import admob.plus.cordova.ExecuteContext;
import admob.plus.cordova.Generated.Events;
import admob.plus.core.Context;

import static admob.plus.core.Helper.getParentView;
import static admob.plus.core.Helper.pxToDp;
import static admob.plus.core.Helper.dpToPx;
import static admob.plus.core.Helper.removeFromParentView;

public class CanvasBanner extends AdBase {
    private static final String TAG = "AdMobPlus.CanvasBanner";
    @SuppressLint("StaticFieldLeak")
    private static ViewGroup rootLinearLayout;
    private static int screenWidth = 0;

    private final Float x;
    private final Float y;
    private Float width;
    private Float height;
    private Bitmap prevBitmap;
    private AdView mAdView;
    private RelativeLayout mRelativeLayout = null;
    private AdRequest mAdRequest = null;
    private AdView mAdViewOld = null;

    public CanvasBanner(ExecuteContext ctx) {
        super(ctx);
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
            mAdView = createCanvasBannerView();
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

    private AdView createCanvasBannerView() {
        AdView adView = new AdView(getActivity());
        adView.setAdUnitId(adUnitId);
        AdSize customAdSize = new AdSize(Math.round(this.width), Math.round(this.height));
        adView.setAdSize(customAdSize);
        adView.setAdListener(new AdListener() {
            @Override
            public void onAdClicked() {
                emit(Events.CANVAS_BANNER_CLICK);
            }

            @Override
            public void onAdClosed() {
                emit(Events.CANVAS_BANNER_CLOSE);
            }

            @Override
            public void onAdFailedToLoad(LoadAdError error) {
                emit(Events.CANVAS_BANNER_LOAD_FAIL, error);
            }

            @Override
            public void onAdImpression() {
                emit(Events.CANVAS_BANNER_IMPRESSION);
            }

            @Override
            public void onAdLoaded() {
                if (mAdViewOld != null) {
                    removeCanvasBannerView(mAdViewOld);
                    mAdViewOld = null;
                }

                runJustBeforeBeingDrawn(adView, new Runnable() {
                    @Override
                    public void run() {

                        int width = adView.getWidth();
                        int height = adView.getHeight();

                        emit(Events.CANVAS_BANNER_SIZE, new HashMap<String, Object>() {{
                            put("size", new HashMap<String, Object>() {{
                                put("width", pxToDp(width));
                                put("height", pxToDp(height));
                                put("widthInPixels", width);
                                put("heightInPixels", height);
                            }});
                        }});

                    }
                });

                emit(Events.CANVAS_BANNER_LOAD);
            }

            @Override
            public void onAdOpened() {
                emit(Events.CANVAS_BANNER_OPEN);
            }
        });
        return adView;
    }

    @Override
    public void show(Context ctx) {
        if (mAdView.getParent() == null) {
            addCanvasBannerView();
        } else if (mAdView.getVisibility() == View.GONE) {
            mAdView.resume();
            mAdView.setVisibility(View.VISIBLE);
        } else {
            ViewGroup wvParentView = getParentView(getWebView());
            if (rootLinearLayout != wvParentView) {
                removeFromParentView(rootLinearLayout);
                addCanvasBannerView();
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

            if (width != null && width > 0 && height != null && height > 0 && (Float.compare(width, this.width) != 0 || Float.compare(height, this.height) != 0)) {
                this.width = width;
                this.height = height;
                reloadCanvasBannerView();
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
            removeCanvasBannerView(mAdView);
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
                String image = Base64.encodeToString(bb, Base64.DEFAULT);

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
            getActivity().runOnUiThread(this::reloadCanvasBannerView);
        }
    }

    private void reloadCanvasBannerView() {
        if (mAdRequest == null) return;
        if (mAdView == null || mAdView.getVisibility() == View.GONE) return;

        pauseCanvasBannerViews();
        if (mAdViewOld != null) removeCanvasBannerView(mAdViewOld);
        mAdViewOld = mAdView;

        mAdView = createCanvasBannerView();
        mAdView.loadAd(mAdRequest);
        addCanvasBannerView();
    }

    @Override
    public void onPause(boolean multitasking) {
        pauseCanvasBannerViews();
        super.onPause(multitasking);
    }

    private void pauseCanvasBannerViews() {
        if (mAdView != null) mAdView.pause();
        if (mAdViewOld != null && mAdViewOld != mAdView) {
            mAdViewOld.pause();
        }
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        resumeCanvasBannerViews();
    }

    private void resumeCanvasBannerViews() {
        if (mAdView != null) mAdView.resume();
        if (mAdViewOld != null) mAdViewOld.resume();
    }

    @Override
    public void onDestroy() {
        if (mAdView != null) {
            removeCanvasBannerView(mAdView);
            mAdView = null;
        }
        if (mAdViewOld != null) {
            removeCanvasBannerView(mAdViewOld);
            mAdViewOld = null;
        }
        if (mRelativeLayout != null) {
            removeFromParentView(mRelativeLayout);
            mRelativeLayout = null;
        }
        super.onDestroy();
    }

    private void removeCanvasBannerView(@NonNull AdView adView) {
        removeFromParentView(adView);
        adView.removeAllViews();
        adView.destroy();
    }

    private void addCanvasBannerView() {
        if (mAdView == null) return;
        if (getParentView(mAdView) == mRelativeLayout && mRelativeLayout != null) return;
        addCanvasBannerViewWithRelativeLayout();
        ViewGroup contentView = getContentView();
        if (contentView != null) {
            contentView.setZ(-10);
            contentView.requestLayout();
            contentView.requestFocus();
        }
    }

    private void addCanvasBannerViewWithRelativeLayout() {
        RelativeLayout.LayoutParams paramsContent = new RelativeLayout.LayoutParams(
                (int) dpToPx(this.width),
                (int) dpToPx(this.height));
        if (mRelativeLayout == null) {
            mRelativeLayout = new RelativeLayout(getActivity());
            RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                   RelativeLayout.LayoutParams.MATCH_PARENT,
                   RelativeLayout.LayoutParams.MATCH_PARENT);
            ViewGroup contentView = getContentView();
            if (contentView != null) {
                contentView.addView(mRelativeLayout, params);
            } else {
                Log.e(TAG, "Unable to find content view");
            }
        }

        removeFromParentView(mAdView);
        mRelativeLayout.addView(mAdView, paramsContent);
        mRelativeLayout.setZ(-10);
        mAdView.setX((float) dpToPx(Objects.requireNonNull(this.x)));
        mAdView.setY((float) dpToPx(Objects.requireNonNull(this.y)));
    }
}
