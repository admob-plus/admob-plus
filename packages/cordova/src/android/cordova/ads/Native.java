package admob.plus.cordova.ads;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdLoader;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.nativead.NativeAd;

import java.util.HashMap;
import java.util.Map;

import admob.plus.cordova.ExecuteContext;
import admob.plus.cordova.Generated.Events;

public class Native extends AdBase implements GenericAd {
    public static final Map<String, ViewProvider> providers = new HashMap<String, ViewProvider>();

    private final AdRequest mAdRequest;
    private final ViewProvider viewProvider;
    private AdLoader mLoader;
    private NativeAd mAd;
    private View view;

    public Native(ExecuteContext ctx) {
        super(ctx);

        mAdRequest = ctx.optAdRequest();
        String key = "default";
        viewProvider = providers.get(key);
        if (viewProvider == null) {
            throw new RuntimeException("cannot find viewProvider: " + key);
        }
    }

    @Override
    public void onDestroy() {
        clear();

        super.onDestroy();
    }

    @Override
    public boolean isLoaded() {
        return mLoader != null && !mLoader.isLoading();
    }

    @Override
    public void load(ExecuteContext ctx) {
        clear();

        mLoader = new AdLoader.Builder(getActivity(), adUnitId)
                .forNativeAd(nativeAd -> {
                    mAd = nativeAd;
                })
                .withAdListener(new AdListener() {
                    @Override
                    public void onAdFailedToLoad(LoadAdError adError) {
                        emit(Events.AD_LOAD_FAIL, adError);
                        if (isLoaded()) {
                            ctx.error(adError.toString());
                        }
                    }

                    public void onAdClosed() {
                        emit(Events.AD_DISMISS);
                    }

                    public void onAdOpened() {
                        emit(Events.AD_SHOW);
                    }

                    public void onAdLoaded() {
                        emit(Events.AD_LOAD);
                        if (isLoaded()) {
                            ctx.success();
                        }
                    }

                    public void onAdClicked() {
                        emit(Events.AD_CLICK);
                    }

                    public void onAdImpression() {
                        emit(Events.AD_IMPRESSION);
                    }
                })
                .build();
        mLoader.loadAd(mAdRequest);
    }

    @Override
    public void show(ExecuteContext ctx) {
        if (view == null) {
            view = viewProvider.createView(getActivity(), mAd);
            ViewGroup vg = getWebViewParent();
            vg.addView(view);

            view.setBackgroundColor(Color.parseColor("#ffffff"));
        }

        view.setVisibility(View.VISIBLE);
        view.setX((float) ctx.opts.optDouble("x"));
        view.setY((float) ctx.opts.optDouble("y"));
        ViewGroup.LayoutParams params = view.getLayoutParams();
        params.width = (int) ctx.opts.optDouble("width");
        params.height = (int) ctx.opts.optDouble("height");
        view.setLayoutParams(params);

        viewProvider.didShow(this);

        view.requestLayout();
    }

    @Override
    public void hide(ExecuteContext ctx) {
        if (view != null) {
            view.setVisibility(View.GONE);
        }

        viewProvider.didHide(this);
        ctx.success();
    }

    private void clear() {
        if (mAd != null) {
            mAd.destroy();
            mAd = null;
        }
        mLoader = null;
    }

    public interface ViewProvider {
        @NonNull
        View createView(Context context, NativeAd nativeAd);

        default void didShow(@NonNull Native ad) {
        }

        default void didHide(@NonNull Native ad) {
        }
    }
}
