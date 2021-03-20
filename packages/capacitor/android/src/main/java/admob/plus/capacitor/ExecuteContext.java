package admob.plus.capacitor;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.getcapacitor.PluginCall;
import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.RequestConfiguration;

import org.json.JSONArray;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import admob.plus.capacitor.ads.AdBase;

public class ExecuteContext {
    public static AdMobPlusPlugin plugin;
    public final PluginCall call;

    ExecuteContext(PluginCall call) {
        this.call = call;
    }

    public int optId() {
        return call.getInt("id");
    }

    @Nullable
    public String optAdUnitID() {
        return call.getString("adUnitId");
    }

    public String optPosition() {
        return call.getString("position");
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

    public AdRequest optAdRequest() {
        AdRequest.Builder builder = new AdRequest.Builder();
        if (call.hasOption("contentUrl")) {
            builder.setContentUrl(call.getString("contentUrl"));
        }
        Bundle extras = new Bundle();
        if (call.hasOption("npa")) {
            extras.putString("npa", call.getString("npa"));
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
    }

    public RequestConfiguration optRequestConfiguration() {
        RequestConfiguration.Builder builder = new RequestConfiguration.Builder();
        if (call.hasOption("maxAdContentRating")) {
            builder.setMaxAdContentRating(call.getString("maxAdContentRating"));
        }
        Integer tagForChildDirectedTreatment = optChildDirectedTreatmentTag();
        if (tagForChildDirectedTreatment != null) {
            builder.setTagForChildDirectedTreatment(tagForChildDirectedTreatment);
        }
        Integer tagForUnderAgeOfConsent = optUnderAgeOfConsentTag();
        if (tagForUnderAgeOfConsent != null) {
            builder.setTagForUnderAgeOfConsent(tagForChildDirectedTreatment);
        }
        if (call.hasOption("testDeviceIds")) {
            List<String> testDeviceIds = new ArrayList<String>();
            JSONArray ids = call.getArray("testDeviceIds");
            for (int i = 0; i < ids.length(); i++) {
                String testDeviceId = ids.optString(i);
                if (testDeviceId != null) {
                    testDeviceIds.add(testDeviceId);
                }
            }
            builder.setTestDeviceIds(testDeviceIds);
        }
        return builder.build();
    }

    @Nullable
    private Integer optChildDirectedTreatmentTag() {
        String name = "tagForChildDirectedTreatment";
        if (!call.hasOption(name)) {
            return null;
        }

        Boolean value = call.getBoolean(name, null);
        if (value == null) {
            return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED;
        }

        if (value) {
            return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE;
        }

        return RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE;
    }

    @Nullable
    private Integer optUnderAgeOfConsentTag() {
        String name = "tagForUnderAgeOfConsent";
        if (!call.hasOption(name)) {
            return null;
        }

        Boolean value = call.getBoolean(name, null);
        if (value == null) {
            return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED;
        }

        if (value) {
            return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE;
        }

        return RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE;
    }

    public Activity getActivity() {
        return plugin.getActivity();
    }

    public void success() {
        call.resolve();
    }

    public void error(String message) {
        call.reject(message);
    }
}
