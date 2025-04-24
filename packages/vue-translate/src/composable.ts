import type { Ref } from "vue"
import { getState, translateKey, localizeValue, createSetLocale } from "./context"
import type { TranslationResult, LocalizationResult } from "./types"

interface TranslateResult {
  /**
   * Translation function that accepts a key and returns the translated text
   *
   * @param key The translation key (dot notation)
   * @param variables Optional variables to substitute in the translation
   * @returns The translated string with variables substituted
   */
  t: (key: string, variables?: Record<string, any>) => TranslationResult

  /**
   * Localization function that formats dates and numbers according to the current locale
   *
   * @param value The date or number to localize
   * @param format Optional predefined format name or formatting options
   * @returns The formatted string
   */
  l: (value: Date | number, format?: string | Record<string, any>) => LocalizationResult

  /**
   * Current locale (reactive)
   */
  locale: Ref<string>

  /**
   * Available locales
   */
  availableLocales: string[]

  /**
   * Set the current locale
   */
  setLocale: (locale: string) => void
}

/**
 * Composable to use translations in setup functions
 *
 * @returns Object with t function, locale, availableLocales, and setLocale function
 */
export function useTranslate(): TranslateResult {
  const { state, instance } = getState()

  // Translation function that uses the context helpers
  const t = (key: string, variables?: Record<string, any>): TranslationResult => {
    return translateKey(key, variables, instance, state)
  }

  // Localization function that uses the context helpers
  const l = (value: Date | number, format?: string | Record<string, any>): LocalizationResult => {
    return localizeValue(value, format, state)
  }

  // Create a setLocale function
  const setLocale = createSetLocale(state)

  return {
    t,
    l,
    locale: state.locale,
    availableLocales: state.availableLocales,
    setLocale,
  }
}
