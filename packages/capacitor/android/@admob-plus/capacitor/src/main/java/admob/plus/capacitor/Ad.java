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

    void remove() {
        ads.remove(id);
    }

    static class Listener extends AdListener {
        private Ad ad;

        Listener(Ad ad) {
            super();

            this.ad = ad;
        }

        @Override
        public void onAdLoaded() {
            this.ad.plugin.getBridge().triggerDocumentJSEvent("admob.interstitial.load");
        }
    }
}
