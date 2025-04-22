import { unplugin, VueTranslateOptions } from "./plugin"

/**
 * Rollup plugin for parsing i18n blocks in Vue SFCs
 * @param options - Plugin options
 */
export const vueTranslatePlugin = (options: VueTranslateOptions = {}) => {
  return unplugin.rollup(options)
}
