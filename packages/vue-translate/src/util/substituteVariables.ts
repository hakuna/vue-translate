/**
 * Checks if the text contains any variable placeholders
 *
 * @param text The text to check for placeholders
 * @returns Whether the text contains placeholders
 */
function hasPlaceholders(text: string): boolean {
  return /%\{([\w\.]+)\}/g.test(text)
}

/**
 * Replaces a single placeholder with its corresponding value
 *
 * @param match The matched placeholder text
 * @param varName The variable name inside the placeholder
 * @param variables Object containing variable values
 * @returns The replacement value or original match if variable not found
 */
function replacePlaceholder(
  match: string,
  varName: string,
  variables: Record<string, any>
): string {
  return variables[varName] !== undefined ? String(variables[varName]) : match
}

/**
 * Substitute variables in a translation string
 *
 * @param text The translation text with placeholders
 * @param variables The variables to substitute
 * @returns The text with variables substituted
 */
export function substituteVariables(text: string, variables?: Record<string, any>): string {
  // Early return if no variables or no text
  if (!text || !variables || Object.keys(variables).length === 0) {
    return text
  }

  // Early return if no placeholders
  if (!hasPlaceholders(text)) {
    return text
  }

  // Replace all placeholders
  return text.replace(/%\{([\w\.]+)\}/g, (match, varName) => {
    return replacePlaceholder(match, varName, variables)
  })
}
