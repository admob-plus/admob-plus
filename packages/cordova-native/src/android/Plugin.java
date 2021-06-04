package admob.plus.cordova.nativead;

import android.util.Log;

import org.apache.cordova.CordovaPlugin;

import java.util.HashMap;

import admob.plus.cordova.AdMob;
import admob.plus.cordova.ads.Native;

public class Plugin extends CordovaPlugin {
    private static final String TAG = "AdMobNative";

    @Override
    protected void pluginInitialize() {
        super.pluginInitialize();
        Log.i(TAG, "Initialize plugin");

        AdMob.registerNativeAdViewProviders(new HashMap<String, Native.ViewProvider>() {{
            put("default", new AdViewProvider(cordova));
        }});
    }
}
