import { describe, it, expect, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"
import { createVueTranslate, useTranslate } from "../../src/index"

describe("Vue Translate - Integration", () => {
  const messages = {
    en: {
      hello: "Hello",
      welcome: "Welcome, %{name}!",
      items: {
        zero: "No items",
        one: "%{count} item",
        other: "%{count} items",
      },
      nested: {
        key: "Nested translation",
      },
    },
    fr: {
      hello: "Bonjour",
      welcome: "Bienvenue, %{name}!",
      items: {
        zero: "Aucun élément",
        one: "%{count} élément",
        other: "%{count} éléments",
      },
      nested: {
        key: "Traduction imbriquée",
      },
    },
  }

  const formats = {
    en: {
      date: {
        short: { month: "short" as const, day: "numeric" as const, year: "numeric" as const },
      },
      number: {
        currency: { style: "currency" as const, currency: "USD" },
      },
    },
    fr: {
      date: {
        short: { month: "short" as const, day: "numeric" as const, year: "numeric" as const },
      },
      number: {
        currency: { style: "currency" as const, currency: "EUR" },
      },
    },
  }

  // Create a simple test component using the translate function
  const TestComponent = defineComponent({
    setup() {
      const { t, l, locale, availableLocales, setLocale } = useTranslate()

      return () =>
        h("div", [
          h("p", { class: "greeting" }, t("hello")),
          h("p", { class: "welcome" }, t("welcome", { name: "User" })),
          h("p", { class: "items-0" }, t("items", { count: 0 })),
          h("p", { class: "items-1" }, t("items", { count: 1 })),
          h("p", { class: "items-2" }, t("items", { count: 2 })),
          h("p", { class: "nested" }, t("nested.key")),
          h("p", { class: "date" }, l(new Date("2023-01-15"), "short")),
          h("p", { class: "currency" }, l(123.45, "currency")),
          h(
            "button",
            {
              class: "toggle-locale",
              onClick: () => setLocale(locale.value === "en" ? "fr" : "en"),
            },
            "Toggle Locale"
          ),
          h(
            "select",
            {
              value: locale.value,
              onChange: (e: any) => setLocale(e.target.value),
            },
            availableLocales.map((loc) => h("option", { value: loc }, loc))
          ),
        ])
    },
  })

  // Initialize the plugin
  const vueTranslate = createVueTranslate({
    locale: "en",
    availableLocales: ["en", "fr"],
    messages,
    formats,
  })

  let wrapper: any

  beforeEach(() => {
    // Reset locale to English
    vueTranslate.translate("hello") // Access the instance to ensure default locale is reset

    // Mount the component with the plugin installed
    wrapper = mount(TestComponent, {
      global: {
        plugins: [vueTranslate],
      },
    })
  })

  it("renders translations correctly with English locale", () => {
    expect(wrapper.find(".greeting").text()).toBe("Hello")
    expect(wrapper.find(".welcome").text()).toBe("Welcome, User!")
    expect(wrapper.find(".items-0").text()).toBe("No items")
    expect(wrapper.find(".items-1").text()).toBe("1 item")
    expect(wrapper.find(".items-2").text()).toBe("2 items")
    expect(wrapper.find(".nested").text()).toBe("Nested translation")
  })

  it("formats date and currency correctly with English locale", () => {
    const dateText = wrapper.find(".date").text()
    expect(dateText).toContain("Jan")
    expect(dateText).toContain("15")
    expect(dateText).toContain("2023")

    const currencyText = wrapper.find(".currency").text()
    expect(currencyText).toContain("$")
    expect(currencyText).toContain("123.45")
  })

  it("changes translations when locale changes", async () => {
    // Click the toggle locale button to switch to French
    await wrapper.find(".toggle-locale").trigger("click")

    // Check that the translations have changed to French
    expect(wrapper.find(".greeting").text()).toBe("Bonjour")
    expect(wrapper.find(".welcome").text()).toBe("Bienvenue, User!")
    expect(wrapper.find(".items-0").text()).toBe("Aucun élément")
    expect(wrapper.find(".items-1").text()).toBe("1 élément")
    expect(wrapper.find(".items-2").text()).toBe("2 éléments")
    expect(wrapper.find(".nested").text()).toBe("Traduction imbriquée")

    // Check that formatting has changed to French style
    const currencyText = wrapper.find(".currency").text()
    expect(currencyText).toContain("€")
  })
})
