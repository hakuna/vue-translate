<template>
  <div>
    <div>{{ $t("title") }}</div>
    <div>{{ $t("settings.theme") }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<i18n>
{
  "title": "Default JSON Content",
  "settings": {
    "theme": "dark",
    "language": "en"
  }
}
</i18n>
