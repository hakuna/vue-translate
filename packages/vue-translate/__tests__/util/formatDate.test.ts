import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { formatDate, DEFAULT_DATE_OPTIONS } from "../../src/util/formatDate"

describe("formatDate", () => {
  const testDate = new Date("2023-01-15T12:30:00Z")

  // Spy on Intl.DateTimeFormat
  let formatSpy: any
  let originalDateTimeFormat: any

  beforeEach(() => {
    // Store original implementation
    originalDateTimeFormat = Intl.DateTimeFormat

    // Create a spy on DateTimeFormat's constructor
    formatSpy = vi.fn((locale, options) => {
      // Return a mock formatter object
      return {
        format: () => "formatted-date",
      }
    })

    // Replace the constructor with our spy
    global.Intl.DateTimeFormat = formatSpy as any
  })

  afterEach(() => {
    // Restore original implementation
    global.Intl.DateTimeFormat = originalDateTimeFormat
    vi.clearAllMocks()
  })

  it("uses default options when none provided", () => {
    formatDate(testDate, "en-US", undefined)

    // Check that DateTimeFormat was called with correct arguments
    expect(formatSpy).toHaveBeenCalledWith("en-US", DEFAULT_DATE_OPTIONS)
  })

  it("passes custom options to DateTimeFormat", () => {
    const customOptions = { year: "numeric", month: "short", day: "2-digit" } as const
    formatDate(testDate, "en-US", customOptions)

    expect(formatSpy).toHaveBeenCalledWith("en-US", customOptions)
  })

  it("passes locale to DateTimeFormat", () => {
    formatDate(testDate, "de-DE", undefined)

    expect(formatSpy).toHaveBeenCalledWith("de-DE", DEFAULT_DATE_OPTIONS)
  })

  it("returns null when DateTimeFormat throws an error", () => {
    // Make the constructor throw an error
    global.Intl.DateTimeFormat = vi.fn(() => {
      throw new Error("Format error")
    }) as any

    const result = formatDate(testDate, "en-US", undefined)

    expect(result).toBeNull()
  })
})
