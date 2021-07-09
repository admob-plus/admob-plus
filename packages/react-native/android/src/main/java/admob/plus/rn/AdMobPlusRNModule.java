package admob.plus.rn;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.ads.MobileAds;

import java.util.Map;

import admob.plus.core.GenericAd;
import admob.plus.core.Helper;
import admob.plus.rn.ads.Interstitial;
import admob.plus.rn.ads.Rewarded;
import admob.plus.rn.ads.RewardedInterstitial;

import static admob.plus.core.Helper.NOT_IMPLEMENTED;

public class AdMobPlusRNModule extends ReactContextBaseJavaModule implements Helper.Adapter {
    public final ReactApplicationContext reactContext;
    public Helper helper;

    public AdMobPlusRNModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        ExecuteContext.plugin = this;
        helper = new Helper(this);
    }

    @Override
    public String getName() {
        return "AdMobPlusRN";
    }

    @ReactMethod
    public void start(Promise promise) {
        MobileAds.initialize(reactContext, status -> {
            helper.configForTestLab();
            WritableMap result = Arguments.createMap();
            result.putString("version", MobileAds.getVersionString());
            promise.resolve(result);
        });
    }

    @ReactMethod
    public void configure(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);
        ctx.configure(helper);
    }

    @ReactMethod
    public void adCreate(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            String adClass = ctx.opts.getString("cls");
            if (adClass == null) {
                ctx.reject("ad cls is missing");
            } else {
                switch (adClass) {
                    case "InterstitialAd":
                        new Interstitial(ctx);
                        break;
                    case "RewardedAd":
                        new Rewarded(ctx);
                        break;
                    case "RewardedInterstitialAd":
                        new RewardedInterstitial(ctx);
                        break;
                    default:
                        ctx.reject("ad cls is not supported: " + adClass);
                }
                ctx.resolve();
            }
        });
    }

    @ReactMethod
    public void adIsLoaded(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            GenericAd ad = (GenericAd) ctx.optAdOrError();
            if (ad != null) {
                ctx.resolve(ad.isLoaded());
            }
        });
    }

    @ReactMethod
    public void adLoad(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            GenericAd ad = (GenericAd) ctx.optAdOrError();
            if (ad != null) {
                ad.load(ctx);
            }
        });
    }

    @ReactMethod
    public void adShow(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            GenericAd ad = (GenericAd) ctx.optAdOrError();
            if (ad != null) {
                if (ad.isLoaded()) {
                    ad.show(ctx);
                } else {
                    ctx.reject("ad is not loaded");
                }
            }
        });
    }

    public void emit(String eventName, @Nullable WritableMap params) {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public Activity getActivity() {
        return getCurrentActivity();
    }

    @Override
    public void emit(String eventName, Map<String, Object> data) {
        NOT_IMPLEMENTED();
    }

    @Override
    public void emit(String eventName) {
        emit(eventName, (WritableMap) null);
    }
}
