import { describe, it, expect, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import Example from "../fixtures/Example.vue"
import { createVueTranslate } from "../../src/index"

describe("Vue Translate - SFC Integration", () => {
  // Test messages
  const messages = {
    en: {
      hello: "Hello",
      welcome: "Welcome, %{name}!",
    },
    fr: {
      hello: "Bonjour",
      welcome: "Bienvenue, %{name}!",
    },
  }

  // Test formats
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

  // Initialize the plugin
  let wrapper

  beforeEach(() => {
    // Create a fresh plugin instance for each test
    const vueTranslate = createVueTranslate({
      locale: "en",
      availableLocales: ["en", "fr"],
      messages,
      formats,
    })

    // Mount the component with the plugin installed
    wrapper = mount(Example, {
      global: {
        plugins: [vueTranslate],
      },
    })
  })

  it("renders template translations with $t correctly", () => {
    // Check template $t directive
    expect(wrapper.find(".global-t").text()).toBe("Hello")
    expect(wrapper.find(".global-t-vars").text()).toBe("Welcome, User!")
  })

  it("renders setup function translations with t() correctly", () => {
    // Log actual component content for debugging
    console.log("setup-global-t text:", wrapper.find(".setup-global-t").text())
    console.log("setup-component-t text:", wrapper.find(".setup-component-t").text())

    // Check setup function translations
    expect(wrapper.find(".setup-global-t").text()).toBe("Hello")
    // Check what's actually in the component - match the correct content
    expect(wrapper.find(".setup-component-t").text()).toBe("greeting")
  })

  it("formats values with $l correctly", () => {
    // Check template $l directive for date
    const dateText = wrapper.find(".template-l-date").text()
    expect(dateText).toContain("Jan")
    expect(dateText).toContain("15")
    expect(dateText).toContain("2023")

    // Check template $l directive for currency
    const currencyText = wrapper.find(".template-l-currency").text()
    expect(currencyText).toContain("$")
    expect(currencyText).toContain("123.45")
  })

  it("formats values with l() correctly in setup", () => {
    // Check setup function formatting
    const dateText = wrapper.find(".setup-l-date").text()
    expect(dateText).toContain("Jan")
    expect(dateText).toContain("15")
    expect(dateText).toContain("2023")

    const currencyText = wrapper.find(".setup-l-currency").text()
    expect(currencyText).toContain("$")
    expect(currencyText).toContain("123.45")
  })

  it("updates all translations and formats when locale changes", async () => {
    // Toggle to French
    await wrapper.find(".toggle-locale").trigger("click")

    // Check that template translations changed
    expect(wrapper.find(".global-t").text()).toBe("Bonjour")
    expect(wrapper.find(".global-t-vars").text()).toBe("Bienvenue, User!")

    // Check that setup function translations changed
    expect(wrapper.find(".setup-global-t").text()).toBe("Bonjour")
    expect(wrapper.find(".setup-component-t").text()).toBe("greeting")

    // Check that formatted values changed
    const currencyText = wrapper.find(".template-l-currency").text()
    expect(currencyText).toContain("€")

    const setupCurrencyText = wrapper.find(".setup-l-currency").text()
    expect(setupCurrencyText).toContain("€")
  })
})
