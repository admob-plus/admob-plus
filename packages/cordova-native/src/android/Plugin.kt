package admob.plus.cordova.nativead

import admob.plus.cordova.AdMob
import admob.plus.cordova.AdMob.Companion.registerNativeAdViewProviders
import android.util.Log
import org.apache.cordova.CordovaPlugin

class Plugin : CordovaPlugin() {
    override fun pluginInitialize() {
        super.pluginInitialize()
        Log.i(TAG, "Initialize plugin")
        registerNativeAdViewProviders(mapOf(AdMob.NATIVE_VIEW_DEFAULT to AdViewProvider(cordova)))
    }

    companion object {
        private const val TAG = "AdMobNative"
    }
}
