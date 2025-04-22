<template>
  <div>
    <div>{{ $t("hello") }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<i18n lang="yaml">
hello: Hello World
  indentation-error
:invalid:yaml:syntax:
</i18n>
