package admob.plus.capacitor;

import android.util.SparseArray;

import com.google.android.gms.ads.AdListener;

public class Ad {
    private static SparseArray<Ad> ads = new SparseArray<Ad>();

    final int id;
    final AdmobPlus plugin;

    Ad(int id, AdmobPlus plugin) {
        this.id = id;
        this.plugin = plugin;
        ads.put(id, this);
    }

    static Ad getAdById(Integer id) {
        return ads.get(id);
    }

    static Interstitial createInterstitial(int id, AdmobPlus plugin) {
        Ad ad = getAdById(id);
        return (ad != null) ? (Interstitial) ad : new Interstitial(id, plugin);
    }

    String getAdType() {
        return null;
    }

    void remove() {
        ads.remove(id);
    }

    void emitEvent(String eventName) {
        this.plugin.getBridge().triggerDocumentJSEvent(String.format("admob.%s.%s", this.getAdType(), eventName));
    }

    static class Listener extends AdListener {
        private Ad ad;

        Listener(Ad ad) {
            super();

            this.ad = ad;
        }

        @Override
        public void onAdLoaded() {
            this.ad.emitEvent("load");
        }

        @Override
        public void onAdFailedToLoad(int errorCode) {
            this.ad.emitEvent("load_fail");
        }

        @Override
        public void onAdOpened() {
            this.ad.emitEvent("open");
        }

        @Override
        public void onAdClosed() {
            this.ad.emitEvent("close");
        }

        @Override
        public void onAdLeftApplication() {
            this.ad.emitEvent("exit_app");
        }

        @Override
        public void onAdImpression() {
            this.ad.emitEvent("impression");
        }

        @Override
        public void onAdClicked() {
            this.ad.emitEvent("click");
        }
    }
}
