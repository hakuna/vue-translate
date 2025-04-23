import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { vueTranslatePlugin } from "@hakunajs/unplugin-vue-translate/vite"
import type { PluginOption } from "vite"

export default defineConfig({
  plugins: [vue(), vueTranslatePlugin() as PluginOption],
  resolve: {
    alias: {
      "@hakunajs/vue-translate": "../packages/vue-translate/src/index.ts",
      "@hakunajs/unplugin-vue-translate/vite": "../packages/unplugin-vue-translate/src/vite.ts",
    },
  },
  optimizeDeps: {
    include: ["vue"],
    exclude: ["@hakunajs/vue-translate", "@hakunajs/unplugin-vue-translate"],
  },
})
