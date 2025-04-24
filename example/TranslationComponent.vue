<script setup lang="ts">
import { useTranslate } from "@hakunajs/vue-translate"
import CodeBlock from "./CodeBlock.vue"

interface Fruit {
  name: string
  color: string
}

const { t, locale } = useTranslate()
</script>

<template>
  <div class="translation-component">
    <h2>{{ t(".title") }}</h2>

    <div class="example-section">
      <h3>{{ t(".sections.translation_methods") }}</h3>
      <CodeBlock
        :code="`// Component-local translations use a leading dot\n// In setup script\nconst { t } = useTranslate()\n\n// In template\n<p>{{ t('.hello') }}</p>\n<p>{{ $t('.hello') }}</p>`"
      />
      <div class="example-row">
        <div class="example-col">
          <p class="method-name">t()</p>
          <p class="result">{{ t(".hello") }}</p>
        </div>
        <div class="example-col">
          <p class="method-name">$t()</p>
          <p class="result">{{ $t(".hello") }}</p>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.missing_translations") }}</h3>
      <CodeBlock
        :code="`// Missing local translation (with leading dot)\n<p>{{ t('.non_existent_key') }}</p>\n\n// Missing global translation (without leading dot)\n<p>{{ t('non_existent_global_key') }}</p>`"
      />
      <div class="example-row">
        <div class="example-col">
          <p class="method-name">{{ t(".missing.local") }}</p>
          <p class="result">{{ t(".non_existent_key") }}</p>
        </div>
        <div class="example-col">
          <p class="method-name">{{ t(".missing.global") }}</p>
          <p class="result">{{ t("non_existent_global_key") }}</p>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.variable_substitution") }}</h3>
      <CodeBlock
        :code="`// In YAML\ngreeting: 'Welcome, %{name}!'\n\n// In template\n<p>{{ t('.greeting', { name: 'Vue' }) }}</p>`"
      />
      <p>{{ t(".greeting", { name: "Vue" }) }}</p>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.pluralization") }}</h3>
      <CodeBlock
        :code="`// In YAML\nitems.count:\n  zero: No items\n  one: One item\n  other: '%{count} items'\n\n// In template\n<p>{{ t('.items.count', { count: 0 }) }}</p>\n<p>{{ t('.items.count', { count: 1 }) }}</p>\n<p>{{ t('.items.count', { count: 5 }) }}</p>`"
      />
      <div class="example-row">
        <div class="example-col">
          <p>{{ t(".items.count", { count: 0 }) }}</p>
        </div>
        <div class="example-col">
          <p>{{ t(".items.count", { count: 1 }) }}</p>
        </div>
        <div class="example-col">
          <p>{{ t(".items.count", { count: 5 }) }}</p>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.nesting") }}</h3>
      <CodeBlock
        :code="`// In YAML\nnested:\n  key:\n    example: 'This is a nested translation key'\n\n// In template\n<p>{{ t('.nested.key.example') }}</p>`"
      />
      <p>{{ t(".nested.key.example") }}</p>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.global_access") }}</h3>
      <CodeBlock
        :code="`// Component-local vs global translations\n// Component-local (with leading dot):\n<p>{{ t('.current_locale') }}: {{ locale }}</p>\n\n// Global (without leading dot):\n<p>{{ t('app_name') }}</p>`"
      />
      <p>
        {{ t(".current_locale") }}: <span class="highlight">{{ locale }}</span>
      </p>
      <p>
        {{ t(".global_message") }}: <span class="highlight">{{ t("app_name") }}</span>
      </p>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.array_translations") }}</h3>
      <CodeBlock
        :code="`// In YAML\ncolors:\n  - Red\n  - Green\n  - Blue\n\nfruits:\n  - name: Apple\n    color: Red\n  - name: Banana\n    color: Yellow\n\n// In template\n// Access the full array without count parameter\n<ul>\n  <li v-for=&quot;color in t('.colors')\&quot; :key=&quot;color&quot;>{{ color }}</li>\n</ul>\n\n// Access complex array objects\n<div v-for=&quot;fruit in t('.fruits')&quot; :key=&quot;fruit.name&quot;>\n  {{ fruit.name }} - {{ fruit.color }}\n</div>`"
      />
      <div class="example-row">
        <div class="example-col">
          <p class="method-name">Simple array:</p>
          <div class="result">
            <ul>
              <li v-for="color in t('.colors')" :key="color">{{ color }}</li>
            </ul>
          </div>
        </div>
        <div class="example-col">
          <p class="method-name">Complex array:</p>
          <div class="result">
            <div v-for="fruit in t('.fruits') as Fruit[]" :key="fruit.name" class="fruit-item">
              {{ fruit.name }} - {{ fruit.color }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  title: Translation Component
  hello: Hello from translation component!
  greeting: Welcome, %{name}!
  current_locale: Current locale
  global_message: Global message
  nested:
    key:
      example: This is a nested translation key
  sections:
    translation_methods: Translation Methods
    missing_translations: Missing Translations
    variable_substitution: Variable Substitution
    pluralization: Pluralization
    nesting: Nested Keys
    global_access: Global Access
    array_translations: Array Translations
  colors:
    - Red
    - Green
    - Blue
  fruits:
    - name: Apple
      color: Red
    - name: Banana
      color: Yellow
    - name: Grape
      color: Purple
  missing:
    local: Missing local key
    global: Missing global key
  items:
    count:
      zero: No items
      one: One item
      other: "%{count} items"

de:
  title: Übersetzungskomponente
  hello: Hallo aus der Übersetzungskomponente!
  greeting: Willkommen, %{name}!
  current_locale: Aktuelle Sprache
  global_message: Globale Nachricht
  nested:
    key:
      example: Dies ist ein verschachtelter Übersetzungsschlüssel
  sections:
    translation_methods: Übersetzungsmethoden
    missing_translations: Fehlende Übersetzungen
    variable_substitution: Variablenersetzung
    pluralization: Pluralisierung
    nesting: Verschachtelte Schlüssel
    global_access: Globaler Zugriff
    array_translations: Array-Übersetzungen
  colors:
    - Rot
    - Grün
    - Blau
  fruits:
    - name: Apfel
      color: Rot
    - name: Banane
      color: Gelb
    - name: Traube
      color: Lila
  missing:
    local: Fehlender lokaler Schlüssel
    global: Fehlender globaler Schlüssel
  items:
    count:
      zero: Keine Elemente
      one: Ein Element
      other: "%{count} Elemente"

"de-CH":
  title: Übersetzungskomponente
  hello: Grüezi aus der Übersetzungskomponente!
  greeting: Willkommen, %{name}!
  current_locale: Aktuelle Sprache
  global_message: Globale Nachricht
  nested:
    key:
      example: Dies ist ein verschachtelter Übersetzungsschlüssel
  sections:
    translation_methods: Übersetzungsmethoden
    missing_translations: Fehlende Übersetzungen
    variable_substitution: Variablenersetzung
    pluralization: Pluralisierung
    nesting: Verschachtelte Schlüssel
    global_access: Globaler Zugriff
    array_translations: Array-Übersetzunge
  colors:
    - Rot
    - Grüen
    - Blau
  fruits:
    - name: Öpfel
      color: Rot
    - name: Banane
      color: Gälb
    - name: Trube
      color: Violett
  missing:
    local: Fehlender lokaler Schlüssel
    global: Fehlender globaler Schlüssel
  items:
    count:
      zero: Keine Elemente
      one: Ein Element
      other: "%{count} Elemente"
</i18n>

<style scoped>
.translation-component {
  background-color: #e8f4f8;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  height: 100%;
  font-size: 14px;
}

.example-section {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
}

.example-col {
  flex: 1;
  min-width: 140px;
  background-color: #f5f9fb;
  border-radius: 4px;
  padding: 10px;
}

.method-name {
  font-weight: bold;
  color: #0277bd;
  margin-bottom: 5px;
  font-size: 13px;
}

.result {
  background-color: #e1f5fe;
  padding: 8px;
  border-radius: 4px;
  border-left: 3px solid #0277bd;
  font-size: 13px;
}

.fruit-item {
  margin-bottom: 5px;
}

h2 {
  color: #0277bd;
  margin-top: 0;
  border-bottom: 2px solid #b3e5fc;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 20px;
}

h3 {
  color: #0277bd;
  margin-top: 0;
  font-size: 16px;
  margin-bottom: 15px;
}

.highlight {
  font-weight: bold;
  color: #0277bd;
}

p {
  margin: 8px 0;
  line-height: 1.4;
}
</style>
