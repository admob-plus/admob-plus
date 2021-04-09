package admob.plus.rn;

import android.app.Activity;
import android.os.Bundle;
import android.util.SparseArray;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.RequestConfiguration;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import admob.plus.rn.ads.AdBase;

public class ExecuteContext {
    public static final SparseArray<AdBase> ads = new SparseArray<AdBase>();
    public static RNAdMobPlusModule plugin;
    public final ReadableMap opts;
    public final Promise promise;

    ExecuteContext(@Nullable ReadableMap opts, Promise promise) {
        this.opts = opts == null ? Arguments.createMap() : opts;
        this.promise = promise;
    }

    public int optId() {
        return opts.getInt("id");
    }

    @Nullable
    public String optAdUnitID() {
        return opts.getString("adUnitId");
    }

    public String optPosition() {
        return opts.getString("position");
    }

    @Nullable
    public Integer optOffset() {
        if (opts.hasKey("offset")) {
            return opts.getInt("offset");
        }
        return null;
    }

    @Nullable
    public AdBase optAd() {
        return AdBase.getAd(optId());
    }

    @Nullable
    public <T extends AdBase> T optAdOrCreate(Class<T> type) {
        T ad = type.cast(optAd());
        if (ad == null) {
            try {
                ad = type.getDeclaredConstructor(ExecuteContext.class).newInstance(this);
            } catch (IllegalAccessException | InstantiationException | InvocationTargetException | NoSuchMethodException e) {
                e.printStackTrace();
                this.error("Fail to create ad");
            }
        }
        return ad;
    }

    @Nullable
    public AdBase optAdOrError() {
        AdBase ad = optAd();
        if (ad == null) {
            this.error("Ad not found");
        }
        return ad;
    }

    public RequestConfiguration optRequestConfiguration() {
        RequestConfiguration.Builder builder = new RequestConfiguration.Builder();
        if (opts.hasKey("maxAdContentRating")) {
            builder.setMaxAdContentRating(opts.getString("maxAdContentRating"));
        }
        Integer tagForChildDirectedTreatment = optChildDirectedTreatmentTag();
        if (tagForChildDirectedTreatment != null) {
            builder.setTagForChildDirectedTreatment(tagForChildDirectedTreatment);
        }
        Integer tagForUnderAgeOfConsent = optUnderAgeOfConsentTag();
        if (tagForUnderAgeOfConsent != null) {
            builder.setTagForUnderAgeOfConsent(tagForChildDirectedTreatment);
        }
        if (opts.hasKey("testDeviceIds")) {
            List<String> testDeviceIds = new ArrayList<String>();
            ReadableArray ids = opts.getArray("testDeviceIds");
            for (int i = 0; i < Objects.requireNonNull(ids).size(); i++) {
                String testDeviceId = ids.getString(i);
                testDeviceIds.add(testDeviceId);
            }
            builder.setTestDeviceIds(testDeviceIds);
        }
        return builder.build();
    }

    @Nullable
    private Integer optChildDirectedTreatmentTag() {
        String name = "tagForChildDirectedTreatment";
        if (!opts.hasKey(name)) {
            return null;
        }

        if (opts.isNull(name)) {
            return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED;
        }

        if (opts.getBoolean(name)) {
            return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE;
        }

        return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE;
    }

    @Nullable
    private Integer optUnderAgeOfConsentTag() {
        String name = "tagForUnderAgeOfConsent";
        if (!opts.hasKey(name)) {
            return null;
        }

        if (opts.isNull(name)) {
            return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED;
        }

        if (this.opts.getBoolean(name)) {
            return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE;
        }

        return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE;
    }

    @Nullable
    public ServerSideVerificationOptions optServerSideVerificationOptions() {
        final String param = "serverSideVerification";
        if (!opts.hasKey(param)) {
            return null;
        }
        ReadableMap serverSideVerification = opts.getMap(param);
        if (serverSideVerification == null) {
            return null;
        }

        ServerSideVerificationOptions.Builder builder = new ServerSideVerificationOptions.Builder();
        if (serverSideVerification.hasKey("customData")) {
            builder.setCustomData(serverSideVerification.getString("customData"));
        }
        if (serverSideVerification.hasKey("userId")) {
            builder.setUserId(serverSideVerification.getString("userId"));
        }
        return builder.build();
    }

    public AdRequest optAdRequest() {
        AdRequest.Builder builder = new AdRequest.Builder();
        if (opts.hasKey("contentUrl")) {
            builder.setContentUrl(opts.getString("contentUrl"));
        }
        Bundle extras = new Bundle();
        if (opts.hasKey("npa")) {
            extras.putString("npa", opts.getString("npa"));
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
    }

    public AdSize optAdSize() {
        final String name = "size";
        if (!opts.hasKey(name)) {
            return AdSize.SMART_BANNER;
        }
        AdSize adSize = Generated.AdSizeType.getAdSize(opts.getDynamic(name));
        if (adSize != null) {
            return adSize;
        }
        ReadableMap adSizeObj = opts.getMap(name);
        if (adSizeObj == null) {
            return AdSize.SMART_BANNER;
        }
        return new AdSize(adSizeObj.getInt("width"), adSizeObj.getInt("height"));
    }

    public Activity getActivity() {
        return plugin.reactContext.getCurrentActivity();
    }

    public void success() {
        promise.resolve(null);
    }

    public void error(String message) {
        promise.reject("unknown", "Unknown error");
    }
}
