import { resolve } from "node:path"
import fs from "node:fs"
import { rollup } from "rollup"
import vue from "@vitejs/plugin-vue"
import { vueTranslatePlugin } from "../../../src/rollup"

const baseDir = resolve(__dirname, "../..")

/**
 * Compile a Vue SFC file using Rollup and return the transformed code
 * @param {object} options - Rollup configuration options
 * @param {string} file - Path to the Vue SFC file
 * @returns {Promise<string>} The generated bundle code
 */
export async function compile(options = {}, file) {
  // Add default values
  const plugins = options.plugins || [vue(), vueTranslatePlugin(options.vueTranslateOptions || {})]

  // Paths need to be fixed to work with Rollup
  // file is like '/fixtures/test.vue', we need to remove the leading slash
  const fixedPath = file.startsWith("/") ? file.substring(1) : file
  const inputPath = resolve(baseDir, fixedPath)

  // Create rollup instance
  const bundle = await rollup({
    input: inputPath,
    external: ["vue"],
    plugins,
    onwarn: (warning, warn) => {
      // Suppress circular dependency warnings
      if (warning.code === "CIRCULAR_DEPENDENCY") return
      warn(warning)
    },
  })

  // Generate output
  const { output } = await bundle.generate({
    format: "esm",
    exports: "named",
  })

  // Close the bundle
  await bundle.close()

  // Get the main chunk which contains our component
  const mainChunk = output.find(
    (chunk) => !chunk.fileName.includes("node_modules") && chunk.type === "chunk"
  )

  if (!mainChunk) {
    throw new Error("Could not find main chunk in rollup output")
  }

  return mainChunk.code
}
