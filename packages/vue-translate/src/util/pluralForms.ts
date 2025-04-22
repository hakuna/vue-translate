/**
 * Determines the appropriate plural form key based on count
 * Following Rails i18n pluralization rules
 *
 * @param count The count value for pluralization
 * @param availableKeys Object keys available in the translation
 * @returns The appropriate plural form key
 */
function determinePluralKey(count: number, availableKeys: string[]): string | null {
  // Following Rails pluralization logic:
  // lookup_key = :zero if count == 0 && entry.has_key?(:zero)
  // lookup_key ||= count == 1 ? :one : :other
  const hasZero = availableKeys.includes("zero")
  const hasOne = availableKeys.includes("one")
  const hasOther = availableKeys.includes("other")

  if (count === 0 && hasZero) {
    return "zero"
  }

  if (count === 1 && hasOne) {
    return "one"
  }

  if (hasOther) {
    return "other"
  }

  // No ideal match found
  return null
}

/**
 * Fallback to any available plural form if preferred one isn't available
 *
 * @param value The translation object containing plural forms
 * @returns The best available plural form
 */
function getFallbackPluralForm(value: Record<string, string>): string {
  if (value.other !== undefined) return value.other
  if (value.one !== undefined) return value.one
  if (value.zero !== undefined) return value.zero

  // If nothing else is available, return the first key we find
  const firstKey = Object.keys(value)[0]
  if (firstKey) {
    return value[firstKey]
  }

  // Absolute last resort
  return ""
}

/**
 * Get the appropriate translation based on count (for pluralization)
 * Following Rails i18n pluralization rules
 *
 * @param value The translation value (can be string or object with plural forms)
 * @param count The count value for pluralization
 * @returns The selected translation string
 */
export function getPluralForm(value: any, count: number): string {
  // If value is a string, return it directly
  if (typeof value === "string") {
    return value
  }

  // If value is an object with plural forms
  if (typeof value === "object" && value !== null) {
    const availableKeys = Object.keys(value)

    // Handle empty objects by returning an empty string
    if (availableKeys.length === 0) {
      return ""
    }

    const pluralKey = determinePluralKey(count, availableKeys)

    // Use the determined key if available
    if (pluralKey && value[pluralKey] !== undefined) {
      return value[pluralKey]
    }

    // Fallback to any available form
    return getFallbackPluralForm(value)
  }

  // Fallback - just stringify whatever we have
  return String(value)
}
