<script setup lang="ts">
import { useTranslate } from "vue-translate"
import { ref } from "vue"
import CodeBlock from "./CodeBlock.vue"

// Use the composable to get formatting functions and locale info
const { t, l, locale } = useTranslate()

// Initialize example data
const currentDate = ref(new Date())
const price = ref(1234.56)

// Functions to update the examples
function updateDate() {
  currentDate.value = new Date()
}

function updatePrice() {
  // Random price between 10 and 2000
  price.value = Math.round(Math.random() * 1990 + 10) + Math.random()
}
</script>

<template>
  <div class="formatting-component">
    <h2>{{ t(".title") }}</h2>

    <div class="example-section">
      <h3>{{ t(".sections.formatting_methods") }}</h3>
      <CodeBlock
        :code="`// Component-local translations use a leading dot\n// In setup script\nconst { l } = useTranslate()\n\n// In template\n<p>{{ l(currentDate) }}</p>\n<p>{{ $l(currentDate) }}</p>`"
      />
      <div class="example-row">
        <div class="example-col">
          <p class="method-name">l()</p>
          <p class="result">{{ l(currentDate) }}</p>
        </div>
        <div class="example-col">
          <p class="method-name">$l()</p>
          <p class="result">{{ $l(currentDate) }}</p>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.date_formatting") }}</h3>
      <CodeBlock
        :code="`// Default formatting\n{{ l(currentDate) }}\n\n// Using named formats defined in main.ts\n{{ l(currentDate, 'short') }}\n{{ l(currentDate, 'long') }}`"
      />
      <div class="example-row">
        <div class="example-col">
          <p>{{ t(".formats.default") }}</p>
          <p class="result">{{ l(currentDate) }}</p>
        </div>
        <div class="example-col">
          <p>{{ t(".formats.short") }}</p>
          <p class="result">{{ l(currentDate, "short") }}</p>
        </div>
        <div class="example-col">
          <p>{{ t(".formats.long") }}</p>
          <p class="result">{{ l(currentDate, "long") }}</p>
        </div>
      </div>
      <button @click="updateDate" class="update-button">{{ t(".actions.update_date") }}</button>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.number_formatting") }}</h3>
      <CodeBlock
        :code="`// Default number formatting\n{{ l(price) }}\n\n// Currency formatting using 'currency' format\n{{ l(price, 'currency') }}\n\n// Percentage with 'percentage' format\n{{ l(price / 100, 'percentage') }}`"
      />
      <div class="example-row">
        <div class="example-col">
          <p>{{ t(".formats.number") }}</p>
          <p class="result">{{ l(price) }}</p>
        </div>
        <div class="example-col">
          <p>{{ t(".formats.currency") }}</p>
          <p class="result">{{ l(price, "currency") }}</p>
        </div>
        <div class="example-col">
          <p>{{ t(".formats.percent") }}</p>
          <p class="result">{{ l(price / 100, "percentage") }}</p>
        </div>
      </div>
      <button @click="updatePrice" class="update-button">{{ t(".actions.update_price") }}</button>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.custom_formats") }}</h3>
      <CodeBlock
        :code="`// Custom precision format\n{{ l(price, 'precise') }}\n\n// Compact notation format\n{{ l(price * 1000, 'compact') }}`"
      />
      <div class="example-row">
        <div class="example-col">
          <p>{{ t(".formats.precise") }}</p>
          <p class="result">{{ l(price, "precise") }}</p>
        </div>
        <div class="example-col">
          <p>{{ t(".formats.compact") }}</p>
          <p class="result">{{ l(price * 1000, "compact") }}</p>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.missing_format") }}</h3>
      <CodeBlock
        :code="`// When a format doesn't exist, it falls back to default formatting\n// and logs a warning if enabled in configuration\n{{ l(currentDate, 'non_existent_format') }}\n\n// Attempting to use a non-existent format:\n<p>{{ l(price, 'non_existent_format') }}</p>`"
      />
      <div class="example-row">
        <div class="example-col">
          <p>{{ t(".formats.missing_date") }}</p>
          <p class="result">{{ l(currentDate, "non_existent_format") }}</p>
        </div>
        <div class="example-col">
          <p>{{ t(".formats.missing_number") }}</p>
          <p class="result">{{ l(price, "non_existent_format") }}</p>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h3>{{ t(".sections.global_access") }}</h3>
      <CodeBlock
        :code="`// Component-local vs global translations\n// Component-local (with leading dot):\n<p>{{ t('.current_locale') }}: {{ locale }}</p>\n\n// Global (without leading dot):\n<p>App name: {{ t('app_name') }}</p>`"
      />
      <p>
        {{ t(".current_locale") }}: <span class="highlight">{{ locale }}</span>
      </p>
      <p>
        {{ t(".global_message") }}: <span class="highlight">{{ t("app_name") }}</span>
      </p>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  title: Formatting Component
  current_locale: Current locale
  global_message: Global message
  sections:
    formatting_methods: Formatting Methods
    date_formatting: Date Formatting
    number_formatting: Number Formatting
    custom_formats: Custom Formats
    missing_format: Missing Format
    global_access: Global Access
  formats:
    default: Default
    short: Short
    long: Long
    number: Number
    currency: Currency
    percent: Percentage
    precise: Precise (2 decimals)
    compact: Compact Notation
    missing_date: Non-existent Date Format
    missing_number: Non-existent Number Format
  actions:
    update_date: Update Date
    update_price: Update Price

