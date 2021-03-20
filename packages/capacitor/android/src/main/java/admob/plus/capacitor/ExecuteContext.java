package admob.plus.capacitor;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.getcapacitor.PluginCall;
import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdRequest;

import java.lang.reflect.InvocationTargetException;

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
