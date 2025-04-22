import { describe, it, expect } from "vitest"
import { getPluralForm } from "../../src/util/pluralForms"

describe("getPluralForm", () => {
  it("returns string value directly", () => {
    expect(getPluralForm("test", 1)).toBe("test")
    expect(getPluralForm("test", 0)).toBe("test")
    expect(getPluralForm("test", 2)).toBe("test")
  })

  it("selects zero form when count is 0 and zero form exists", () => {
    const value = {
      zero: "No items",
      one: "One item",
      other: "Multiple items",
    }
    expect(getPluralForm(value, 0)).toBe("No items")
  })

  it("selects one form when count is 1 and one form exists", () => {
    const value = {
      one: "One item",
      other: "Multiple items",
    }
    expect(getPluralForm(value, 1)).toBe("One item")
  })

  it("selects other form when count is not 0 or 1", () => {
    const value = {
      zero: "No items",
      one: "One item",
      other: "Multiple items",
    }
    expect(getPluralForm(value, 2)).toBe("Multiple items")
    expect(getPluralForm(value, 10)).toBe("Multiple items")
  })

  it("fallbacks to other if preferred form is missing", () => {
    const value = {
      other: "Items",
    }
    expect(getPluralForm(value, 0)).toBe("Items")
    expect(getPluralForm(value, 1)).toBe("Items")
  })

  it("fallbacks to one if other is missing", () => {
    const value = {
      one: "One item",
    }
    expect(getPluralForm(value, 2)).toBe("One item")
  })

  it("fallbacks to zero if one and other are missing", () => {
    const value = {
      zero: "No items",
    }
    expect(getPluralForm(value, 1)).toBe("No items")
  })

  it("fallbacks to first available key if standard keys are missing", () => {
    const value = {
      custom: "Custom form",
    }
    expect(getPluralForm(value, 1)).toBe("Custom form")
  })

  it("handles null or undefined gracefully", () => {
    expect(getPluralForm(null, 1)).toBe("null")
    expect(getPluralForm(undefined, 1)).toBe("undefined")
  })

  it("handles empty object gracefully", () => {
    expect(getPluralForm({}, 1)).toBe("")
  })
})
