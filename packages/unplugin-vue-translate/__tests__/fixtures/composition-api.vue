<template>
  <div>
    <div>{{ $t(".title") }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const count = ref(0)
const increment = () => {
  count.value++
}
</script>

<i18n lang="yaml">
title: Composition API Component
description: Testing with the Composition API
buttons:
  increment: Increment
</i18n>
