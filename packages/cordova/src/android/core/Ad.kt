package admob.plus.core

import android.app.Activity
import android.view.ViewGroup
import com.google.android.gms.ads.AdError
import com.google.android.gms.ads.rewarded.RewardItem

interface Adapter {
    val activity: Activity

    val contentView: ViewGroup? get() = activity.findViewById(android.R.id.content)

    fun emit(eventName: String, data: Map<String, Any?> = mapOf())
}

interface Ad {
    val adapter: Adapter
    val id: String

    val isLoaded: Boolean
        get() = TODO("Not yet implemented")

    fun load(ctx: Context) {
        TODO("Not yet implemented")
    }

    fun show(ctx: Context) {
        TODO("Not yet implemented")
    }

    fun hide(ctx: Context) {
        TODO("Not yet implemented")
    }

    fun emit(eventName: String, data: Map<String, Any?> = mapOf()) {
        adapter.emit(eventName, mapOf("adId" to id) + data)
    }

    fun emit(eventName: String, error: AdError) {
        emit(
            eventName, mapOf(
                "code" to error.code,
                "message" to error.message,
                "cause" to error.cause,
            )
        )
    }

    fun emit(eventName: String, rewardItem: RewardItem) {
        emit(
            eventName, mapOf(
                "reward" to mapOf(
                    "amount" to rewardItem.amount,
                    "type" to rewardItem.type,
                )
            )
        )
    }
}

