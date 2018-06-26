package admob.suite;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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


        String applicationID = cordova.getActivity().getIntent().getStringExtra("ADMOB_APPLICATOIN_ID");
        if (applicationID == null || "test".equals(applicationID)) {
            applicationID = TEST_APPLICATION_ID;
        }
        MobileAds.initialize(cordova.getActivity(), applicationID);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        if (Actions.READY.equals(action)) {
            readyCallbackContext = callbackContext;

            emit("admob.ready");
            return true;
        } else if (Actions.INTERSTITIAL_PREPARE.equals(action)) {
            return interstitialExecutor.prepare(args, callbackContext);
        } else if (Actions.INTERSTITIAL_SHOW.equals(action)) {
            return interstitialExecutor.show(args, callbackContext);
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
        JSONObject event = new JSONObject();
        try {
            event.put("type", eventType);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        PluginResult result = new PluginResult(PluginResult.Status.OK, event);
        result.setKeepCallback(true);
        readyCallbackContext.sendPluginResult(result);
    }
}
