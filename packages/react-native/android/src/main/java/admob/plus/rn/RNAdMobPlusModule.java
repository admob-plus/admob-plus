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

import admob.plus.rn.ads.Interstitial;
import admob.plus.rn.ads.Rewarded;
import admob.plus.rn.ads.RewardedInterstitial;

public class RNAdMobPlusModule extends ReactContextBaseJavaModule {

    public final ReactApplicationContext reactContext;

    public RNAdMobPlusModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        ExecuteContext.plugin = this;
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

    @ReactMethod
    public void interstitialLoad(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            Interstitial ad = ctx.optAdOrCreate(Interstitial.class);
            if (ad != null) {
                ad.load(ctx);
            }
        });
    }

    @ReactMethod
    public void interstitialShow(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            Interstitial ad = (Interstitial) ctx.optAdOrError();
            if (ad != null) {
                ad.show(ctx);
            }
        });
    }

    @ReactMethod
    public void rewardedLoad(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            Rewarded ad = ctx.optAdOrCreate(Rewarded.class);
            if (ad != null) {
                ad.load(ctx);
            }
        });
    }

    @ReactMethod
    public void rewardedShow(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            Rewarded ad = (Rewarded) ctx.optAdOrError();
            if (ad != null) {
                ad.show(ctx);
            }
        });
    }

    @ReactMethod
    public void rewardedInterstitialLoad(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            RewardedInterstitial ad = ctx.optAdOrCreate(RewardedInterstitial.class);
            if (ad != null) {
                ad.load(ctx);
            }
        });
    }

    @ReactMethod
    public void rewardedInterstitialShow(ReadableMap opts, Promise promise) {
        final ExecuteContext ctx = new ExecuteContext(opts, promise);

        new Handler(Looper.getMainLooper()).post(() -> {
            RewardedInterstitial ad = (RewardedInterstitial) ctx.optAdOrError();
            if (ad != null) {
                ad.show(ctx);
            }
        });
    }

    public void emit(String eventName, @Nullable WritableMap params) {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
