export {}

declare module "vue" {
  export interface ComponentCustomProperties {
    /**
     * Translate a key with optional variables
     *
     * @param key Translation key
     * @param variables Optional variables to substitute
     * @returns Translated string
     */
    $t: (key: string, variables?: Record<string, any>) => string
    /**
     * Localize (format) a date or number according to current locale
     *
     * @param value Date or number to format
     * @param format Optional format name or options
     * @returns Formatted string
     */
    $l: (value: Date | number, format?: string | Record<string, any>) => string
  }
}
