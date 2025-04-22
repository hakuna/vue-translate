import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { formatNumber, DEFAULT_NUMBER_OPTIONS } from "../../src/util/formatNumber"

describe("formatNumber", () => {
  // Spy on Intl.NumberFormat
  let formatSpy: any
  let originalNumberFormat: any

  beforeEach(() => {
    // Store original implementation
    originalNumberFormat = Intl.NumberFormat

    // Create a spy on NumberFormat's constructor
    formatSpy = vi.fn((locale, options) => {
      // Return a mock formatter object
      return {
        format: () => "formatted-number",
      }
    })

    // Replace the constructor with our spy
    global.Intl.NumberFormat = formatSpy as any
  })

  afterEach(() => {
    // Restore original implementation
    global.Intl.NumberFormat = originalNumberFormat
    vi.clearAllMocks()
  })

  it("uses default options when none provided", () => {
    formatNumber(1234.56, "en-US", undefined)

    // Check that NumberFormat was called with correct arguments
    expect(formatSpy).toHaveBeenCalledWith("en-US", DEFAULT_NUMBER_OPTIONS)
  })

  it("passes custom options to NumberFormat", () => {
    const customOptions = { style: "currency", currency: "USD" } as const
    formatNumber(1234.56, "en-US", customOptions)

    expect(formatSpy).toHaveBeenCalledWith("en-US", customOptions)
  })

  it("passes locale to NumberFormat", () => {
    formatNumber(1234.56, "de-DE", undefined)

    expect(formatSpy).toHaveBeenCalledWith("de-DE", DEFAULT_NUMBER_OPTIONS)
  })

  it("passes different formatting options correctly", () => {
    // Test currency format
    const currencyOptions = { style: "currency", currency: "EUR" } as const
    formatNumber(1234.56, "en-US", currencyOptions)
    expect(formatSpy).toHaveBeenCalledWith("en-US", currencyOptions)

    vi.clearAllMocks()

    // Test percentage format
    const percentOptions = { style: "percent" } as const
    formatNumber(0.3456, "en-US", percentOptions)
    expect(formatSpy).toHaveBeenCalledWith("en-US", percentOptions)
  })

  it("returns null when NumberFormat throws an error", () => {
    // Make the constructor throw an error
    global.Intl.NumberFormat = vi.fn(() => {
      throw new Error("Format error")
    }) as any

    const result = formatNumber(1234.56, "en-US", undefined)

    expect(result).toBeNull()
  })
})
