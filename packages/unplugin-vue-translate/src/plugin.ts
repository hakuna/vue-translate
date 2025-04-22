import { createUnplugin } from "unplugin"
import yaml from "yaml"

/**
 * Options for the Vue Translate plugin
 */
export interface VueTranslateOptions {
  /**
   * Custom block type to process (default: 'i18n')
   */
  blockType?: string
}

/**
 * Creates an unplugin for handling i18n blocks in Vue SFCs
 */
export const unplugin = createUnplugin((options: VueTranslateOptions = {}) => {
  return {
    name: "unplugin-vue-translate",

    transformInclude(id: string) {
      // Get the block type from options or default to i18n
      const blockType = options.blockType || "i18n"
      // Process blocks of the specified type
      return id.includes(`type=${blockType}`)
    },

    transform(code: string, id: string) {
      // Skip already transformed code
      if (code.includes("export default") || code.trim().startsWith("export ")) {
        return code
      }

      const rawContent = code.trim()

      const langMatch = id.match(/lang\.([\w-]+)/)
      const lang = langMatch ? langMatch[1].toLowerCase() : null

      let parsedContent = {}
      try {
        if (lang === "yaml" || lang === "yml") {
          parsedContent = yaml.parse(rawContent) || {}
        } else {
          parsedContent = rawContent ? JSON.parse(rawContent) : {}
        }
      } catch (error) {
        const formatLabel = lang ? lang.toUpperCase() : "content"
        const filename = id.split("?")[0]
        console.error(
          `[unplugin-vue-translate] Failed to parse ${formatLabel} in ${filename}:`,
          error
        )
        // Ensure we set an empty object on parse errors
        parsedContent = {}
      }

      // Generate code that assigns the parsed content to the component
      return `
        export default function (Component) {
          const target = Component.options || Component;

          target.vueTranslate = ${JSON.stringify(parsedContent)};
        }
      `
    },
  }
})
