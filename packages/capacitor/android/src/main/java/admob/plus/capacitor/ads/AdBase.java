package admob.plus.capacitor.ads;

import android.util.SparseArray;

import androidx.annotation.NonNull;

import admob.plus.capacitor.ExecuteContext;

public abstract class AdBase {
    private static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
    final int id;
    final String adUnitId;

    AdBase(int id, @NonNull String adUnitId) {
        this.id = id;
        this.adUnitId = adUnitId;
        ads.put(id, this);
    }

    public AdBase(ExecuteContext ctx) {
        this(ctx.optId(), ctx.optAdUnitID());
    }

    public static AdBase getAd(Integer id) {
        return ads.get(id);
    }

    public void destroy() {
        ads.remove(id);
    }
}
