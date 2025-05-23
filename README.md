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
- 📋 **Array translations** for direct iteration in templates
- 🌈 **Locale switching** with automatic UI updates
- ⚙️ **Vite integration** with automatic SFC `<i18n>` block processing

## Installation

```bash
# Install the core package for runtime translation functionality
npm install @hakunajs/vue-translate

# Install the SFC unplugin as a dev dependency (for <i18n> block support)
npm install --save-dev @hakunajs/unplugin-vue-translate
```

## Quick Start

### 1. Configure Vue Translate in your main.ts/js file

```typescript
import { createApp } from "vue"
import { createVueTranslate } from "@hakunajs/vue-translate"
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
import VueTranslate from "@hakunajs/unplugin-vue-translate/vite"

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
import { useTranslate } from "@hakunajs/vue-translate"

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

#### Option 1: Using the useTranslate composable in script setup

```vue
<script setup>
import { useTranslate } from "@hakunajs/vue-translate"
const { t } = useTranslate()
</script>

<template>
  <p>{{ t("app_name") }}</p>     <!-- Global translation (from messages in createVueTranslate) -->
  <p>{{ t(".local.key") }}</p>   <!-- Component-local translation (from <i18n> block, with leading dot) -->
</template>
```

#### Option 2: Using global helpers (available without importing or using the composable)

```vue
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
    zero: "No items"
    one: "One item"
    other: "%{count} items"
```

```vue
<!-- In template -->
<p>{{ t(".items", { count: 0 }) }}</p>  <!-- Outputs: No items -->
<p>{{ t(".items", { count: 1 }) }}</p>  <!-- Outputs: One item -->
<p>{{ t(".items", { count: 5 }) }}</p>  <!-- Outputs: 5 items -->
```

### Array Translations

Array-like translations can be fetched with the `ta` helper, allowing you to iterate through them directly in your templates.

```vue
<script setup lang="ts">
import { useTranslate } from "@hakunajs/vue-translate"
import type { TranslationResult } from "@hakunajs/vue-translate"

// Define interfaces for your translation object structures
interface Fruit {
  name: string
  color: string
}

const { ta } = useTranslate()

// For script usage with proper typing using type assertions
const colors = ta('.colors') as string[]
const fruits = ta('.fruits') as Fruit[]
</script>

<template>
  <!-- Iterate through simple array -->
  <ul>
    <li v-for="color in ta('.colors') as string[]" :key="color">{{ color }}</li>
  </ul>

  <!-- Iterate through array of objects with type assertion -->
  <div v-for="fruit in ta('.fruits') as Fruit[]" :key="fruit.name">
    {{ fruit.name }} - {{ fruit.color }}
  </div>
</template>

<i18n lang="yaml">
en:
  # Simple array of strings
  colors:
    - Red
    - Green
    - Blue
    - Yellow
    - Purple

  # Array of objects with properties
  fruits:
    - name: Apple
      color: Red
    - name: Banana
      color: Yellow
    - name: Grape
      color: Purple
    - name: Orange
      color: Orange
    - name: Blueberry
      color: Blue
</i18n>
```

This feature is particularly useful for:
- Dropdown/select options lists
- Navigation menus
- Any UI that requires iterating through lists of items
- Form validation messages
- Dynamic content like FAQs or feature lists

### Formatting

#### Option 1: Using the useTranslate composable

```vue
<script setup>
import { useTranslate } from "@hakunajs/vue-translate"
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

#### Option 2: Using global $l helper

```vue
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
