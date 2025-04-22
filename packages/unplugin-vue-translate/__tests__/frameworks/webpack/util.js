import path from "node:path"
import fs from "node:fs"
import { VueLoaderPlugin } from "vue-loader"
import webpack from "webpack"
import { vueTranslatePlugin } from "../../../src/webpack"

/**
 * Compile a Vue component using webpack
 * @param {string} fixture - Path to the fixture file
 * @param {object} options - Options for the vueTranslatePlugin
 * @param {boolean} hot - Whether to enable HMR
 * @returns {Promise<webpack.Stats>} - Stats object from webpack
 */
export async function compile(fixture, options = {}, hot = false) {
  const compilation = webpack({
    context: path.resolve(__dirname, "../.."),
    entry: `./${fixture}`,
    externals: {
      vue: "Vue",
    },
    output: {
      path: path.resolve(__dirname, "output"),
      filename: "bundle.js",
    },
    mode: "production",
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: require.resolve("vue-loader"),
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      vueTranslatePlugin(options),
      ...(hot ? [new webpack.HotModuleReplacementPlugin()] : []),
    ],
  })

  // Create output directory if it doesn't exist
  const outputPath = path.resolve(__dirname, "output")
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // Use the real filesystem for output

  return await new Promise((resolve, reject) => {
    compilation.run((err, stats) => {
      if (err != null || stats == null) return reject(err)
      if (stats.hasErrors()) return reject(stats.toJson().errors)

      resolve(stats)
    })
  })
}
