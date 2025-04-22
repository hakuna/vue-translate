/**
 * Default number formatting options when nothing is specified
 */
export const DEFAULT_NUMBER_OPTIONS: Intl.NumberFormatOptions = {
  style: "decimal",
}

/**
 * Format a number value according to locale and options
 *
 * @param num The number to format
 * @param locale Current locale
 * @param options Formatting options
 * @returns Formatted number string or null if an error occurs
 */
export function formatNumber(
  num: number,
  locale: string,
  options: Intl.NumberFormatOptions | undefined
): string | null {
  try {
    // Use provided options or fallback to built-in defaults
    const numberOptions: Intl.NumberFormatOptions = options || DEFAULT_NUMBER_OPTIONS

    return new Intl.NumberFormat(locale, numberOptions).format(num)
  } catch (error) {
    // Return null to indicate an error occurred - caller will handle it
    return null
  }
}
