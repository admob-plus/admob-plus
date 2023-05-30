package admob.plus.core

import android.os.Bundle
import com.google.ads.mediation.admob.AdMobAdapter
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.RequestConfiguration
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions
import org.json.JSONObject
import java.util.Objects

interface Context {
    fun has(name: String): Boolean
    fun opt(name: String): Any?
    fun optBoolean(name: String): Boolean?
    fun optDouble(name: String): Double?
    fun optDouble(name: String, defaultValue: Double): Double {
        return optDouble(name) ?: return defaultValue
    }

    fun optFloat(name: String): Float? {
        val v = optDouble(name) ?: return null
        return v.toFloat()
    }

    fun optInt(name: String): Int?
    fun optString(name: String): String?
    fun optStringList(name: String): List<String?>
    fun optObject(name: String): JSONObject?
    fun resolve()
    fun resolve(data: Boolean)
    fun reject(msg: String?)
    fun reject() {
        reject("unknown error")
    }

    fun reject(loadAdError: LoadAdError) {
        reject(loadAdError.message)
    }

    fun optId(): Int? {
        return optInt("id")
    }

    fun optAd(): Ad? {
        return Helper.getAd(optId())
    }

    fun optAdOrError(): Ad? {
        val ad = optAd()
        if (ad == null) {
            this.reject("Ad not found")
        }
        return ad
    }

    fun optAdUnitID(): String? {
        return optString("adUnitId")
    }

    fun optAppMuted(): Boolean? {
        return optBoolean("appMuted")
    }

    fun optAppVolume(): Float? {
        return optFloat("appVolume")
    }

    fun optPosition(): String? {
        return optString("position")
    }

    fun optAdRequest(): AdRequest {
        val builder = AdRequest.Builder()
        if (has("contentUrl")) {
            builder.setContentUrl(Objects.requireNonNull(optString("contentUrl")))
        }
        val extras = Bundle()
        if (has("npa")) {
            extras.putString("npa", optString("npa"))
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter::class.java, extras).build()
    }

    fun optRequestConfiguration(): RequestConfiguration {
        val builder = RequestConfiguration.Builder()
        if (has("maxAdContentRating")) {
            builder.setMaxAdContentRating(optString("maxAdContentRating"))
        }
        val tagForChildDirectedTreatment = intFromBool(
            this, "tagForChildDirectedTreatment",
            RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED,
            RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE,
            RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE
        )
        if (tagForChildDirectedTreatment != null) {
            builder.setTagForChildDirectedTreatment(tagForChildDirectedTreatment)
        }
        val tagForUnderAgeOfConsent = intFromBool(
            this, "tagForUnderAgeOfConsent",
            RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED,
            RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE,
            RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE
        )
        if (tagForUnderAgeOfConsent != null) {
            builder.setTagForUnderAgeOfConsent(tagForUnderAgeOfConsent)
        }
        if (has("testDeviceIds")) {
            builder.setTestDeviceIds(optStringList("testDeviceIds"))
        }
        return builder.build()
    }

    fun optServerSideVerificationOptions(): ServerSideVerificationOptions? {
        val param = "serverSideVerification"
        val serverSideVerification = optObject(param) ?: return null
        val builder = ServerSideVerificationOptions.Builder()
        if (serverSideVerification.has("customData")) {
            builder.setCustomData(serverSideVerification.optString("customData"))
        }
        if (serverSideVerification.has("userId")) {
            builder.setUserId(serverSideVerification.optString("userId"))
        }
        return builder.build()
    }

    fun configure(helper: Helper) {
        val appMuted = optAppMuted()
        if (appMuted != null) {
            MobileAds.setAppMuted(appMuted)
        }
        val appVolume = optAppVolume()
        if (appVolume != null) {
            MobileAds.setAppVolume(appVolume)
        }
        MobileAds.setRequestConfiguration(optRequestConfiguration())
        helper.configForTestLab()
        resolve()
    }

    companion object {
        fun intFromBool(ctx: Context, name: String, vNull: Int, vTrue: Int, vFalse: Int): Int? {
            if (!ctx.has(name)) return null
            val v = ctx.optBoolean(name) ?: return vNull
            return if (v) vTrue else vFalse
        }
    }
}
