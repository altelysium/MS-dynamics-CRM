<script setup lang="ts">
import type { ColumnProperties } from "../../types/profileTypes";
import { DataTable, Column, Rating, ToggleSwitch } from "primevue";

const props = defineProps<{
  data: Record<string, unknown>[];
  columns: ColumnProperties[];
}>();
</script>

<template>
  <DataTable :value="data" scroll-height="300px" scroll-width="420px" scrollable>
    <Column
      v-for="(col, index) in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    >
      <template v-if="col.field === 'date'" #body="slotProps">
        <p style="padding-bottom: 5px">{{ slotProps.data.date.slice(0, 10) }}</p>
        <p>{{ slotProps.data.date.slice(10) }}</p>
      </template>
      <template v-if="col.field === 'feedbackStatus' && data[index]" #body="slotProps">
        <Rating
          :model-value="Number(slotProps.data.feedbackStatus)"
          readonly
          :pt="{
            onIcon: { style: { color: '#FFC224' } },
          }"
        />
      </template>
      <template v-if="col.field === 'status'" #body="slotProps">
        <p
          :style="
            slotProps.data.status == 'Cancelled' ? { color: '#FFA41B' } : { color: '#22C04E' }
          "
        >
          {{ slotProps.data.status }}
        </p>
      </template>
      <template v-if="col.field === 'contactMethod'" #body="slotProps">
        <div class="card-row">
          <p class="card-row__title">{{ slotProps.data.contactMethod }}</p>
          <div class="card-row-toggle-container">
            <p class="card-row-toggle-container__text">DENY</p>
            <ToggleSwitch style="height: 16px" />
            <p class="card-row-toggle-container__text" style="color: #2bb567">ALLOW</p>
          </div>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
:deep(.p-datatable-header-cell) {
  font: 400 12px/14px "Poppins";
  color: #848485;
  background-color: #f8f8f8;
  border: 1px #ececed solid;
}

:deep(.p-datatable-tbody > tr > td) {
  font:
    400 12px/14px "Roboto",
    sans-serif;
  color: #303030;
}

.card-row {
  display: flex;
}

.card-row > * {
  flex: 1;
}

.card-row-toggle-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-row-toggle-container__text {
  font:
    400 12px/14px "Roboto",
    sans-serif;
  color: #b5b5be;
}
</style>
