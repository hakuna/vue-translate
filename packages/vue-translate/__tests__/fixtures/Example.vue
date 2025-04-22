<template>
  <div>
    <!-- Global translations -->
    <p class="global-t">{{ $t("hello") }}</p>
    <p class="global-t-vars">{{ $t("welcome", { name: "User" }) }}</p>

    <!-- Component-level translations -->
    <p class="component-t">{{ $t("greeting") }}</p>
    <p class="component-t-vars">{{ $t("intro", { name: "User" }) }}</p>

    <!-- Formatting -->
    <p class="template-l-date">{{ $l(testDate, "short") }}</p>
    <p class="template-l-currency">{{ $l(testNumber, "currency") }}</p>

    <div class="setup-section">
      <!-- Global translations in setup -->
      <p class="setup-global-t">{{ globalText }}</p>

      <!-- Component translations in setup -->
      <p class="setup-component-t">{{ componentText }}</p>
      <p class="setup-component-t-vars">{{ introText }}</p>

      <!-- Formatting in setup -->
      <p class="setup-l-date">{{ formattedDate }}</p>
      <p class="setup-l-currency">{{ formattedCurrency }}</p>
    </div>

    <button class="toggle-locale" @click="toggleLocale">Toggle Locale</button>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useTranslate } from "../../src"

const testDate = new Date("2023-01-15")
const testNumber = 123.45

const { t, l, locale, setLocale } = useTranslate()

// Setup function values - global and component translations
const globalText = computed(() => t("hello"))
const componentText = computed(() => t("greeting"))
const introText = computed(() => t("intro", { name: "User" }))

// Formatting
const formattedDate = computed(() => l(testDate, "short"))
const formattedCurrency = computed(() => l(testNumber, "currency"))

const toggleLocale = () => {
  setLocale(locale.value === "en" ? "fr" : "en")
}
</script>

<i18n lang="yaml">
en:
  greeting: "Hello from component"
  intro: "Let me introduce %{name}"
fr:
  greeting: "Bonjour du composant"
  intro: "Je vous présente %{name}"
</i18n>
