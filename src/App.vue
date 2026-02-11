<script setup lang="ts">
</script>

<template>
  <nav>
    <RouterLink to="/">Progress Page</RouterLink>
    <RouterLink to="/chart-page">Chart Page</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  nav {
    border: 1px solid;
    padding: 10px;
    margin-bottom: 20px;
  }
  a {
    display: block;
  }
</style>

<style>
  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
