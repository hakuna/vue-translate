import { describe, it, expect, vi } from "vitest"
import { createVueTranslate } from "../src/index"

describe("Vue Translate Options", () => {
  it("applies default values for optional settings", () => {
    // Create with minimal required options
    const instance = createVueTranslate({
      locale: "en",
      availableLocales: ["en"],
    })

    // Install to app to extract state
    let state: any
    const app = {
      provide: (_symbol: any, value: any) => {
        state = value
      },
      config: { globalProperties: {} },
    }
    instance.install(app)

    // Verify defaults were applied
    expect(state.showMissingTranslationWarnings).toBe(false)
    expect(state.messages).toEqual({})
    expect(state.formats).toEqual({ date: {}, number: {} })
  })

  it("properly configures warning behavior", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    // Create instance with warnings enabled
    const instance = createVueTranslate({
      locale: "en",
      availableLocales: ["en"],
      showMissingTranslationWarnings: true,
    })

    // Attempt to translate a missing key
    instance.translate("missing.key")

    // Should show warning
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Missing global translation for key"),
      expect.stringContaining("en.missing.key")
    )

    // Reset and create instance with warnings disabled
    consoleSpy.mockReset()
    const instance2 = createVueTranslate({
      locale: "en",
      availableLocales: ["en"],
      showMissingTranslationWarnings: false,
    })

    // Attempt to translate missing key
    instance2.translate("missing.key")

    // Should not show warning
    expect(consoleSpy).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it("makes locale reactive", () => {
    const instance = createVueTranslate({
      locale: "en",
      availableLocales: ["en", "fr"],
      messages: {
        en: { hello: "Hello" },
        fr: { hello: "Bonjour" },
      },
    })

    // Initial translation should be in English
    expect(instance.translate("hello")).toBe("Hello")

    // Install to app to get state
    let state: any
    const app = {
      provide: (_symbol: any, value: any) => {
        state = value
      },
      config: { globalProperties: {} },
    }
    instance.install(app)

    // Change locale
    state.locale.value = "fr"

    // Translation should now be in French
    expect(instance.translate("hello")).toBe("Bonjour")
  })
})
