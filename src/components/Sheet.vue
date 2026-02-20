<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "../stores/usersStore";
import { router } from "../router/routes";
import type { sheetRow } from "../types/userTypes";
import { DataTable, Column, type DataTablePageEvent, type DataTableRowSelectEvent, Button } from "primevue";
import ScheduleIcon from "./icons/ScheduleIcon.vue";

const props = defineProps<{
  sheetData: sheetRow[];
  isLoading: boolean;
  total: number;
  rows: number;
  first: number;
}>();

const usersStore = useUsersStore();
let { queryParams, sheetPageResetter } = storeToRefs(usersStore);
const localFirst = ref<number>(props.first);
const localRows = ref<number>(props.rows);

watch(sheetPageResetter, () => {
  if (typeof sheetPageResetter.value === "number") {
    updatePage(sheetPageResetter.value);
  }
});

function updatePage(e?: DataTablePageEvent | number): void {
  if (typeof e === "number") {
    localFirst.value = e;
    sheetPageResetter.value = null;
  } else if (e) {
    localFirst.value = e.first;
    queryParams.value.set("skip", String(localFirst.value));
    queryParams.value.has("key")
      ? usersStore.getUsersData("users/filter")
      : usersStore.getUsersData();
  }
  window.scrollTo(0, 0);
}

function updateLimit(rows: number): void {
  localRows.value = rows;
  queryParams.value.set("limit", String(localRows.value));
}

function selectUser(e: DataTableRowSelectEvent<sheetRow>): void {
  router.push({ path: "/user/" + e.data.id });
}
</script>

<template>
  <DataTable
    :value="sheetData"
    selectionMode="single"
    dataKey="id"
    :loading="isLoading"
    paginator
    lazy
    :totalRecords="total"
    :rows="localRows"
    :first="localFirst"
    @page="updatePage"
    @update:rows="updateLimit"
    @row-select="selectUser"
    :rowsPerPageOptions="[10, 20, 30]"
    :paginatorTemplate="{
      '480px': 'PrevPageLink CurrentPageReport  NextPageLink RowsPerPageDropdown',
      default: 'FirstPageLink PageLinks LastPageLink RowsPerPageDropdown',
    }"
    style="border: 1px #ececed solid; border-radius: 12px; padding: 16px 0"
  >
    <Column field="name" header="Name">
      <template #body="slotProps">
        <div class="column-name-wrapper">
          <img :src="slotProps.data.image" :alt="slotProps.data.name" class="td__img" />
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
          :pt="{ label: { style: { font: '500 14px/21px Poppins' } } }"
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
  padding: 0px 16px 12px 16px;
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
  font:
    500 12px/18px "Roboto",
    sans-serif;
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

:deep(.p-datatable-paginator-bottom) {
  border-bottom: 0;
  border-top: 1px #ececed solid;
}

:deep(.p-paginator) {
  padding: 16px 0 0 0;
}

:deep(.p-paginator-page),
:deep(.p-select) {
  font: 400 14px/21px "Poppins";
}

@media (max-width: 1024px) {
  .td__img {
    width: 39px;
    height: 39px;
  }

  :deep(.p-datatable-tbody > tr > td) {
    font: 400 14px/16px "Poppins";
    padding: 9px 12px;
  }
}
</style>
