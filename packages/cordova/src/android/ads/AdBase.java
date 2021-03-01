package admob.plugin.ads;

import android.util.SparseArray;

import admob.plugin.AdMob;

public abstract class AdBase {
    private static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
    protected static AdMob plugin;
    final int id;
    String adUnitId;

    AdBase(int id, String adUnitId) {
        this.id = id;
        this.adUnitId = adUnitId;
        ads.put(id, this);
    }

    public static void initialize(AdMob plugin) {
        AdBase.plugin = plugin;
    }

    public static AdBase getAd(Integer id) {
        return ads.get(id);
    }

    public void destroy() {
        ads.remove(id);
    }
}
