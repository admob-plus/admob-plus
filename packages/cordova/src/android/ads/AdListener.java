package admob.plugin.ads;

public class AdListener extends com.google.android.gms.ads.AdListener {
    private AdBase ad;

    AdListener(AdBase ad) {
        super();

        this.ad = ad;
    }

    @Override
    public void onAdLoaded() {
        AdBase.plugin.emit(ad.getLoadedEvent());
    }

    @Override
    public void onAdFailedToLoad(int errorCode) {
        AdBase.plugin.emit(ad.getFailedToLoadEvent(), ad.buildErrorPayload(errorCode));
    }

    @Override
    public void onAdOpened() {
        AdBase.plugin.emit(ad.getOpenedEvent());
    }

    @Override
    public void onAdClosed() {
        AdBase.plugin.emit(ad.getClosedEvent());
    }

    @Override
    public void onAdLeftApplication() {
        AdBase.plugin.emit(ad.getLeftApplicationEvent());
    }

    @Override
    public void onAdImpression() {
        AdBase.plugin.emit(ad.getImpressionEvent());
    }

    @Override
    public void onAdClicked() {
        AdBase.plugin.emit(ad.getClickedEvent());
    }
}
