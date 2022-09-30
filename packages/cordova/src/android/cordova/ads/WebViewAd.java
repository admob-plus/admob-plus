package admob.plus.cordova.ads;

import android.util.Log;
import android.webkit.WebView;
import android.view.View;

import com.google.android.gms.ads.MobileAds;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewEngine;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.engine.SystemWebView;
import org.apache.cordova.engine.SystemWebViewEngine;

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
        registerWebView();
        ctx.resolve();
    }

    @Override
    public void hide(Context ctx) {
        ctx.resolve();
    }

}