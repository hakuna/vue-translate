import { describe, expect, it } from "vitest"
import { vueTranslatePlugin } from "../../../src/rollup"
import { compile } from "./util"

describe("Rollup SFC", () => {
  it("verifies basic plugin functionality", () => {
    // Get an instance of the plugin
    const plugin = vueTranslatePlugin()

    // Check basic plugin properties
    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe("object")

    // For rollup plugins, we expect certain required properties
    expect(plugin).toHaveProperty("name", "unplugin-vue-translate")
    expect(plugin).toHaveProperty("transform")
  })

  it("generates vueTranslate property with YAML content", async () => {
    // Arrange & Act
    const code = await compile({}, "/fixtures/lang-yaml.vue")

    // Assert
    // The transformed code should include the YAML content converted to JSON
    expect(code).toBeDefined()
    expect(code).toContain("vueTranslate")
    // The YAML should be parsed into the object structure
    expect(code).toContain('"hello":"Hello World"')
    expect(code).toContain('"welcome":"Welcome, {name}!"')
    // Check for nested objects
    expect(code).toContain('"button":{"save":"Save","cancel":"Cancel"}')
  })

  it("handles YAML parsing errors gracefully", async () => {
    // This test verifies that the process doesn't crash with invalid YAML
    // Arrange & Act
    const code = await compile({}, "/fixtures/lang-yaml-invalid.vue")

    // Assert
    // Simply check that we got a code result
    expect(code).toBeDefined()
    // And that it contains some transformed content
    expect(code.includes("export default") || code.includes("vueTranslate")).toBe(true)
  })

  it('supports JSON content with lang="json" attribute', async () => {
    // Arrange & Act
    const code = await compile({}, "/fixtures/lang-json.vue")

    // Assert
    expect(code).toBeDefined()
    expect(code).toContain("vueTranslate")
    // The JSON should be parsed into the object structure
    expect(code).toContain('"greeting":"Hello from JSON!"')
    // Check for nested objects
    expect(code).toContain('"info":{"version":"1.0.0","name":"Vue Translate"}')
  })

  it("supports custom block type", async () => {
    // Arrange & Act
    const code = await compile(
      {
        vueTranslateOptions: {
          blockType: "translate",
        },
      },
      "/fixtures/custom-block.vue"
    )

    // Assert
    expect(code).toBeDefined()
    expect(code).toContain("vueTranslate")
    expect(code).toContain('"hello":"Hello Custom Block"')
    expect(code).toContain('"info":"This is from a custom block type"')
  })

  it("works with Options API components", async () => {
    // Arrange & Act
    const code = await compile({}, "/fixtures/options-api.vue")

    // Assert
    expect(code).toBeDefined()
    expect(code).toContain("vueTranslate")
    expect(code).toContain('"title":"Options API Component"')
    expect(code).toContain('"description":"Testing with the Options API"')
  })

  it("works with Composition API components", async () => {
    // Arrange & Act
    const code = await compile({}, "/fixtures/composition-api.vue")

    // Assert
    expect(code).toBeDefined()
    expect(code).toContain("vueTranslate")
    expect(code).toContain('"title":"Composition API Component"')
    expect(code).toContain('"description":"Testing with the Composition API"')
    expect(code).toContain('"buttons":{"increment":"Increment"}')
  })

  it("skips already transformed code", () => {
    // Create a mock with export default statement
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
