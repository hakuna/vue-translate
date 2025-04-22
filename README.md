# Vue Translate

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A simple internationalization (i18n) solution for Vue 3 that supports single-file component (SFC) `<i18n>` blocks and offers easy translation and formatting functions.

## Features

- 🌐 **Component-level translations** via `<i18n>` blocks in Vue SFCs
- 🔄 **Global translations** for app-wide content
- 📝 **YAML and JSON support** for translation blocks in SFCs
- 🔢 **Number formatting** with locale-specific styles
- 📅 **Date formatting** with locale-specific formats
- 🧩 **Variable substitution** in translations (`%{variable}`)
- 🔄 **Pluralization** support with count-based variants
- 🌈 **Locale switching** with automatic UI updates
- ⚙️ **Vite integration** with automatic SFC `<i18n>` block processing

## Installation

```bash
# Install the core package for runtime translation functionality
npm install vue-translate

# Install the SFC unplugin as a dev dependency (for <i18n> block support)
npm install --save-dev unplugin-vue-translate
```

## Quick Start

### 1. Configure Vue Translate in your main.ts/js file

```typescript
import { createApp } from "vue"
import { createVueTranslate } from "vue-translate"
import App from "./App.vue"

const vueTranslate = createVueTranslate({
  locale: "en",
  availableLocales: ["en", "fr", "de"],
  showMissingTranslationWarnings: true,
  // These are your global translations, accessible without a leading dot
  messages: {
    en: {
      app_name: "My App",
      welcome: "Welcome!",
    },
    fr: {
      app_name: "Mon Application",
      welcome: "Bienvenue!",
    },
    de: {
      app_name: "Meine App",
      welcome: "Willkommen!",
    },
  },
})

const app = createApp(App)
app.use(vueTranslate)
app.mount("#app")
```

### 2. Configure the Vue Plugin in Vite (vite.config.ts)

```typescript
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VueTranslate from "unplugin-vue-translate/vite"

export default defineConfig({
  plugins: [
    vue(),
    VueTranslate(),
  ],
})
```

### 3. Add translations to your components

```vue
<template>
  <div>
    <!-- Access global translation (from messages in createVueTranslate) -->
    <h1>{{ t("app_name") }}</h1>
    <!-- Access component-local translation (from <i18n> block) -->
    <p>{{ t(".greeting") }}</p>
    <p>{{ t(".items.count", { count: 5 }) }}</p>
  </div>
</template>

<script setup>
import { useTranslate } from "vue-translate"

const { t, locale, setLocale } = useTranslate()
</script>

<!-- YAML example (lang="yaml" attribute) -->
<i18n lang="yaml">
en:
  greeting: Hello world!
  items:
    count:
      zero: No items
      one: One item
      other: "%{count} items"

fr:
  greeting: Bonjour le monde!
  items:
    count:
      zero: Aucun élément
      one: Un élément
      other: "%{count} éléments"
</i18n>

<!-- JSON example (default if no lang attribute specified) -->
<!--
<i18n>
{
  "en": {
    "greeting": "Hello world!",
    "items": {
      "count": {
        "zero": "No items",
        "one": "One item",
        "other": "%{count} items"
      }
    }
  },
  "fr": {
    "greeting": "Bonjour le monde!",
    "items": {
      "count": {
        "zero": "Aucun élément",
        "one": "Un élément",
        "other": "%{count} éléments"
      }
    }
  }
}
</i18n>
-->
```

## Usage

### Basic Translation

```vue
<!-- Option 1: Using the useTranslate composable in script setup -->
<script setup>
import { useTranslate } from "vue-translate"
const { t } = useTranslate()
</script>

<template>
  <!-- Using function from composable -->
  <p>{{ t("app_name") }}</p>     <!-- Global translation (from messages in createVueTranslate) -->
  <p>{{ t(".local.key") }}</p>   <!-- Component-local translation (from <i18n> block, with leading dot) -->
</template>
```

```vue
<!-- Option 2: Using global helpers (available without importing or using the composable) -->
<template>
  <p>{{ $t("app_name") }}</p>     <!-- Global translation using $t helper -->
  <p>{{ $t(".local.key") }}</p>   <!-- Component-local translation using $t helper -->
</template>
```

### Variable Substitution

```yaml
# In i18n block
en:
  greeting: "Hello, %{name}!"
```

```vue
<!-- In template -->
<p>{{ t(".greeting", { name: "World" }) }}</p>  <!-- Outputs: Hello, World! -->
```

### Pluralization

```yaml
# In i18n block
en:
  items:
    count:
      zero: "No items"
      one: "One item"
      other: "%{count} items"
```

```vue
<!-- In template -->
<p>{{ t(".items.count", { count: 0 }) }}</p>  <!-- Outputs: No items -->
<p>{{ t(".items.count", { count: 1 }) }}</p>  <!-- Outputs: One item -->
<p>{{ t(".items.count", { count: 5 }) }}</p>  <!-- Outputs: 5 items -->
```

### Formatting

```vue
<!-- Option 1: Using the useTranslate composable -->
<script setup>
import { useTranslate } from "vue-translate"
const { l } = useTranslate()
const date = new Date()
const price = 42.99
</script>

<template>
  <p>{{ l(date) }}</p>                <!-- Default date format -->
  <p>{{ l(date, 'short') }}</p>       <!-- Named date format -->
  <p>{{ l(price) }}</p>               <!-- Default number format -->
  <p>{{ l(price, 'currency') }}</p>   <!-- Currency format -->
</template>
```

```vue
<!-- Option 2: Using global $l helper -->
<script setup>
const date = new Date()
const price = 42.99
</script>

<template>
  <p>{{ $l(date) }}</p>                <!-- Default date format -->
  <p>{{ $l(date, 'short') }}</p>       <!-- Named date format -->
  <p>{{ $l(price) }}</p>               <!-- Default number format -->
  <p>{{ $l(price, 'currency') }}</p>   <!-- Currency format -->
</template>
```

### Switching Locales

```vue
<!-- In setup script -->
const { locale, setLocale, availableLocales } = useTranslate()

<!-- In template -->
<select v-model="locale" @change="setLocale(locale)">
  <option v-for="lang in availableLocales" :key="lang" :value="lang">
    {{ lang }}
  </option>
</select>
```

## Format Configuration

You must configure the formats option for each locale to define how dates and numbers should be formatted. These formats are based directly on the browser's `Intl.DateTimeFormat` and `Intl.NumberFormat` APIs, and use the same options. Any format you want to use (such as 'currency', 'short', etc.) must be explicitly defined here.

```typescript
const vueTranslate = createVueTranslate({
  locale: "en",
  availableLocales: ["en", "fr"],
  // Other options...
  formats: {
    en: {
      // Date formats use Intl.DateTimeFormat options
      date: {
        default: { year: "numeric", month: "long", day: "numeric" },
        short: { year: "numeric", month: "short", day: "numeric" },
        long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
      },
      // Number formats use Intl.NumberFormat options
      number: {
        default: { style: "decimal" },
        currency: { style: "currency", currency: "USD" },
        percentage: { style: "percent" },
      },
    },
    fr: {
      number: {
        currency: { style: "currency", currency: "EUR" },
      },
      // You must define all formats you plan to use
      // Missing formats will result in warnings if showMissingTranslationWarnings is enabled
    },
  },
})
```
