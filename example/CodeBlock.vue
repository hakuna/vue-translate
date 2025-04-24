<script setup lang="ts">
defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "vue",
  },
})
</script>

<template>
  <div class="code-block">
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code-block {
  margin: 0 0 10px 0;
  background-color: #282c34;
  border-radius: 6px;
  overflow: auto;
}

pre {
  margin: 0;
  padding: 12px;
  font-family: "Fira Code", Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 13px;
  line-height: 1.4;
  color: #abb2bf;
  white-space: pre;
  overflow-x: auto;
}

code {
  font-family: inherit;
}
</style>
