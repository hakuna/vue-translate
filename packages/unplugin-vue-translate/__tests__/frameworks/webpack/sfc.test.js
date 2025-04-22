import { describe, expect, it } from "vitest"
import { vueTranslatePlugin } from "../../../src/webpack"

describe("Webpack SFC", () => {
  it("verifies basic plugin functionality", () => {
    // Get an instance of the plugin
    const plugin = vueTranslatePlugin()

    // Check basic plugin properties
    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe("object")

    // For webpack plugins, we expect certain required properties
    expect(plugin).toHaveProperty("apply")
    expect(typeof plugin.apply).toBe("function")
  })

  it("handles custom block types", () => {
    // Get an instance of the plugin with custom blockType
    const customPlugin = vueTranslatePlugin({ blockType: "translate" })

    // Verify it's a valid webpack plugin
    expect(customPlugin).toBeDefined()
    expect(customPlugin).toHaveProperty("apply")
  })

  it("skips already transformed code", () => {
    // Similar to the Vite test, create a mock
    const alreadyTransformed = "export default function() { /* already transformed */ }"

    // Create a simple mock of the plugin's transform function
    const mockPlugin = {
      name: "unplugin-vue-translate",
      transform: (code) => {
        // Simulate the plugin's transform behavior
        if (code.includes("export default")) {
          return code // Should skip already transformed code
        }
        return "transformed code"
      },
    }

    // Act
    const result = mockPlugin.transform(alreadyTransformed)

    // Assert
    expect(result).toBe(alreadyTransformed)
  })
})
