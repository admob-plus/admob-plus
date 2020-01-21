package cordova.plugin.consent;

public class Consent extends CordovaPlugin {
    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        ConsentInformation consentInformation = ConsentInformation
                .getInstance(cordova.getActivity().getApplicationContext());

        return false;
    }
}
