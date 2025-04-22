import { describe, it, expect, vi, beforeEach } from "vitest"
import { useTranslate } from "../src/composable"
import * as context from "../src/context"

// Mock the context module
vi.mock("../src/context", () => {
  const state = {
    locale: { value: "en" },
    availableLocales: ["en", "fr", "de"],
    messages: {},
    formats: {},
    showMissingTranslationWarnings: false,
  }

  return {
    getState: vi.fn(() => ({ state, instance: {} })),
    translateKey: vi.fn((key) => `translated:${key}`),
    localizeValue: vi.fn((value) => `localized:${value}`),
    createSetLocale: vi.fn(() => vi.fn()),
  }
})

describe("useTranslate", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns expected interface", () => {
    const result = useTranslate()

    expect(result).toHaveProperty("t")
    expect(result).toHaveProperty("l")
    expect(result).toHaveProperty("locale")
    expect(result).toHaveProperty("availableLocales")
    expect(result).toHaveProperty("setLocale")

    expect(typeof result.t).toBe("function")
    expect(typeof result.l).toBe("function")
    expect(typeof result.setLocale).toBe("function")
    expect(Array.isArray(result.availableLocales)).toBe(true)
  })

  it("returns correct locale information", () => {
    const result = useTranslate()

    expect(result.locale.value).toBe("en")
    expect(result.availableLocales).toEqual(["en", "fr", "de"])
  })

  it("calls translateKey with correct parameters when t() is called", () => {
    const result = useTranslate()
    const variables = { name: "test" }

    result.t("test.key", variables)

    expect(context.translateKey).toHaveBeenCalledWith(
      "test.key",
      variables,
      expect.anything(),
      expect.anything()
    )
  })

  it("calls localizeValue with correct parameters when l() is called", () => {
    const result = useTranslate()
    const date = new Date()
    const format = "short"

    result.l(date, format)

    expect(context.localizeValue).toHaveBeenCalledWith(date, format, expect.anything())
  })

  it("calls createSetLocale to get setLocale function", () => {
    useTranslate()

    expect(context.createSetLocale).toHaveBeenCalled()
  })
})
