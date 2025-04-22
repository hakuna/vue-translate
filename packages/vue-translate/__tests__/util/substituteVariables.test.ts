import { describe, it, expect } from "vitest"
import { substituteVariables } from "../../src/util/substituteVariables"

describe("substituteVariables", () => {
  it("replaces variables in text", () => {
    const text = "Hello, %{name}!"
    const variables = { name: "World" }
    expect(substituteVariables(text, variables)).toBe("Hello, World!")
  })

  it("handles multiple variables", () => {
    const text = "%{greeting}, %{name}! Your score is %{score}."
    const variables = { greeting: "Hello", name: "User", score: 42 }
    expect(substituteVariables(text, variables)).toBe("Hello, User! Your score is 42.")
  })

  it("handles repeated variables", () => {
    const text = "%{name} likes %{item}. %{name} bought %{count} %{item}s."
    const variables = { name: "John", item: "apple", count: 5 }
    expect(substituteVariables(text, variables)).toBe("John likes apple. John bought 5 apples.")
  })

  it("ignores variables not found in variables object", () => {
    const text = "Hello, %{name}! Your %{status} is good."
    const variables = { name: "User" }
    expect(substituteVariables(text, variables)).toBe("Hello, User! Your %{status} is good.")
  })

  it("converts non-string values to strings", () => {
    const text = "Count: %{count}, Valid: %{valid}, Data: %{data}"
    const variables = { count: 42, valid: true, data: { foo: "bar" } }
    expect(substituteVariables(text, variables)).toBe(
      "Count: 42, Valid: true, Data: [object Object]"
    )
  })

  it("returns original text when no variables provided", () => {
    const text = "Hello, %{name}!"
    expect(substituteVariables(text)).toBe(text)
    expect(substituteVariables(text, {})).toBe(text)
  })

  it("handles empty string", () => {
    expect(substituteVariables("", { name: "Test" })).toBe("")
  })

  it("returns original text when text has no placeholders", () => {
    const text = "Hello, World!"
    const variables = { name: "User" }
    expect(substituteVariables(text, variables)).toBe(text)
  })

  it("handles undefined and null variables gracefully", () => {
    const text = "Value is %{value}"
    // @ts-expect-error Testing with null value
    expect(substituteVariables(text, null)).toBe(text)
    expect(substituteVariables(text, { value: undefined })).toBe("Value is %{value}")
    expect(substituteVariables(text, { value: null })).toBe("Value is null")
  })
})
