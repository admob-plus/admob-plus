package admob.plus.core

import org.json.JSONObject
import kotlin.test.Test
import kotlin.test.assertEquals

internal class optFloatTest {
    @Test
    fun `return null for undefined key`() {
        assertEquals(optFloat(JSONObject("{}"), "key"), null)
    }

    @Test
    fun `return float`() {
        assertEquals(optFloat(JSONObject("{\"v\": 1}"), "v"), 1.0f)
    }
}

internal class optBooleanToIntTest {
    @Test
    fun `value =  undefined`() {
        assertEquals(optBooleanToInt(JSONObject("{}"), "v",1, 2, 3), null)
    }

    @Test
    fun `value =  null`() {
        assertEquals(optBooleanToInt(JSONObject("""{"v": null}"""), "v",1, 2, 3), 1)
    }

    @Test
    fun `value = true`() {
        assertEquals(optBooleanToInt(JSONObject("""{"v": true}"""), "v",1, 2, 3), 2)
    }

    @Test
    fun `value =  false`() {
        assertEquals(optBooleanToInt(JSONObject("""{"v": false}"""), "v",1, 2, 3), 3)
    }
}
