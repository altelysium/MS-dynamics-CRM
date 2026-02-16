<script setup lang="ts">
import LogoIcon from "./icons/LogoIcon.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <div class="pi pi-bars" style="color: #848485; font-size: 18px"></div>
    <RouterLink :to="{ name: 'home' }" style="text-decoration: none; color: inherit; flex-grow: 2">
      <div class="header__logo">
        <LogoIcon />
        <h1 class="header__logo-title">HCare</h1>
      </div>
    </RouterLink>

    <div class="pi pi-bell" style="color: #848485; font-size: 24px"></div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 40px;
  box-shadow: 0px -1px 0px 0px #e2e2ea inset;
  gap: 20px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 5px;
}

.header__logo-title {
  font: 600 20px/30px "Poppins";
}
</style>
