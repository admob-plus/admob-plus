package admob.suite;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

public class AdMobPlugin extends CordovaPlugin {
    private CallbackContext readyCallbackContext = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray inputs, CallbackContext callbackContext) throws JSONException {
        if (Actions.READY.equals(action)) {
            readyCallbackContext = callbackContext;

            emit("admob.ready");
            return true;
        } else if (Actions.INTERSTITIAL_PREPARE.equals(action)) {
            return true;
        } else if (Actions.INTERSTITIAL_SHOW.equals(action)) {
            return true;
        }

        return false;
    }

    private void emit(String eventType) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, eventType);
        result.setKeepCallback(true);
        readyCallbackContext.sendPluginResult(result);
    }
}
