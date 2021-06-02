package admob.plus.cordova.ads;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.appopen.AppOpenAd;

import admob.plus.cordova.ExecuteContext;
import admob.plus.cordova.Generated.Events;

public class AppOpen extends AdBase implements GenericAd {
    private final AdRequest mAdRequest;
    private final int mOrientation = AppOpenAd.APP_OPEN_AD_ORIENTATION_PORTRAIT;
    private AppOpenAd mAd = null;

    public AppOpen(ExecuteContext ctx) {
        super(ctx);

        mAdRequest = ctx.optAdRequest();
    }

    @Override
    public void onDestroy() {
        clear();

        super.onDestroy();
    }

    @Override
    public void load(ExecuteContext ctx) {
        clear();

        AppOpenAd.load(getActivity(),
                adUnitId,
                mAdRequest,
                mOrientation, new AppOpenAd.AppOpenAdLoadCallback() {
                    @Override
                    public void onAdLoaded(AppOpenAd ad) {
                        mAd = ad;
                        ad.setFullScreenContentCallback(new FullScreenContentCallback() {
                            @Override
                            public void onAdDismissedFullScreenContent() {
                                clear();
                                emit(Events.AD_DISMISS);
                            }

                            @Override
                            public void onAdFailedToShowFullScreenContent(AdError adError) {
                                clear();
                                emit(Events.AD_SHOW_FAIL, adError);
                            }

                            @Override
                            public void onAdShowedFullScreenContent() {
                                emit(Events.AD_SHOW);
                            }

                            @Override
                            public void onAdImpression() {
                                emit(Events.AD_IMPRESSION);
                            }
                        });

                        emit(Events.AD_LOAD);
                        ctx.success();
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        clear();
                        emit(Events.AD_LOAD_FAIL, loadAdError);
                        ctx.error(loadAdError.toString());
                    }
                });
    }

    @Override
    public boolean isLoaded() {
        return mAd != null;
    }

    @Override
    public void show(ExecuteContext ctx) {
        mAd.show(getActivity());
    }

    private void clear() {
        if (mAd != null) {
            mAd = null;
        }
    }
}
