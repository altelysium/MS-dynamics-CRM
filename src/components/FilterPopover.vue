<script setup lang="ts">
import { Popover, Select, Button } from "primevue";
import { Form } from "@primevue/forms";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "../stores/usersStore";

const usersStore = useUsersStore();
let { queryParams } = storeToRefs(usersStore);

const popover = ref<InstanceType<typeof Popover> | null>(null);
defineExpose({ popover });
const emit = defineEmits<{ (event: "setPageResetter"): number }>();

interface Filters {
  depatmentsArray: [
    "Engineering",
    "Support",
    "Research and Development",
    "Human Resources",
    "Product Management",
    "Marketing",
    "Services",
    "Accounting",
    "Training",
    "Legal",
    "Sales",
  ];
  depatmentsValue: (typeof filters.depatmentsArray)[number] | "";
}

const filters: Filters = {
  depatmentsArray: [
    "Engineering",
    "Support",
    "Research and Development",
    "Human Resources",
    "Product Management",
    "Marketing",
    "Services",
    "Accounting",
    "Training",
    "Legal",
    "Sales",
  ] as const,
  depatmentsValue: "",
};

function submitFilters(filterValue: string, key: string, e: PointerEvent): void {
  if (filterValue) {
    resetFilters(e, true);
    setFilters(filterValue, key);
    usersStore.getUsersData("users/filter");
  }
}

function setFilters(filterValue: string, key: string): void {
  queryParams.value.set("key", key);
  queryParams.value.set("value", filterValue);
  queryParams.value.set("skip", "0");
  queryParams.value.set("limit", "10");
}

function resetFilters(e: PointerEvent, isUpdating?: boolean): void {
  emit("setPageResetter");
  queryParams.value.delete("key");
  queryParams.value.delete("value");
  if (!isUpdating) {
    filters.depatmentsValue = "";
    usersStore.getUsersData();
  }
  togglePopover(e);
}

const togglePopover = (e: PointerEvent): void => popover.value?.toggle(e);
</script>

<template>
  <Popover ref="popover">
    <Form class="popover">
      <h4 class="popover__title">Filter</h4>
      <div class="popover-row">
        <p class="popover-row__label">Specialist</p>
        <Select
          v-model="filters.depatmentsValue"
          :options="filters.depatmentsArray"
          name="department"
          placeholder="Select specialist"
          style="height: 32px; font-size: 14px; line-height: 14px; width: 200px"
        />
      </div>
      <div class="popover-buttons-row">
        <Button
          type="button"
          @click="(e) => submitFilters(filters.depatmentsValue, 'company.department', e)"
          label="Submit"
          rounded
          style="flex: 1"
        ></Button>
        <Button
          @click="resetFilters"
          type="reset"
          label="Reset"
          severity="secondary"
          rounded
          style="flex: 1"
        ></Button>
      </div>
    </Form>
  </Popover>
</template>

<style scoped>
.popover {
  width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font: 400 14px/21px "Poppins";
}

.popover__title {
  font: 500 18px/24px "Poppins";
}

.popover-row {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.popover-buttons-row {
  display: flex;
  gap: 20px;
}

:deep(.p-select-label) {
  font: 400 14px/14px "Poppins";
}
</style>
