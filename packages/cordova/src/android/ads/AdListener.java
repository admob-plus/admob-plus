package admob.plugin.ads;

import com.google.android.gms.ads.LoadAdError;

public class AdListener extends com.google.android.gms.ads.AdListener {
    private final AdBase ad;

    AdListener(AdBase ad) {
        super();

        this.ad = ad;
    }

    @Override
    public void onAdClicked() {
        AdBase.plugin.emit(ad.getClickedEvent());
    }

    @Override
    public void onAdClosed() {
        AdBase.plugin.emit(ad.getClosedEvent());
    }

    @Override
    public void onAdFailedToLoad(LoadAdError error) {
        AdBase.plugin.emit(ad.getFailedToLoadEvent(), ad.buildErrorPayload(error.getCode()));
    }

    @Override
    public void onAdImpression() {
        AdBase.plugin.emit(ad.getImpressionEvent());
    }

    @Override
    public void onAdLoaded() {
        AdBase.plugin.emit(ad.getLoadedEvent());
    }

    @Override
    public void onAdOpened() {
        AdBase.plugin.emit(ad.getOpenedEvent());
    }
}
