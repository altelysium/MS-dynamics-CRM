<script setup lang="ts">
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Header></Header>
  <main class="main">
    <RouterView class="router-view" />
  </main>
</template>

<style scoped>
.main {
  width: 100%;
  height: calc(100vh - 70px);
  background-color: #f9f9f9;
  padding-top: 24px;
}
</style>
