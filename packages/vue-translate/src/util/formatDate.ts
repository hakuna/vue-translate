/**
 * Default date formatting options when nothing is specified
 */
export const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
}

/**
 * Format a date value according to locale and options
 *
 * @param date The date to format
 * @param locale Current locale
 * @param options Formatting options
 * @returns Formatted date string or null if an error occurs
 */
export function formatDate(
  date: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions | undefined
): string | null {
  try {
    // Use provided options or fallback to built-in defaults
    const dateOptions: Intl.DateTimeFormatOptions = options || DEFAULT_DATE_OPTIONS

    return new Intl.DateTimeFormat(locale, dateOptions).format(date)
  } catch (error) {
    // Return null to indicate an error occurred - caller will handle it
    return null
  }
}
