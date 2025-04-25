import { describe, it, expect, vi, beforeEach } from "vitest"
import { getCurrentInstance, inject } from "vue"
import {
  getState,
  findTranslation,
  translateKey,
  translateKeyAsArray,
  createSetLocale,
} from "../src/context"
import { VueTranslateSymbol } from "../src/index"

// Mock Vue injection functionality
vi.mock("vue", () => {
  return {
    getCurrentInstance: vi.fn(),
    inject: vi.fn(),
  }
})

describe("context", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe("translateKey", () => {
    it("returns a translated string", () => {
      // Mock getState to return our test state
      const mockState = {
        locale: { value: "en" },
        messages: {
          en: {
            welcome: "Welcome!",
          },
        },
        showMissingTranslationWarnings: true,
      }

      vi.mocked(getCurrentInstance).mockReturnValue({} as any)
      vi.mocked(inject).mockImplementation((key) => {
        return key === VueTranslateSymbol ? mockState : null
      })

      // Call the function with no variables (so no count parameter)
      const result = translateKey("welcome")

      // Result should be the original array object
      expect(result).toBe("Welcome!")
    })
  })

  describe("translateKeyAsArray", () => {
    it("returns object as is when given array-like translation without count parameter", () => {
      // Mock getState to return our test state
      const mockTranslationObject = ["value 1", "value 2"]
      const mockState = {
        locale: { value: "en" },
        messages: {
          en: {
            array_key: mockTranslationObject,
          },
        },
        showMissingTranslationWarnings: true,
      }

      vi.mocked(getCurrentInstance).mockReturnValue({} as any)
      vi.mocked(inject).mockImplementation((key) => {
        return key === VueTranslateSymbol ? mockState : null
      })

      // Call the function with no variables (so no count parameter)
      const result = translateKeyAsArray("array_key")

      // Result should be the original array object
      expect(result).toBe(mockTranslationObject)
    })
  })

  describe("getState", () => {
    it("throws error when not called in component", () => {
      vi.mocked(getCurrentInstance).mockReturnValue(null)

      expect(() => getState()).toThrow(
        "Function must be called within a setup function or a component"
      )
    })

    it("throws error when plugin is not installed", () => {
      vi.mocked(getCurrentInstance).mockReturnValue({} as any)
      vi.mocked(inject).mockReturnValue(null)

      expect(() => getState()).toThrow("Vue Translate plugin is not installed")
    })

    it("returns state and instance when properly set up", () => {
      // Setup mocks
      const fakeComponent = { id: "component" }
      const fakeState = { locale: { value: "en" } }

      // Setup mock return values
      vi.mocked(getCurrentInstance).mockReturnValue(fakeComponent as any)
      vi.mocked(inject).mockImplementation((key) => {
        return key === VueTranslateSymbol ? fakeState : null
      })

      // Call the function we're testing
      const result = getState()

      // Verify the results
      expect(result.state).toBe(fakeState)
      expect(result.instance).toBe(fakeComponent)
    })
  })

  describe("findTranslation", () => {
    const mockState = {
      messages: {
        en: { home: { title: "Welcome" }, about: "About Us" },
        fr: { home: { title: "Bienvenue" }, about: "À propos" },
      },
    }

    it("finds translation from local translations first", () => {
      const localTranslations = {
        en: { home: { title: "Local Welcome" } },
      }

      const result = findTranslation("home.title", "en", localTranslations, mockState as any)
      expect(result).toBe("Local Welcome")
    })

    it("falls back to global translations if not found locally", () => {
      const localTranslations = {
        en: { other: "Other" },
      }

      const result = findTranslation("home.title", "en", localTranslations, mockState as any)
      expect(result).toBe("Welcome")
    })

    it("returns null if translation not found anywhere", () => {
      const localTranslations = {
        en: { other: "Other" },
      }

      const result = findTranslation("nonexistent.key", "en", localTranslations, mockState as any)
      expect(result).toBeNull()
    })
  })

  describe("createSetLocale", () => {
    it("updates locale when valid locale provided", () => {
      const state = {
        locale: { value: "en" },
        availableLocales: ["en", "fr", "de"],
      }

      // Pass the state object to createSetLocale
      const setLocale = createSetLocale(state as any)
      // Call setLocale with a locale string
      setLocale("fr")

      expect(state.locale.value).toBe("fr")
    })

    it("does not update locale when invalid locale provided", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

      const state = {
        locale: { value: "en" },
        availableLocales: ["en", "fr", "de"],
      }

      const setLocale = createSetLocale(state as any)
      setLocale("es")

      expect(state.locale.value).toBe("en")
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })
})
