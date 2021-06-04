package admob.plus.cordova.nativead;

import android.app.Application;
import android.content.res.Resources;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.google.android.gms.ads.nativead.MediaView;
import com.google.android.gms.ads.nativead.NativeAd;
import com.google.android.gms.ads.nativead.NativeAdView;

import org.apache.cordova.CordovaInterface;

import admob.plus.cordova.ads.Native;

public class AdViewProvider implements Native.ViewProvider {
    private final CordovaInterface cordova;

    public AdViewProvider(CordovaInterface cordova) {
        super();
        this.cordova = cordova;
    }

    @Override
    public View createView(NativeAd nativeAd) {
        NativeAdView adView =
                (NativeAdView) cordova.getActivity().getLayoutInflater()
                        .inflate(getResourceId("ad_unified", "layout"), null);
        // Set the media view.
        adView.setMediaView((MediaView) adView.findViewById(id("ad_media")));

        // Set other ad assets.
        adView.setHeadlineView(adView.findViewById(id("ad_headline")));
        adView.setBodyView(adView.findViewById(id("ad_body")));
        adView.setCallToActionView(adView.findViewById(id("ad_call_to_action")));
        adView.setIconView(adView.findViewById(id("ad_app_icon")));
        adView.setPriceView(adView.findViewById(id("ad_price")));
        adView.setStarRatingView(adView.findViewById(id("ad_stars")));
        adView.setStoreView(adView.findViewById(id("ad_store")));
        adView.setAdvertiserView(adView.findViewById(id("ad_advertiser")));

        // The headline and mediaContent are guaranteed to be in every NativeAd.
        ((TextView) adView.getHeadlineView()).setText(nativeAd.getHeadline());
        adView.getMediaView().setMediaContent(nativeAd.getMediaContent());

        // These assets aren't guaranteed to be in every NativeAd, so it's important to
        // check before trying to display them.
        if (nativeAd.getBody() == null) {
            adView.getBodyView().setVisibility(View.INVISIBLE);
        } else {
            adView.getBodyView().setVisibility(View.VISIBLE);
            ((TextView) adView.getBodyView()).setText(nativeAd.getBody());
        }

        if (nativeAd.getCallToAction() == null) {
            adView.getCallToActionView().setVisibility(View.INVISIBLE);
        } else {
            adView.getCallToActionView().setVisibility(View.VISIBLE);
            ((Button) adView.getCallToActionView()).setText(nativeAd.getCallToAction());
        }

        if (nativeAd.getIcon() == null) {
            adView.getIconView().setVisibility(View.GONE);
        } else {
            ((ImageView) adView.getIconView()).setImageDrawable(
                    nativeAd.getIcon().getDrawable());
            adView.getIconView().setVisibility(View.VISIBLE);
        }

        if (nativeAd.getPrice() == null) {
            adView.getPriceView().setVisibility(View.INVISIBLE);
        } else {
            adView.getPriceView().setVisibility(View.VISIBLE);
            ((TextView) adView.getPriceView()).setText(nativeAd.getPrice());
        }

        if (nativeAd.getStore() == null) {
            adView.getStoreView().setVisibility(View.INVISIBLE);
        } else {
            adView.getStoreView().setVisibility(View.VISIBLE);
            ((TextView) adView.getStoreView()).setText(nativeAd.getStore());
        }

        if (nativeAd.getStarRating() == null) {
            adView.getStarRatingView().setVisibility(View.INVISIBLE);
        } else {
            ((RatingBar) adView.getStarRatingView())
                    .setRating(nativeAd.getStarRating().floatValue());
            adView.getStarRatingView().setVisibility(View.VISIBLE);
        }

        if (nativeAd.getAdvertiser() == null) {
            adView.getAdvertiserView().setVisibility(View.INVISIBLE);
        } else {
            ((TextView) adView.getAdvertiserView()).setText(nativeAd.getAdvertiser());
            adView.getAdvertiserView().setVisibility(View.VISIBLE);
        }

        // This method tells the Google Mobile Ads SDK that you have finished populating your
        // native ad view with this native ad.
        adView.setNativeAd(nativeAd);

        return adView;
    }

    private int getResourceId(final String name, final String defType) {
        Application app = cordova.getActivity().getApplication();
        String package_name = app.getPackageName();
        Resources resources = app.getResources();
        return resources.getIdentifier(name, defType, package_name);
    }

    private int id(final String name) {
        return getResourceId(name, "id");
    }
}
