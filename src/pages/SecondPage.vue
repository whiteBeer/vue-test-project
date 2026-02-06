<script setup lang="ts">
  import { ref } from 'vue'

  const message = ref<string>('Hello World!')

  function onClick (e: MouseEvent) {
    message.value = "123";
    console.log(e);
  }
</script>

<template>
  <h1>Second page</h1>

  <input v-model="message" />
  <div>{{ message }}</div>
  <button @click="onClick">Click </button>
</template>
