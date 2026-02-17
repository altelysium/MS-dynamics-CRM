<script setup lang="ts">
import { Button } from "primevue";
import EditIcon from "./icons/EditIcon.vue";
const props = defineProps<{
  title: string;
  cardType: "info" | "list" | "sheet";
  editable?: true;
}>();
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-header__title">{{ title }}</h3>
      <Button
        v-if="editable"
        icon="pi pi-pen-to-square"
        aria-label="Edit"
        severity="secondary"
        variant="outlined"
        style="width: 35px; height: 35px"
      >
        <template #icon> <EditIcon /> </template
      ></Button>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  width: 355px;
  outline: 1px #ececed solid;
  border-radius: 12px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px #ececed solid;
}

.card-header__title {
  font: 600 16px/24px "Poppins";
}
</style>
