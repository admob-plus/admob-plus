package admob.plugin;

import com.google.android.gms.ads.AdRequest;

public abstract class AbstractExecutor {
    protected AdMob plugin;

    public AbstractExecutor(AdMob plugin) {
        this.plugin = plugin;
    }

    public void destroy() {
        this.plugin = null;
    }

    protected AdRequest.Builder createAdRequestBuilder() {
        return new AdRequest.Builder();
    }
}
