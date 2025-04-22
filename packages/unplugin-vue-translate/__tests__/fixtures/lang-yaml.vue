<template>
  <div>
    <div>{{ $t("hello") }}</div>
    <div>{{ $t("welcome", { name }) }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "User",
    }
  },
}
</script>

<i18n lang="yaml">
hello: Hello World
welcome: Welcome, {name}!
button:
  save: Save
  cancel: Cancel
</i18n>
