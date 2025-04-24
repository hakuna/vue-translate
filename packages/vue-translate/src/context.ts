import { inject, getCurrentInstance } from "vue"
import { VueTranslateSymbol } from "./index"
import { getObjectPath } from "./util/objectPath"
import { formatDate } from "./util/formatDate"
import { formatNumber } from "./util/formatNumber"
import { getPluralForm } from "./util/pluralForms"
import { substituteVariables } from "./util/substituteVariables"
import type {
  VueTranslateState,
  LocaleFormats,
  TranslationResult,
  LocalizationResult,
} from "./types"

/**
 * Gets state from the current component instance
 *
 * @returns VueTranslateState or throws an error if not found
 */
export function getState() {
  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error("Function must be called within a setup function or a component")
  }

  // Get the shared state by inject
  const state = inject<VueTranslateState>(VueTranslateSymbol)

  if (!state) {
    throw new Error(
      "Vue Translate plugin is not installed. Make sure to call app.use(vueTranslate) before using it"
    )
  }

  return {
    state,
    instance,
  }
}

/**
 * Finds a translation value from local or global messages
 *
 * @param key Translation key
 * @param locale Current locale
 * @param localTranslations Component-local translations
 * @param state Global state
 * @returns Found translation or null if not found
 */
export function findTranslation(
  key: string,
  locale: string,
  localTranslations: Record<string, any>,
  state: VueTranslateState
): any {
  let translationValue: any = null

  // First check local translations
  if (localTranslations[locale]) {
    const localValue = getObjectPath(localTranslations[locale], key)
    if (localValue !== undefined && localValue !== null) {
      translationValue = localValue
    }
  }

  // Then check global translations if not found locally
  if (translationValue === null && state.messages[locale]) {
    const globalValue = getObjectPath(state.messages[locale], key)
    if (globalValue !== undefined && globalValue !== null) {
      translationValue = globalValue
    }
  }

  return translationValue
}

/**
 * Creates a setLocale function that updates the global locale
 *
 * @param state Global state
 * @returns setLocale function
 */
export function createSetLocale(state: VueTranslateState) {
  return (newLocale: string) => {
    if (state.availableLocales.includes(newLocale)) {
      state.locale.value = newLocale
    } else {
      console.warn(
        `Locale "${newLocale}" is not available. Available locales: ${state.availableLocales.join(", ")}`
      )
    }
  }
}

/**
 * Translates a key using the current state
 *
 * @param key The translation key
 * @param variables Optional variables to substitute
 * @param component The component instance (for local translations)
 * @param state The global translation state
 * @returns Translated string
 */
export function translateKey(
  key: string,
  variables?: Record<string, any>,
  component?: any,
  state?: VueTranslateState
): TranslationResult {
  if (!state) {
    const result = getState()
    state = result.state
    component = result.instance
  }

  const locale = state.locale.value

  // Extract component's local translations
  let localTranslations = {}

  // Try to get component translations from different possible sources
  if (component) {
    try {
      // Use 'in' operator to check property existence without accessing it directly
      if ("type" in component && component.type && "vueTranslate" in component.type) {
        localTranslations = component.type.vueTranslate
      }
      // For components accessed via this in template
      else if (
        "$options" in component &&
        component.$options &&
        "vueTranslate" in component.$options
      ) {
        localTranslations = component.$options.vueTranslate
      }
      // Direct component definition
      else if ("vueTranslate" in component) {
        localTranslations = component.vueTranslate
      }
    } catch (e) {
      // Silently ignore errors from property checks
      // This can happen with proxies or when properties are non-configurable
    }
  }

  // Check if this is a lazy lookup (starts with a dot)
  const isLocalLookup = key.startsWith(".")
  let translationValue = null

  if (isLocalLookup && component) {
    // For lazy lookup, only search in component's local translations
    // Remove the leading dot for lookup
    const localKey = key.substring(1)
    const localeTranslations = localTranslations[locale as keyof typeof localTranslations]
    if (localeTranslations) {
      const localValue = getObjectPath(localeTranslations, localKey)
      if (localValue !== undefined && localValue !== null) {
        translationValue = localValue
      }
    }
  } else {
    // Non-dot keys only search in global translations
    // Skip local translations entirely
    if (state.messages[locale]) {
      const globalValue = getObjectPath(state.messages[locale], key)
      if (globalValue !== undefined && globalValue !== null) {
        translationValue = globalValue
      }
    }
  }

  // If no translation found
  if (translationValue === null) {
    // Show warning for missing translation if enabled
    if (state.showMissingTranslationWarnings) {
      if (isLocalLookup) {
        console.warn("[vue-translate] Missing local translation for key:", `${locale}${key}`)
      } else {
        console.warn("[vue-translate] Missing global translation for key:", `${locale}.${key}`)
      }
    }
    return key
  }

  // Handle pluralization if count variable is present
  let result = translationValue
  if (variables && "count" in variables && typeof variables.count === "number") {
    result = getPluralForm(translationValue, variables.count)
  } else if (typeof translationValue === "object") {
    // If we have an object but no count, return the object
    return result
  }

  // Now substitute variables in the result
  return substituteVariables(String(result), variables)
}

