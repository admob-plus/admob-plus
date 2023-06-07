package admob.plus.cordova.webviewad

import android.content.Intent
import android.net.Uri
import android.util.Log
import android.webkit.WebView
import com.google.android.gms.ads.MobileAds
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaInterface
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.CordovaWebView
import org.json.JSONArray
import org.json.JSONException

class Plugin : CordovaPlugin() {
    private val isWebviewAdEnabled: Boolean by lazy {
        preferences.getBoolean("AdMobPlusWebViewAd", true)
    }

    private val isOverrideUrlLoadingEnabled: Boolean by lazy {
        preferences.getBoolean("AdMobPlusOverrideUrlLoading", true)
    }

    override fun initialize(cordova: CordovaInterface, cordovaWebView: CordovaWebView) {
        cordova.activity.runOnUiThread {
            if (isWebviewAdEnabled) {
                val webView = cordovaWebView.view as WebView
                MobileAds.registerWebView(webView)
                webView.reload()
                Log.d(TAG, "Integrated the WebView API for Ads in ${webView.url} WebView")
            }
        }
        super.initialize(cordova, cordovaWebView)
    }

    override fun pluginInitialize() {
        super.pluginInitialize()
        Log.i(TAG, "Initialize plugin")
    }

    @Throws(JSONException::class)
    override fun execute(
        action: String,
        data: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        return false
    }

    override fun onOverrideUrlLoading(url: String): Boolean {
        if (!isOverrideUrlLoadingEnabled) return super.onOverrideUrlLoading(url)

        Log.d(TAG, "onOverrideUrlLoading called with URL $url")
        return try {
            val intent = Intent(Intent.ACTION_VIEW)
            // Omitting the MIME type for file: URLs causes "No Activity found to handle Intent".
            // Adding the MIME type to http: URLs causes them to not be handled by the downloader.
            val uri = Uri.parse(url)
            intent.setData(uri)
            if (uri.scheme in setOf("http", "https") && url != webView.url) {
                cordova.activity.startActivity(intent)
                Log.d(TAG, "Open Iframe URL to browser $url")
                //webView.sendJavascript("cordova.InAppBrowser.open('" + url + "', '_system');");
            } else {
                return false
            }
            true // true prevents navigation navigation
        } catch (e: android.content.ActivityNotFoundException) {
            Log.d(TAG, "onOverrideUrlLoading: Error loading url $url:$e")
            false
        }
    }

    companion object {
        private const val TAG = "AdMobWebViewAd"
    }
}
