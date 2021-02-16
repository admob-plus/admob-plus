package admob.plus.capacitor.ads;

import android.util.SparseArray;

public abstract class AdBase {
    private static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
    final int id;
    String adUnitId;

    AdBase(int id, String adUnitId) {
        this.id = id;
        this.adUnitId = adUnitId;
        ads.put(id, this);
    }

    public static AdBase getAd(Integer id) {
        return ads.get(id);
    }

    public void destroy() {
        ads.remove(id);
    }
}
