import { ref } from "vue"
import { useTranslate } from "./composable"
import { translateKey, localizeValue } from "./context"
import type {
  VueTranslateOptions,
  VueTranslateInstance,
  VueTranslateState,
  LocaleFormats,
  LocaleWithFormats,
  TranslationResult,
  LocalizationResult,
} from "./types"
import "./types/custom_properties"

// Symbol used as a key for providing/injecting the vue-translate state
export const VueTranslateSymbol = Symbol("vue-translate")

/**
 * Creates a Vue Translate instance
 */
export function createVueTranslate(options: VueTranslateOptions): VueTranslateInstance {
  // Create the locale as a standalone ref for reactivity
  const localeRef = ref(options.locale)

  // Create a state object with all configuration options
  const state: VueTranslateState = {
    locale: localeRef,
    availableLocales: options.availableLocales,
    showMissingTranslationWarnings: options.showMissingTranslationWarnings || false,
    messages: options.messages || {},
    formats: options.formats || { date: {}, number: {} },
  }

  // Return the instance with enhanced functionality
  return {
    // Format a key with variables
    translate: (key: string, variables?: Record<string, any>): TranslationResult => {
      return translateKey(key, variables, null, state)
    },

    // Format a date/number with options
    localize: (value: Date | number, format?: string | Record<string, any>): LocalizationResult => {
      return localizeValue(value, format, state)
    },

    // Install method
    install(app) {
      // Provide the state to all components using the symbol
      app.provide(VueTranslateSymbol, state)

      // Add global helpers that can be used in templates
      app.config.globalProperties.$t = function (key: string, variables?: Record<string, any>) {
        // Get component instance context from 'this'
        return translateKey(key, variables, this, state)
      }

      app.config.globalProperties.$l = function (
        value: Date | number,
        format?: string | Record<string, any>
      ) {
        return localizeValue(value, format, state)
      }
    },
  }
}

export { useTranslate }
export type { VueTranslateOptions, VueTranslateInstance, LocaleFormats, LocaleWithFormats }
