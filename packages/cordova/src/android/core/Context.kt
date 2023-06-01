package admob.plus.core

import android.app.Activity
import android.os.Bundle
import com.google.ads.mediation.admob.AdMobAdapter
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.RequestConfiguration
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions
import org.json.JSONObject

val ads = mutableMapOf<String, Ad>()

interface Context {
    val activity: Activity

    fun has(name: String): Boolean

    fun optBoolean(name: String): Boolean?

    fun optBooleanToInt(name: String, vNull: Int, vTrue: Int, vFalse: Int): Int? {
        if (!has(name)) return null
        val v = optBoolean(name) ?: return vNull
        return if (v) vTrue else vFalse
    }

    fun optDouble(name: String): Double?
    fun optDouble(name: String, defaultValue: Double): Double {
        return optDouble(name) ?: defaultValue
    }

    fun optFloat(name: String): Float? {
        val v = optDouble(name) ?: return null
        return v.toFloat()
    }

    fun optInt(name: String): Int?

    fun optString(name: String): String?
    fun optStringList(name: String): List<String>?
    fun optObject(name: String): JSONObject?

    fun optId(): String? {
        return optInt("id")?.toString()
    }

    fun optAd(): Ad? {
        return optId()?.let {
            ads[it]
        }
    }

    fun optAdOrReject(): Ad? {
        return optAd() ?: let {
            reject("Ad not found")
            null
        }
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
        optString("contentUrl")?.let {
            builder.setContentUrl(it)
        }
        val extras = Bundle()
        if (has("npa")) {
            extras.putString("npa", optString("npa"))
        }
        return builder.addNetworkExtrasBundle(AdMobAdapter::class.java, extras).build()
    }

    fun optRequestConfiguration(): RequestConfiguration {
        val builder = RequestConfiguration.Builder()
        optString("maxAdContentRating")?.let {
            builder.setMaxAdContentRating(it)
        }
        optBooleanToInt(
            "tagForChildDirectedTreatment",
            RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED,
            RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE,
            RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE
        )?.let {
            builder.setTagForChildDirectedTreatment(it)
        }
        optBooleanToInt(
            "tagForUnderAgeOfConsent",
            RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED,
            RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE,
            RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE
        )?.let {
            builder.setTagForUnderAgeOfConsent(it)
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

    fun resolve()
    fun resolve(data: Boolean)

    fun reject(msg: String? = "unknown error")

    fun emit(eventName: String, data: Map<String, Any> = mapOf())

    fun configure() {
        optAppMuted()?.let {
            MobileAds.setAppMuted(it)
        }
        optAppVolume()?.let {
            MobileAds.setAppVolume(it)
        }
        MobileAds.setRequestConfiguration(optRequestConfiguration())
        configForTestLabIfNeeded(activity)
    }
}
