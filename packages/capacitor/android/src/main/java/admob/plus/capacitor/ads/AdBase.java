package admob.plus.capacitor.ads;

import admob.plus.core.Ad;
import admob.plus.core.Helper;
import admob.plus.capacitor.ExecuteContext;

import static admob.plus.capacitor.ExecuteContext.plugin;

public class AdBase extends Ad {
    public AdBase(ExecuteContext ctx) {
        super(ctx);
    }

    @Override
    protected Helper.Adapter getAdapter() {
        return plugin;
    }
}
