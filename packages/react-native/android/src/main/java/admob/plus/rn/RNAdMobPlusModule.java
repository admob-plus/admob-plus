package admob.plus.rn;

import com.google.android.gms.ads.MobileAds;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class RNAdMobPlusModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNAdMobPlusModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNAdMobPlus";
    }

    @ReactMethod
    public void start(Promise promise) {
        MobileAds.initialize(reactContext, status -> {
            WritableMap result = Arguments.createMap();
            result.putString("version", MobileAds.getVersionString());
            promise.resolve(result);
        });
    }
}
