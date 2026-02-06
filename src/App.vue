<script setup lang="ts">
</script>

<template>
  Main page
  <nav>
    <RouterLink to="/">Main page</RouterLink>
    <RouterLink to="/second-page">Second page</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
