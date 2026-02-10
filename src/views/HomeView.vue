<script setup lang="ts">
import { Button } from 'primevue';
import FilterIcon from '../components/icons/FilterIcon.vue';
</script>

<template>
  <section class="home-page">
    <nav class="page-nav">
      <h2 class="home-page__title">Medical Staff</h2>
      <Button label="Filter" variant="outlined" severity="success" rounded style="color: #2BB567; outline-color: #ECECED;"><template #icon><FilterIcon/></template></Button>
    </nav>
  </section>
</template>

<style>
.home-page {
  max-width: 1170px;
  box-shadow: 0px 4px 10px 0px #00000026;
  margin: 0 auto;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 30px 35px;
}

.page-nav {
  display: flex;
  justify-content: space-between;
}

.home-page__title {
  font: 600 24px/36px "Poppins";
}
</style>