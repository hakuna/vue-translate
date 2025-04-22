import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { vueTranslatePlugin } from "unplugin-vue-translate/vite"
import type { PluginOption } from "vite"

export default defineConfig({
  plugins: [vue(), vueTranslatePlugin() as PluginOption],
  resolve: {
    alias: {
      "vue-translate": "../packages/vue-translate/src/index.ts",
      "unplugin-vue-translate/vite": "../packages/unplugin-vue-translate/src/vite.ts",
    },
  },
  optimizeDeps: {
    include: ["vue"],
    exclude: ["vue-translate", "unplugin-vue-translate"],
  },
})
