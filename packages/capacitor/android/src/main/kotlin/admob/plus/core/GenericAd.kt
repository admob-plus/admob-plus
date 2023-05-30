package admob.plus.core

interface GenericAd {
    val isLoaded: Boolean
        get() {
            Helper.Companion.NOT_IMPLEMENTED()
            return false
        }

    fun load(ctx: Context?) {
        Helper.Companion.NOT_IMPLEMENTED()
    }

    fun show(ctx: Context?) {
        Helper.Companion.NOT_IMPLEMENTED()
    }

    fun hide(ctx: Context?) {
        Helper.Companion.NOT_IMPLEMENTED()
    }
}
