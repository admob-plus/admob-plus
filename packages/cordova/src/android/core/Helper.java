package admob.plus.core;

import static admob.plus.core.UtilKt.md5;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.provider.Settings;
import android.util.SparseArray;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.RequestConfiguration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Helper {
    public static final SparseArray<Ad> ads = new SparseArray<Ad>();
    private final Adapter adapter;

    public Helper(Adapter adapter) {
        this.adapter = adapter;
    }

    public static Ad getAd(Integer id) {
        return ads.get(id);
    }

    @Nullable
    public static ViewGroup getParentView(@Nullable View view) {
        return view == null ? null : (ViewGroup) view.getParent();
    }

    @Nullable
    public static ViewGroup removeFromParentView(@Nullable View view) {
        ViewGroup viewParent = getParentView(view);
        if (viewParent != null) viewParent.removeView(view);
        return viewParent;
    }

    public static void NOT_IMPLEMENTED() {
        throw new UnsupportedOperationException("Not implemented.");
    }

    public Activity getActivity() {
        return adapter.getActivity();
    }

    public boolean isRunningInTestLab() {
        String testLabSetting = Settings.System.getString(getActivity().getContentResolver(), "firebase.test.lab");
        return "true".equals(testLabSetting);
    }

    public void configForTestLab() {
        if (!isRunningInTestLab()) {
            return;
        }
        RequestConfiguration config = MobileAds.getRequestConfiguration();
        List<String> testDeviceIds = config.getTestDeviceIds();

        final String deviceId = getDeviceId();
        if (testDeviceIds.contains(deviceId)) {
            return;
        }
        testDeviceIds.add(deviceId);

        RequestConfiguration.Builder builder = config.toBuilder();
        builder.setTestDeviceIds(testDeviceIds);
        MobileAds.setRequestConfiguration(builder.build());
    }

    @NonNull
    private String getDeviceId() {
        // This will request test ads on the emulator and device by passing this hashed device ID.
        @SuppressLint("HardwareIds") String ANDROID_ID = Settings.Secure.getString(getActivity().getContentResolver(), Settings.Secure.ANDROID_ID);
        return md5(ANDROID_ID).toUpperCase();
    }

    public interface Adapter {
        Activity getActivity();

        void emit(String eventName, Map<String, Object> data);

        default void emit(String eventName) {
            emit(eventName, new HashMap<>());
        }
    }
}
