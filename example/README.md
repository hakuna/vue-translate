# Vue Translate Example

This is an example application demonstrating how to use @hakunajs/vue-translate and @hakunajs/unplugin-vue-translate packages.

## How to Run

From the example directory:

```bash
# Install dependencies
npm install

# Run the example
npm run dev
```

## What This Example Demonstrates

1. **Core Translation Functions**: Using the `@hakunajs/vue-translate` package for basic i18n functionality
2. **SFC Integration**: Using the `@hakunajs/unplugin-vue-translate` package to parse `<i18n>` blocks in Vue components
3. **Component-level Translations**: Showing how component-specific translations are available
4. **Global Translations**: Accessing global translations defined in the main Vue instance

## Project Structure

- `App.vue` - Main component with an i18n block containing local translations
- `main.ts` - App initialization with global translations configuration
- `vite.config.ts` - Vite configuration with the @hakunajs/unplugin-vue-translate plugin
- `env.d.ts` - TypeScript type definitions for Vue components and i18n properties
- `package.json` - Local dependencies that reference the packages in the monorepo

## How It Works

This example uses local file references in package.json to link directly to the packages in the monorepo:

```json
"dependencies": {
  "@hakunajs/vue-translate": "file:../packages/vue-translate",
  "@hakunajs/unplugin-vue-translate": "file:../packages/unplugin-vue-translate"
}
```

This approach allows you to develop the packages and test them in the example application without having to publish them to npm first.
