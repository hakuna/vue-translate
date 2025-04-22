import { createApp } from "vue"
import { createVueTranslate } from "vue-translate"
import App from "./App.vue"

const vueTranslate = createVueTranslate({
  locale: "en",
  availableLocales: ["en", "de", "de-CH"],
  showMissingTranslationWarnings: true,
  messages: {
    en: {
      app_name: "Vue Translate",
      app_description: "A simple translation plugin for Vue",
      my_scope: "Global (en.my_scope)",
    },
    de: {
      app_name: "Vue Translate",
      app_description: "Ein einfaches Übersetzungstool für Vue",
      my_scope: "Global (de.my_scope)",
    },
    "de-CH": {
      app_name: "Vue Translate",
      app_description: "Ein einfaches Übersetzungstool für Vue",
      my_scope: "Global (de-CH.my_scope)",
    },
  },
  formats: {
    en: {
      date: {
        default: { year: "numeric", month: "long", day: "numeric" },
        short: { year: "numeric", month: "short", day: "numeric" },
        long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
      },
      number: {
        default: { style: "decimal" },
        compact: { notation: "compact" },
        precise: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
        percentage: { style: "percent", minimumFractionDigits: 1 },
        currency: { style: "currency", currency: "USD" },
      },
    },
    de: {
      date: {
        default: { year: "numeric", month: "long", day: "numeric" },
        short: { year: "numeric", month: "2-digit", day: "2-digit" },
        long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
      },
      number: {
        default: { style: "decimal" },
        compact: { notation: "compact" },
        precise: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
        percentage: { style: "percent", minimumFractionDigits: 1 },
        currency: { style: "currency", currency: "EUR" },
      },
    },
    "de-CH": {
      date: {
        default: { year: "numeric", month: "long", day: "numeric" },
        short: { year: "numeric", month: "2-digit", day: "2-digit" },
        long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
      },
      number: {
        default: { style: "decimal" },
        compact: { notation: "compact" },
        precise: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
        percentage: { style: "percent", minimumFractionDigits: 1 },
        currency: { style: "currency", currency: "CHF" },
      },
    },
  },
})

const app = createApp(App)
app.use(vueTranslate)
app.mount("#app")
