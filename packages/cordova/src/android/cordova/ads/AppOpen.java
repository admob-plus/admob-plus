package admob.plus.cordova.ads;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.appopen.AppOpenAd;

import admob.plus.cordova.ExecuteContext;

public class AppOpen extends AdBase {
    private final AdRequest mAdRequest;
    private final int mOrientation = AppOpenAd.APP_OPEN_AD_ORIENTATION_PORTRAIT;
    private AppOpenAd mAd = null;

    public AppOpen(ExecuteContext ctx) {
        super(ctx);

        mAdRequest = ctx.optAdRequest();
    }

    public void load() {
        mAd = null;

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
                                load();
                            }

                            @Override
                            public void onAdFailedToShowFullScreenContent(AdError adError) {
                                load();
                            }

                            @Override
                            public void onAdShowedFullScreenContent() {
                            }
                        });
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                    }
                });
    }

    public void showIfAvailable() {
        if (mAd == null) {
            load();
        } else {
            mAd.show(ExecuteContext.plugin.cordova.getActivity());
        }
    }
}
