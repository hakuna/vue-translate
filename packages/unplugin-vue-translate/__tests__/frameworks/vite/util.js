import { resolve, sep } from "node:path"
import { createServer } from "vite"

const baseDir = resolve(__dirname, "../..")

/**
 * Compile a Vue SFC file using Vite and return the transformed code
 * @param {object} options - Vite configuration options
 * @param {string} file - Path to the Vue SFC file
 * @returns {Promise<string|undefined>} The transformed code
 */
export async function compile(options, file) {
  const vite = await createServer({
    root: baseDir,
    ...options,
    plugins: [
      ...options.plugins,
      {
        name: "externals",
        config(config) {
          const newAlias = [
            ...(config?.resolve?.alias ?? []),
            { find: /^vue$/, replacement: "virtual:empty:vue" },
          ]

          config.resolve = {
            ...(config.resolve ?? {}),
            alias: newAlias,
          }
        },
      },
      {
        name: "virtual:empty",
        resolveId(id) {
          if (id.startsWith("virtual:empty:")) return id
        },
        load(id) {
          if (id.startsWith("virtual:empty:")) return "export default {}"
        },
      },
    ],
  })

  await vite.transformRequest(file)

  const module = await vite.moduleGraph.getModuleByUrl(file)

  const getAllModules = (module) =>
    [module].concat([...module.importedModules.values()].flatMap(getAllModules))

  const modules = await Promise.all(
    getAllModules(module).map(async (module) => ({
      transform: await vite.transformRequest(module.url),
      module,
    }))
  )

  const code = modules
    .filter((module) => module.transform)
    .filter((module) => !module.module.url.includes("node_modules"))
    .filter((module) => !module.module.url.includes("virtual:empty:"))
    .map((module) => `=== ${module.module.url} ===\n${module.transform.code}`)
    .join("\n\n")

  // normalize paths
  return code
    ?.replaceAll(baseDir.replaceAll(sep, "/"), "")
    .replace(/\/@(fs|id).*?node_modules\//g, "")
    .replaceAll("\\r\\n", "\\n")
}
