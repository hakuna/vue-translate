import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts", "__tests__/**/*.test.ts", "__tests__/**/*.test.js"],
    reporters: ["verbose"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "dist/", "test/fixtures/"],
    },
  },
  resolve: {
    conditions: ["node"],
  },
  optimizeDeps: {
    force: true,
  },
})
