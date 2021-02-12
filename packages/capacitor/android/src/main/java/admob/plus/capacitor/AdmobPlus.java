package admob.plus.capacitor;

import android.os.Bundle;
import android.provider.Settings;
import android.support.annotation.Nullable;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;

import org.json.JSONException;

@NativePlugin()
public class AdmobPlus extends Plugin {

    @PluginMethod()
    public void isFirebaseTestLabDevice(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("value", isRunningInTestLab());
        call.success(ret);
    }

    @PluginMethod()
    public void interstitial_load(final PluginCall call) {
        final Interstitial interstitial = Ad.createInterstitial(call.getInt("id"), this);
        final AdRequest.Builder builder = createAdRequestBuilder(call);
        bridge.executeOnMainThread(new Runnable() {
            @Override
            public void run() {
                interstitial.load(call.getString("adUnitId"), builder.build());
                call.resolve();
            }
        });
    }

    @PluginMethod()
    public void interstitial_isLoaded(final PluginCall call) {
        Ad ad = getAdOrRejectMissing(call);
        if (ad == null) {
            return;
        }
        final Interstitial interstitial = (Interstitial) ad;
        bridge.executeOnMainThread(new Runnable() {
            @Override
            public void run() {
                final JSObject result = new JSObject();
                result.put("isLoaded", interstitial.isLoaded());
                call.resolve(result);
            }
        });
    }

    @PluginMethod()
    public void interstitial_show(final PluginCall call) {
        Ad ad = getAdOrRejectMissing(call);
        if (ad == null) {
            return;
        }
        final Interstitial interstitial = (Interstitial) ad;
        bridge.executeOnMainThread(new Runnable() {
            @Override
            public void run() {
                interstitial.show();
                call.resolve();
            }
        });
    }

    @Nullable
    private Ad getAdOrRejectMissing(PluginCall call) {
        Integer adId = call.getInt("id");
        Ad ad = Ad.getAdById(adId);
        if (ad == null) {
            call.reject(String.format("can not find ad for %s", adId));
            return null;
        }
        return ad;
    }

    private AdRequest.Builder createAdRequestBuilder(PluginCall call) {
        AdRequest.Builder builder = new AdRequest.Builder();

        JSArray testDevices = call.getArray("testDevices", new JSArray());
        for (int i = 0; i < testDevices.length(); i++) {
            try {
                builder.addTestDevice(testDevices.getString(i));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        if (call.getBoolean("childDirected") != null) {
            builder.tagForChildDirectedTreatment(call.getBoolean("childDirected"));
        }

        Boolean nonPersonalizedAds = call.getBoolean("nonPersonalizedAds");
        if (nonPersonalizedAds != null && nonPersonalizedAds) {
            Bundle extras = new Bundle();
            extras.putString("npa", "1");
            builder.addNetworkExtrasBundle(AdMobAdapter.class, extras);
        }

        return builder;
    }

    private boolean isRunningInTestLab() {
        String testLabSetting = Settings.System.getString(bridge.getContext().getContentResolver(), "firebase.test.lab");
        return "true".equals(testLabSetting);
    }
}
