import { describe, it, expect, vi } from "vitest"
import { createVueTranslate, VueTranslateSymbol } from "../src/index"
import { ref } from "vue"

describe("createVueTranslate", () => {
  it("creates an instance with required methods", () => {
    const instance = createVueTranslate({
      locale: "en",
      availableLocales: ["en", "fr"],
      messages: {},
    })

    expect(instance).toHaveProperty("translate")
    expect(instance).toHaveProperty("localize")
    expect(instance).toHaveProperty("install")

    expect(typeof instance.translate).toBe("function")
    expect(typeof instance.localize).toBe("function")
    expect(typeof instance.install).toBe("function")
  })

  it("uses provided options", () => {
    const messages = {
      en: { test: "Test" },
      fr: { test: "Tester" },
    }

    const instance = createVueTranslate({
      locale: "fr",
      availableLocales: ["en", "fr"],
      messages,
      showMissingTranslationWarnings: true,
    })

    // We can test the translate function directly
    const result = instance.translate("test")
    expect(result).toBe("Tester") // Should use the French translation
  })

  it("provides proper Vue plugin installation", () => {
    const app = {
      provide: vi.fn(),
      config: {
        globalProperties: {},
      },
    }

    const instance = createVueTranslate({
      locale: "en",
      availableLocales: ["en"],
      messages: {},
    })

    instance.install(app)

    // Should provide the translation state using the symbol
    expect(app.provide).toHaveBeenCalledWith(VueTranslateSymbol, expect.anything())

    // Should add global properties
    expect(app.config.globalProperties).toBeDefined()
    expect("$t" in app.config.globalProperties).toBe(true)
    expect("$l" in app.config.globalProperties).toBe(true)
    expect(typeof app.config.globalProperties["$t"]).toBe("function")
    expect(typeof app.config.globalProperties["$l"]).toBe("function")
  })

  it("creates reactive locale ref", () => {
    const instance = createVueTranslate({
      locale: "en",
      availableLocales: ["en", "fr"],
      messages: {},
    })

    // Install to a mock app to get access to the provided state
    let providedState
    const app = {
      provide: (symbol, state) => {
        if (symbol === VueTranslateSymbol) {
          providedState = state
        }
      },
      config: { globalProperties: {} },
    }

    instance.install(app)

    // Verify that locale is a ref
    expect(providedState.locale).toHaveProperty("value")
    expect(providedState.locale.value).toBe("en")

    // Should be able to update the locale
    providedState.locale.value = "fr"
    expect(providedState.locale.value).toBe("fr")
  })
})
