package admob.suite;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import com.google.android.gms.ads.MobileAds;

import admob.suite.interstitial.InterstitialExecutor;

public class AdMob extends CordovaPlugin {
    private CallbackContext readyCallbackContext = null;
    private InterstitialExecutor interstitialExecutor = null;

    private static final String TEST_APPLICATION_ID = "ca-app-pub-3940256099942544~3347511713";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        interstitialExecutor = new InterstitialExecutor(this);

        MobileAds.initialize(cordova.getActivity(), TEST_APPLICATION_ID);
    }

    @Override
    public boolean execute(String action, JSONArray inputs, CallbackContext callbackContext) throws JSONException {
        if (Actions.READY.equals(action)) {
            readyCallbackContext = callbackContext;

            emit("admob.ready");
            return true;
        } else if (Actions.INTERSTITIAL_PREPARE.equals(action)) {
            return interstitialExecutor.prepare(inputs, callbackContext);
        } else if (Actions.INTERSTITIAL_SHOW.equals(action)) {
            return interstitialExecutor.show(inputs, callbackContext);
        }

        return false;
    }

    @Override
    public void onDestroy() {
        if (interstitialExecutor != null) {
            interstitialExecutor.destroy();
            interstitialExecutor = null;
        }

        readyCallbackContext = null;

        super.onDestroy();
    }

    public void emit(String eventType) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, eventType);
        result.setKeepCallback(true);
        readyCallbackContext.sendPluginResult(result);
    }
}
