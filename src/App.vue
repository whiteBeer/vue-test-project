<script setup lang="ts">
</script>

<template>
  <nav>
    <RouterLink to="/">Main page</RouterLink>
    <RouterLink to="/second-page">Second page</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  nav {
    border: 1px solid;
    padding: 10px;
  }
  a {
    display: block;
  }
</style>
