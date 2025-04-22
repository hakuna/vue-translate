import { unplugin, VueTranslateOptions } from "./plugin"
import { vueTranslatePlugin as vitePlugin } from "./vite"
import { vueTranslatePlugin as webpackPlugin } from "./webpack"
import { vueTranslatePlugin as rollupPlugin } from "./rollup"

export { unplugin, vitePlugin, webpackPlugin, rollupPlugin, VueTranslateOptions }

// Default export for direct usage
export default unplugin
