package admob.plus.cordova.ads;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.appopen.AppOpenAd;

import admob.plus.cordova.ExecuteContext;
import admob.plus.cordova.Generated.Events;

public class AppOpen extends AdBase {
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

    public void load() {
        clear();

        AppOpenAd.load(ExecuteContext.plugin.cordova.getActivity(),
                adUnitId,
                mAdRequest,
                mOrientation, new AppOpenAd.AppOpenAdLoadCallback() {
                    @Override
                    public void onAdLoaded(AppOpenAd ad) {
                        mAd = ad;
                        ad.setFullScreenContentCallback(new FullScreenContentCallback() {
                            @Override
                            public void onAdDismissedFullScreenContent() {
                                emit(Events.AD_DISMISS);
                                load();
                            }

                            @Override
                            public void onAdFailedToShowFullScreenContent(AdError adError) {
                                emit(Events.AD_SHOW_FAIL, adError);
                                load();
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
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        emit(Events.AD_LOAD_FAIL, loadAdError);
                    }
                });
    }

    public void showOrLoad() {
        if (mAd == null) {
            load();
        } else {
            mAd.show(ExecuteContext.plugin.cordova.getActivity());
        }
    }

    private void clear() {
        if (mAd != null) {
            mAd = null;
        }
    }
}
