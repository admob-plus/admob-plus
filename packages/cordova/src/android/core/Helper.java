package admob.plus.core;

import android.app.Activity;
import android.util.SparseArray;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;

import java.util.HashMap;
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
        return UtilKt.isRunningInTestLab(getActivity());
    }

    public void configForTestLab() {
        UtilKt.configForTestLab(getActivity());
    }

    public interface Adapter {
        Activity getActivity();

        void emit(String eventName, Map<String, Object> data);

        default void emit(String eventName) {
            emit(eventName, new HashMap<>());
        }
    }
}