de:
  title: Formatierungskomponente
  current_locale: Aktuelle Sprache
  global_message: Globale Nachricht
  sections:
    formatting_methods: Formatierungsmethoden
    date_formatting: Datumsformatierung
    number_formatting: Zahlenformatierung
    custom_formats: Benutzerdefinierte Formate
    missing_format: Fehlendes Format
    global_access: Globaler Zugriff
  formats:
    default: Standard
    short: Kurz
    long: Lang
    number: Zahl
    currency: Währung
    percent: Prozentsatz
    precise: Präzise (2 Dezimalstellen)
    compact: Kompakte Notation
    missing_date: Nicht existierendes Datumsformat
    missing_number: Nicht existierendes Zahlenformat
  actions:
    update_date: Datum aktualisieren
    update_price: Preis aktualisieren

"de-CH":
  title: Formatierungskomponente
  current_locale: Aktuelle Sprache
  global_message: Globale Nachricht
  sections:
    formatting_methods: Formatierungsmethoden
    date_formatting: Datumsformatierung
    number_formatting: Zahlenformatierung
    custom_formats: Benutzerdefinierte Formate
    missing_format: Fehlendes Format
    global_access: Globaler Zugriff
  formats:
    default: Standard
    short: Kurz
    long: Lang
    number: Zahl
    currency: Währung
    percent: Prozentsatz
    precise: Präzise (2 Dezimalstellen)
    compact: Kompakte Notation
  actions:
    update_date: Datum aktualisieren
    update_price: Preis aktualisieren
</i18n>

<style scoped>
.formatting-component {
  background-color: #f8e8f8;
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
  background-color: #faf5fa;
  border-radius: 4px;
  padding: 10px;
}

.method-name {
  font-weight: bold;
  color: #9c27b0;
  margin-bottom: 5px;
  font-size: 13px;
}

.result {
  background-color: #f3e5f5;
  padding: 8px;
  border-radius: 4px;
  border-left: 3px solid #9c27b0;
  font-size: 13px;
}

h2 {
  color: #9c27b0;
  margin-top: 0;
  border-bottom: 2px solid #e1bee7;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 20px;
}

h3 {
  color: #9c27b0;
  margin-top: 0;
  font-size: 16px;
  margin-bottom: 15px;
}

.highlight {
  font-weight: bold;
  color: #9c27b0;
}

p {
  margin: 8px 0;
  line-height: 1.4;
}

.update-button {
  margin-top: 10px;
  padding: 6px 14px;
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.update-button:hover {
  background-color: #7b1fa2;
}
</style>
