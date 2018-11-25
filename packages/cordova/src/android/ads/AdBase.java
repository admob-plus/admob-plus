package admob.plugin.ads;

import android.util.SparseArray;

import admob.plugin.AdMob;


public abstract class AdBase {
    protected static AdMob plugin;

    final int id;
    protected String adUnitID;

    private static SparseArray<AdBase> ads = new SparseArray<AdBase>();


    AdBase(int id, String adUnitID) {
        this.id = id;
        this.adUnitID = adUnitID;

        ads.put(id, this);
    }

    public static void initialize(AdMob plugin) {
        AdBase.plugin = plugin;
    }

    public void destroy() {
        ads.remove(id);
    }

    public static AdBase getAd(Integer id) {
        return ads.get(id);
    }
}
