import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/vite.ts", "src/webpack.ts", "src/rollup.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  outDir: "dist",
})
