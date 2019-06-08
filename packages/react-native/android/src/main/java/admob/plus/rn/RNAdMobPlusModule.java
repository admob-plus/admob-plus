
package admob.plus.rn;

import android.provider.Settings;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

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
  public void isTestDevice(Promise promise) {
    try {
      String testLabSetting = Settings.System.getString(getReactApplicationContext().getContentResolver(), "firebase.test.lab");
      promise.resolve("true".equals(testLabSetting));
    } catch (Exception e) {
      promise.reject(e);
    }
  }
}
