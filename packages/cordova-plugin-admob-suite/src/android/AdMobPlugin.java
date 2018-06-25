package admob.suite;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

public class AdMobPlugin extends CordovaPlugin {
    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray inputs, CallbackContext callbackContext) throws JSONException {
        if (Actions.READY.equals(action)) {
            return true;
        } else if (Actions.INTERSTITIAL_PREPARE.equals(action)) {
            return true;
        } else if (Actions.INTERSTITIAL_SHOW.equals(action)) {
            return true;
        }

        return false;
    }
}
