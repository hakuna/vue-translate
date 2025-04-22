import { describe, it, expect, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"
import { createVueTranslate, useTranslate } from "../../src/index"

describe("Vue Translate - Component Level Translations", () => {
  // Global translations
  const messages = {
    en: {
      greeting: "Hello from global",
      shared: "Shared key",
    },
    fr: {
      greeting: "Bonjour du global",
      shared: "Clé partagée",
    },
  }

  // Create a component with local translations
  const LocalComponent = defineComponent({
    // Add component-level translations
    vueTranslate: {
      en: {
        greeting: "Hello from component",
        local: "Local only key",
      },
      fr: {
        greeting: "Bonjour du composant",
        local: "Clé locale uniquement",
      },
    },
    setup() {
      const { t, locale, setLocale } = useTranslate()

      return () =>
        h("div", [
          h("p", { class: "greeting" }, t(".greeting")),
          h("p", { class: "shared" }, t("shared")),
          h("p", { class: "local" }, t(".local")),
          h("p", { class: "missing" }, t("missing.key")),
          h(
            "button",
            {
              class: "toggle-locale",
              onClick: () => setLocale(locale.value === "en" ? "fr" : "en"),
            },
            "Toggle Locale"
          ),
        ])
    },
  })

  // Component without local translations - uses global only
  const GlobalComponent = defineComponent({
    setup() {
      const { t } = useTranslate()

      return () =>
        h("div", [
          h("p", { class: "greeting" }, t("greeting")),
          h("p", { class: "shared" }, t("shared")),
        ])
    },
  })

  // Initialize the plugin
  const vueTranslate = createVueTranslate({
    locale: "en",
    availableLocales: ["en", "fr"],
    messages,
    showMissingTranslationWarnings: false,
  })

  let localWrapper: any
  let globalWrapper: any

  beforeEach(() => {
    // Create a fresh plugin instance for each test
    const freshVueTranslate = createVueTranslate({
      locale: "en",
      availableLocales: ["en", "fr"],
      messages,
      showMissingTranslationWarnings: false,
    })

    // Mount components with the plugin
    localWrapper = mount(LocalComponent, {
      global: {
        plugins: [freshVueTranslate],
      },
    })

    globalWrapper = mount(GlobalComponent, {
      global: {
        plugins: [freshVueTranslate],
      },
    })
  })

  it("prefers component-level translations over global ones", () => {
    // Local component should use its own translation for 'greeting'
    expect(localWrapper.find(".greeting").text()).toContain("Hello")

    // Global component should use global translation
    expect(globalWrapper.find(".greeting").text()).toContain("Hello")
  })

  it("falls back to global translations when key not in component translations", () => {
    expect(localWrapper.find(".shared").text()).toBe("Shared key")
  })

  it("can use component-only keys", () => {
    expect(localWrapper.find(".local").text()).toBe("Local only key")
  })

  it("returns the key itself when translation is missing in both component and global", () => {
    expect(localWrapper.find(".missing").text()).toBe("missing.key")
  })

  it("updates component translations when locale changes", async () => {
    // Click the toggle locale button to switch to French
    await localWrapper.find(".toggle-locale").trigger("click")

    // Should update to French translations
    expect(localWrapper.find(".greeting").text()).toContain("Bonjour")
    expect(localWrapper.find(".shared").text()).toContain("partagée")
    expect(localWrapper.find(".local").text()).toContain("locale")
  })
})
