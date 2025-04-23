<script setup lang="ts">
import { useTranslate } from "@hakunajs/vue-translate"
import TranslationComponent from "./TranslationComponent.vue"
import FormattingComponent from "./FormattingComponent.vue"

// Use the composable to get translations, locale info, and methods
const { t, locale, availableLocales, setLocale } = useTranslate()

// Function to change the locale
function changeLocale(newLocale: string) {
  setLocale(newLocale)
}
</script>

<template>
  <div class="app">
    <header>
      <h1>{{ t("app_name") }}</h1>
      <p>{{ t("app_description") }}</p>

      <div class="locale-switcher">
        <span
          >{{ t(".current_locale") }}: <b>{{ locale }}</b></span
        >
        <div class="language-buttons">
          <button
            v-for="lang in availableLocales"
            :key="lang"
            @click="changeLocale(lang)"
            :class="{ active: locale === lang }"
          >
            {{ t(`.languages.${lang}`) }}
          </button>
        </div>
      </div>
    </header>

    <main>
      <div class="component-grid">
        <!-- Translation component showcasing t() and $t() -->
        <TranslationComponent />

        <!-- Formatting component showcasing l() and $l() -->
        <FormattingComponent />
      </div>
    </main>

    <footer>
      <p>{{ t(".footer.available_locales") }}: {{ availableLocales.join(", ") }}</p>
      <p class="github-link">
        <a href="https://github.com/@hakunajs/vue-translate" target="_blank">
          {{ t(".footer.github") }}
        </a>
      </p>
    </footer>
  </div>
</template>

<i18n lang="yaml">
en:
  current_locale: Current locale
  languages:
    en: English
    de: German
    de-CH: Swiss German
  footer:
    available_locales: Available locales
    github: View on GitHub

de:
  current_locale: Aktuelle Sprache
  languages:
    en: Englisch
    de: Deutsch
    de-CH: Schweizerdeutsch
  footer:
    available_locales: Verfügbare Sprachen
    github: Auf GitHub ansehen

"de-CH":
  current_locale: Aktuelle Sprache
  languages:
    en: Englisch
    de: Deutsch
    de-CH: Schweizerdeutsch
  footer:
    available_locales: Verfügbare Sprachen
    github: Auf GitHub ansehen
</i18n>

<style>
.app {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  margin-bottom: 10px;
  color: #333;
}

.locale-switcher {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.language-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.language-buttons button {
  padding: 8px 16px;
  background-color: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.language-buttons button:hover {
  background-color: #d0d0d0;
}

.language-buttons button.active {
  background-color: #4a90e2;
  color: white;
}

.component-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .component-grid {
    grid-template-columns: 1fr;
  }
}

footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.github-link a {
  color: #4a90e2;
  text-decoration: none;
}

.github-link a:hover {
  text-decoration: underline;
}
</style>
