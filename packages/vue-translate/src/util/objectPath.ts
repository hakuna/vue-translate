/**
 * Safely gets a nested property from an object using dot notation
 *
 * @param obj The object to get the property from
 * @param path The path to the property in dot notation (e.g. "some.nested.key")
 * @returns The value at the path or undefined if not found
 */
export function getObjectPath(obj: Record<string, any>, path: string): any {
  // Return the whole object when path is empty
  if (path === "") {
    return obj
  }

  const keys = path.split(".")
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) {
      return undefined
    }

    result = result[key]
  }

  return result
}
