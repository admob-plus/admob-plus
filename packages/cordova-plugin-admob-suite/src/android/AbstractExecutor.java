package admob.suite;

public abstract class AbstractExecutor {
    protected AdMob plugin;

    public AbstractExecutor(AdMob plugin) {
        this.plugin = plugin;
    }

    public void destroy() {
        this.plugin = null;
    }
}
