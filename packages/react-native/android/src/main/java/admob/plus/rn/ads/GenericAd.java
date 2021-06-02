package admob.plus.rn.ads;

import admob.plus.rn.ExecuteContext;

public interface GenericAd {
    default boolean isLoaded() {
        return false;
    };

    default void load(ExecuteContext ctx) {
        ctx.error("Not implemented");
    };

    default void show(ExecuteContext ctx) {
        ctx.error("Not implemented");
    };

    default void hide(ExecuteContext ctx) {
        ctx.error("Not implemented");
    }
}
