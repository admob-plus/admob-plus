package admob.plus.cordova.ads;

import admob.plus.cordova.ExecuteContext;

public interface GenericAd {
    boolean isLoaded();

    void load(ExecuteContext ctx);

    void show(ExecuteContext ctx);

    default void hide(ExecuteContext ctx) {
        ctx.error("Not implemented");
    }
}
