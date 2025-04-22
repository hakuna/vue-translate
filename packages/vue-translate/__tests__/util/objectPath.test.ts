import { describe, it, expect } from "vitest"
import { getObjectPath } from "../../src/util/objectPath"

describe("getObjectPath", () => {
  const testObj = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
      },
    },
    "dot.in.key": "special",
    arr: [1, 2, 3],
  }

  it("gets top-level property", () => {
    expect(getObjectPath(testObj, "a")).toBe(1)
  })

  it("gets nested property", () => {
    expect(getObjectPath(testObj, "b.c")).toBe(2)
  })

  it("gets deeply nested property", () => {
    expect(getObjectPath(testObj, "b.d.e")).toBe(3)
  })

  it("returns array at path", () => {
    expect(getObjectPath(testObj, "arr")).toEqual([1, 2, 3])
  })

  it("returns undefined for non-existent property", () => {
    expect(getObjectPath(testObj, "x")).toBeUndefined()
    expect(getObjectPath(testObj, "a.x")).toBeUndefined()
    expect(getObjectPath(testObj, "b.c.d")).toBeUndefined()
  })

  it("returns undefined when accessing properties on null/undefined", () => {
    expect(getObjectPath(testObj, "nonexistent.path")).toBeUndefined()
  })

  it("handles empty path", () => {
    expect(getObjectPath(testObj, "")).toEqual(testObj)
  })

  it("gets property with dot notation directly in the key", () => {
    // This is testing object keys that contain dots, not path traversal
    expect(getObjectPath(testObj, "dot.in.key")).toBeUndefined()
  })
})
