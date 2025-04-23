import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { vueTranslatePlugin } from "@hakuna/unplugin-vue-translate/vite"
import type { PluginOption } from "vite"

export default defineConfig({
  plugins: [vue(), vueTranslatePlugin() as PluginOption],
  resolve: {
    alias: {
      "@hakuna/vue-translate": "../packages/vue-translate/src/index.ts",
      "@hakuna/unplugin-vue-translate/vite": "../packages/unplugin-vue-translate/src/vite.ts",
    },
  },
  optimizeDeps: {
    include: ["vue"],
    exclude: ["@hakuna/vue-translate", "@hakuna/unplugin-vue-translate"],
  },
})
