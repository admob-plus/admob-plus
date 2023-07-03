package admob.plus.core

import org.json.JSONObject
import kotlin.test.Test
import kotlin.test.assertEquals

internal class optFloatTest {
    @Test
    fun `value = undefined`() {
        assertEquals(optFloat(JSONObject("{}"), "key"), null)
    }

    @Test
    fun `value = null`() {
        assertEquals(optFloat(JSONObject("""{"v": null}"""), "v"), null)
    }

    @Test
    fun `value = 1`() {
        assertEquals(optFloat(JSONObject("""{"v": 1}"""), "v"), 1.0f)
    }
}

internal class optBooleanToIntTest {
    @Test
    fun `value = undefined`() {
        assertEquals(optBooleanToInt(JSONObject("{}"), "v",1, 2, 3), null)
    }

    @Test
    fun `value = null`() {
        assertEquals(optBooleanToInt(JSONObject("""{"v": null}"""), "v",1, 2, 3), 1)
    }

    @Test
    fun `value = true`() {
        assertEquals(optBooleanToInt(JSONObject("""{"v": true}"""), "v",1, 2, 3), 2)
    }

    @Test
    fun `value = false`() {
        assertEquals(optBooleanToInt(JSONObject("""{"v": false}"""), "v",1, 2, 3), 3)
    }
}
