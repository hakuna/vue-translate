<template>
  <div>
    <div>{{ $t("greeting") }}</div>
    <div>{{ $t("info.version") }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<i18n lang="json">
{
  "greeting": "Hello from JSON!",
  "info": {
    "version": "1.0.0",
    "name": "Vue Translate"
  }
}
</i18n>
