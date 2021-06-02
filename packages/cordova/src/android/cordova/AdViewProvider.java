package admob.plus.cordova;

import android.content.Context;
import android.view.View;
import android.widget.Button;

import com.google.android.gms.ads.nativead.NativeAd;

import admob.plus.cordova.ads.Native;

public class AdViewProvider implements Native.ViewProvider {
    @Override
    public View createView(Context context, NativeAd nativeAd) {
        return new Button(context);
    }
}
