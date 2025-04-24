import type { Ref } from "vue"

/**
 * Format options for dates
 */
export type DateFormats = Record<string, Intl.DateTimeFormatOptions>

/**
 * Format options for numbers
 */
export type NumberFormats = Record<string, Intl.NumberFormatOptions>

/**
 * Formats for a specific locale
 */
export interface LocaleFormats {
  /**
   * Date formats for this locale
   */
  date?: DateFormats

  /**
   * Number formats for this locale
   */
  number?: NumberFormats
}

/**
 * LocaleFormats for locales
 */
export type LocaleWithFormats = Record<string, LocaleFormats>

/**
 * Options for creating a Vue Translate instance
 */
export interface VueTranslateOptions {
  /**
   * Current locale
   */
  locale: string

  /**
   * Available locales
   */
  availableLocales: string[]

  /**
   * Whether to show console warnings for missing translations
   * @default false
   */
  showMissingTranslationWarnings?: boolean

  /**
   * Optional global translation messages
   */
  messages?: Record<string, Record<string, any>>

  /**
   * Predefined formats for dates and numbers, organized by locale
   *
   * Example:
   * ```ts
   * {
   *   en: {
   *     date: {
   *       default: { year: 'numeric', month: 'short', day: 'numeric' },
   *       short: { year: '2-digit', month: '2-digit', day: '2-digit' }
   *     },
   *     number: {
   *       default: { style: 'decimal' },
   *       currency: { style: 'currency', currency: 'USD' }
   *     }
   *   },
   *   fr: {
   *     date: {
   *       default: { year: 'numeric', month: 'long', day: 'numeric' },
   *       short: { year: 'numeric', month: '2-digit', day: '2-digit' }
   *     },
   *     number: {
   *       default: { style: 'decimal' },
   *       currency: { style: 'currency', currency: 'EUR' }
   *     }
   *   }
   * }
   * ```
   */
  formats?: Record<string, LocaleFormats>
}

/**
 * Vue Translate state - shared across the application
 */
export interface VueTranslateState {
  /**
   * Current locale (reactive)
   */
  locale: Ref<string>

  /**
   * Available locales
   */
  availableLocales: string[]

  /**
   * Whether to show console warnings for missing translations
   */
  showMissingTranslationWarnings: boolean

  /**
   * Translation messages
   */
  messages: Record<string, Record<string, any>>

  /**
   * Predefined formats for dates and numbers
   * Organized by locale
   */
  formats: Record<string, LocaleFormats>
}

/**
 * Vue Translate instance
 */
export interface VueTranslateInstance {
  /**
   * Install plugin
   */
  install: (app: any) => void

  /**
   * Translate a key with variables
   *
   * @param key Translation key
   * @param variables Optional variables to substitute
   * @returns Translated string
   */
  translate: (key: string, variables?: Record<string, any>) => TranslationResult

  /**
   * Localize (format) a date or number
   *
   * @param value Date or number to format
   * @param format Optional format name or options
   * @returns Formatted string
   */
  localize: (value: Date | number, format?: string | Record<string, any>) => LocalizationResult
}

/**
 * Translation result
 */
export type TranslationResult = string | object

/**
 * Localization result
 */
export type LocalizationResult = string
