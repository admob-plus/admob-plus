package admob.plus.cordova.ads;

import android.util.Log;

import admob.plus.cordova.ExecuteContext;
import admob.plus.core.Context;

public class WebViewAd extends AdBase {
    private static final String TAG = "AdMobPlus.WebViewAd";

    public WebViewAd(ExecuteContext ctx) {
        super(ctx);
        Log.d(TAG, "WebViewAd");
    }

    @Override
    public boolean isLoaded() {
        return false;
    }

    @Override
    public void load(Context ctx) {
        ctx.resolve();
    }

    @Override
    public void show(Context ctx) {
        ctx.resolve();
    }

    @Override
    public void hide(Context ctx) {
        ctx.resolve();
    }

}