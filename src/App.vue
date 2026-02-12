<script setup lang="ts">
</script>

<template>
  <nav>
    <RouterLink to="/" exact-active-class="active">Progress Page</RouterLink>
    <RouterLink to="/chart-page" active-class="active">Chart Page</RouterLink>
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
    margin: 10px;
  }
  .active {
    color: red;
  }
</style>

<style>
  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    --p-button-label-font-weight: 300;
    --p-floatlabel-color: #99A1B7;
  }
</style>
