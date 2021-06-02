package admob.plus.rn;

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

import admob.plus.rn.ads.GenericAd;
import admob.plus.rn.ads.Interstitial;
import admob.plus.rn.ads.Rewarded;
import admob.plus.rn.ads.RewardedInterstitial;

public class AdMobPlusRNModule extends ReactContextBaseJavaModule {

    public final ReactApplicationContext reactContext;

    public AdMobPlusRNModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        ExecuteContext.plugin = this;
    }

    @Override
    public String getName() {
        return "AdMobPlusRN";
    }

    @ReactMethod
    public void start(Promise promise) {
        MobileAds.initialize(reactContext, status -> {
            WritableMap result = Arguments.createMap();
            result.putString("version", MobileAds.getVersionString());
            promise.resolve(result);
        });
    }

    @ReactMethod
    public void configure(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);
        ctx.error("not implemented");
    }

    @ReactMethod
    public void adCreate(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            String adClass = ctx.opts.getString("cls");
            if (adClass == null) {
                ctx.error("ad cls is missing");
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
                        ctx.error("ad cls is not supported: " + adClass);
                }
                ctx.success();
            }
        });
    }

    @ReactMethod
    public void adIsLoaded(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            GenericAd ad = (GenericAd) ctx.optAdOrError();
            if (ad != null) {
                ctx.success(ad.isLoaded());
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
                    ctx.error("ad is not loaded");
                }
            }
        });
    }

    public void emit(String eventName, @Nullable WritableMap params) {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
