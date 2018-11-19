package admob.plugin;

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
