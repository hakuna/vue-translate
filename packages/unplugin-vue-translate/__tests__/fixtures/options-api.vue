<template>
  <div>
    <div>{{ $t("title") }}</div>
  </div>
</template>

<script>
export default {
  name: "OptionsApiComponent",
  data() {
    return {
      someData: "example",
    }
  },
  created() {
    console.log("Original created hook")
  },
}
</script>

<i18n lang="yaml">
title: Options API Component
description: Testing with the Options API
</i18n>