/**
 * Resolves formatting options based on format name or direct options
 *
 * @param value The value to format (date or number)
 * @param format Format name or options object
 * @param locale Current locale code
 * @param localeFormats Available formats for the locale
 * @param showWarnings Whether to show warnings for missing formats
 * @returns Resolved formatting options
 */
function resolveFormatOptions(
  value: Date | number,
  format: string | Record<string, any> | undefined,
  locale: string,
  localeFormats: LocaleFormats | undefined,
  showWarnings: boolean
): Record<string, any> | undefined {
  const isDate = value instanceof Date
  const isNumber = typeof value === "number"

  // If format is a string, it's a predefined format name
  if (typeof format === "string") {
    if (isDate && localeFormats?.date) {
      const dateFormats = localeFormats.date
      const resolvedOptions = dateFormats[format]

      if (!resolvedOptions && showWarnings) {
        console.warn(`[vue-translate] Date format '${format}' not found for locale '${locale}'`)
      }

      return resolvedOptions
    }

    if (isNumber && localeFormats?.number) {
      const numberFormats = localeFormats.number
      const resolvedOptions = numberFormats[format]

      if (!resolvedOptions && showWarnings) {
        console.warn(`[vue-translate] Number format '${format}' not found for locale '${locale}'`)
      }

      return resolvedOptions
    }

    // Format name provided but not found
    if (showWarnings) {
      const valueType = isDate ? "Date" : "Number"
      console.warn(
        `[vue-translate] ${valueType} format '${format}' not found for locale '${locale}'`
      )
    }
  }

  // Direct options object
  if (format && typeof format === "object") {
    return format
  }

  // No format specified, use default if available
  if (isDate && localeFormats?.date?.default) {
    return localeFormats.date.default
  }

  if (isNumber && localeFormats?.number?.default) {
    return localeFormats.number.default
  }

  // No options resolved - we'll use hardcoded defaults
  return undefined
}

/**
 * Localizes a date or number using the current state
 *
 * @param value The date or number to localize
 * @param format Optional format name or options
 * @param state The global translation state
 * @returns Formatted string
 */
export function localizeValue(
  value: Date | number,
  format?: string | Record<string, any>,
  state?: VueTranslateState
): LocalizationResult {
  if (!state) {
    const result = getState()
    state = result.state
  }

  const locale = state.locale.value
  const localeFormats = state.formats[locale]
  const showWarnings = state.showMissingTranslationWarnings

  const options = resolveFormatOptions(value, format, locale, localeFormats, showWarnings)

  // Format based on value type
  if (value instanceof Date) {
    try {
      const result = formatDate(value, locale, options)
      if (result !== null) {
        return result
      }
      // Fall through to error handling if null is returned
    } catch (error) {
      if (showWarnings) {
        console.warn("[vue-translate] Error formatting date:", error)
      }
    }
  } else if (typeof value === "number") {
    try {
      const result = formatNumber(value, locale, options)
      if (result !== null) {
        return result
      }
      // Fall through to error handling if null is returned
    } catch (error) {
      if (showWarnings) {
        console.warn("[vue-translate] Error formatting number:", error)
      }
    }
  }

  // Fallback for any error cases or unsupported types
  return String(value)
}
