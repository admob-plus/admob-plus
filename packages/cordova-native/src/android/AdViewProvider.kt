package admob.plus.cordova.nativead

import admob.plus.cordova.ads.Native
import admob.plus.cordova.ads.Native.ViewProvider
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.RatingBar
import android.widget.TextView
import com.google.android.gms.ads.nativead.MediaView
import com.google.android.gms.ads.nativead.NativeAd
import com.google.android.gms.ads.nativead.NativeAdView
import org.apache.cordova.CordovaInterface

class AdViewProvider(private val cordova: CordovaInterface) : ViewProvider {
    override fun createView(nativeAd: NativeAd): View {
        val adView = cordova.activity.layoutInflater
            .inflate(getResourceId("ad_unified", "layout"), null) as NativeAdView
        // Set the media view.
        adView.mediaView =
            adView.findViewById<View>(id("ad_media")) as MediaView

        // Set other ad assets.
        adView.headlineView = adView.findViewById(id("ad_headline"))
        adView.bodyView = adView.findViewById(id("ad_body"))
        adView.callToActionView = adView.findViewById(id("ad_call_to_action"))
        adView.iconView = adView.findViewById(id("ad_app_icon"))
        adView.priceView = adView.findViewById(id("ad_price"))
        adView.starRatingView = adView.findViewById(id("ad_stars"))
        adView.storeView = adView.findViewById(id("ad_store"))
        adView.advertiserView = adView.findViewById(id("ad_advertiser"))

        // The headline and mediaContent are guaranteed to be in every NativeAd.
        (adView.headlineView as TextView?)!!.text = nativeAd.headline
        adView.mediaView!!.mediaContent = nativeAd.mediaContent

        // These assets aren't guaranteed to be in every NativeAd, so it's important to
        // check before trying to display them.
        if (nativeAd.body == null) {
            adView.bodyView!!.visibility = View.INVISIBLE
        } else {
            adView.bodyView!!.visibility = View.VISIBLE
            (adView.bodyView as TextView?)!!.text = nativeAd.body
        }
        if (nativeAd.callToAction == null) {
            adView.callToActionView!!.visibility = View.INVISIBLE
        } else {
            adView.callToActionView!!.visibility = View.VISIBLE
            (adView.callToActionView as Button?)!!.text = nativeAd.callToAction
        }
        if (nativeAd.icon == null) {
            adView.iconView!!.visibility = View.GONE
        } else {
            (adView.iconView as ImageView?)!!.setImageDrawable(
                nativeAd.icon!!.drawable
            )
            adView.iconView!!.visibility = View.VISIBLE
        }
        if (nativeAd.price == null) {
            adView.priceView!!.visibility = View.INVISIBLE
        } else {
            adView.priceView!!.visibility = View.VISIBLE
            (adView.priceView as TextView?)!!.text = nativeAd.price
        }
        if (nativeAd.store == null) {
            adView.storeView!!.visibility = View.INVISIBLE
        } else {
            adView.storeView!!.visibility = View.VISIBLE
            (adView.storeView as TextView?)!!.text = nativeAd.store
        }
        if (nativeAd.starRating == null) {
            adView.starRatingView!!.visibility = View.INVISIBLE
        } else {
            (adView.starRatingView as RatingBar?)!!.rating = nativeAd.starRating!!.toFloat()
            adView.starRatingView!!.visibility = View.VISIBLE
        }
        if (nativeAd.advertiser == null) {
            adView.advertiserView!!.visibility = View.INVISIBLE
        } else {
            (adView.advertiserView as TextView?)!!.text = nativeAd.advertiser
            adView.advertiserView!!.visibility = View.VISIBLE
        }

        // This method tells the Google Mobile Ads SDK that you have finished populating your
        // native ad view with this native ad.
        adView.setNativeAd(nativeAd)
        return adView
    }

    private fun getResourceId(name: String, defType: String): Int {
        val app = cordova.activity.application
        val package_name = app.packageName
        val resources = app.resources
        return resources.getIdentifier(name, defType, package_name)
    }

    private fun id(name: String): Int {
        return getResourceId(name, "id")
    }

    override fun didShow(ad: Native) {}
    override fun didHide(ad: Native) {}
}
