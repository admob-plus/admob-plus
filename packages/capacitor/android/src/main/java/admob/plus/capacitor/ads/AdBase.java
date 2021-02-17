package admob.plus.capacitor.ads;

import android.util.SparseArray;

import androidx.annotation.NonNull;

public abstract class AdBase {
    private static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
    final int id;
    final String adUnitId;

    AdBase(int id, @NonNull String adUnitId) {
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
