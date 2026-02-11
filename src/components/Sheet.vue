<script setup lang="ts">
import { DataTable, Column } from "primevue";
import type { sheetRow } from "../views/HomeView.vue";
import ScheduleIcon from "./icons/ScheduleIcon.vue";
import { Button } from "primevue";
defineProps<{
  sheetData: sheetRow[];
  isLoading: boolean;
}>();
</script>

<template>
  <DataTable
    :value="sheetData"
    :loading="isLoading"
    :rows="10"
    paginator
    removableSort
    scrollable
    scrollHeight="600px"
    style="border: 1px #ececed solid; border-radius: 12px; padding: 16px 0"
  >
    <Column field="name" header="Name">
      <template #body="slotProps">
        <div class="column-name-wrapper">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.name"
            class="td__img"
          />
          <div class="td-info">
            <p class="td-info__title">{{ slotProps.data.name }}</p>
            <p class="td-info__description">{{ slotProps.data.specs }}</p>
          </div>
        </div>
      </template>
    </Column>
    <Column field="cityCountry" header="City/Country"></Column>
    <Column field="availableHours" header="Available hours"></Column>
    <Column field="schedule" header="Schedule an appointment">
      <template #body="slotProps">
        <Button
          :label="slotProps.data.schedule"
          severity="success"
          variant="text"
          style="display: flex; vertical-align: middle; border: 0"
        >
          <template #icon>
            <ScheduleIcon />
          </template>
        </Button>
      </template>
    </Column>
    <Column field="confirmation" header="Confirmation"></Column>
  </DataTable>
</template>

<style scoped>
:deep(.p-datatable-header-cell) {
  padding: 0px 12px 16px 12px;
}

:deep(.p-datatable-column-title) {
  color: #92929d;
}

.column-name-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.td-info__title {
  font: 500 14px/21px "Poppins";
  letter-spacing: 0.2px;
}

.td-info__description {
  font: 500 12px/18px "Poppins";
  color: #818181;
}

.td__img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}

:deep(.p-datatable-tbody > tr > td) {
  vertical-align: middle;
}
</style>
