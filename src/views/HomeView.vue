<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { Button } from "primevue";
import { useUsersStore } from "../stores/usersStore";
import type { User } from "../types/userTypes";
import Sheet from "../components/Sheet.vue";
import FilterPopover from "../components/FilterPopover.vue";
import FilterIcon from "../components/icons/FilterIcon.vue";

const usersStore = useUsersStore();
let { users, fetchedData, sheetPageResetter, queryParams } = storeToRefs(usersStore);

export interface sheetRow {
  id: number;
  name: string;
  cityCountry: string;
  availableHours: "8:00 - 18:00" | "12:00 - 22:00";
  schedule: "Book date";
  confirmation: "Confirmed" | "Not confirmed";
  specs: string;
  image: string;
}

const sheetData = ref<sheetRow[]>([]);
let isLoading = ref<boolean>(false);
const FilterPopoverRef = ref<InstanceType<typeof FilterPopover> | null>(null);

function setSheetData(data: User[]): sheetRow[] {
  if (users) {
    sheetData.value.length = 0;
    for (let user of data) {
      const row: sheetRow = {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        cityCountry: `${user.address.city}/${user.address.country}`,
        availableHours: Math.round(user.weight) % 2 ? "8:00 - 18:00" : "12:00 - 22:00",
        schedule: "Book date",
        confirmation: Math.round(user.height) % 2 ? "Confirmed" : "Not confirmed",
        specs: user.company.department,
        image: user.image,
      };
      sheetData.value.push(row);
    }
  }
  return sheetData.value;
}
const togglePopover = (e: PointerEvent): void => FilterPopoverRef.value?.popover?.toggle(e);

watch(users, (): void => {
  if (users.value) {
    setSheetData(users.value);
    isLoading.value = false;
  }
});

onBeforeMount((): void => {
  isLoading.value = true;
  queryParams.value.has("key")
    ? usersStore.getUsersData("users/filter")
    : usersStore.getUsersData();
});
</script>

<template>
  <section class="home-page">
    <nav class="page-nav">
      <h2 class="home-page__title">Medical Staff</h2>
      <Button
        type="button"
        label="Filter"
        variant="outlined"
        rounded
        style="color: #2bb567; border-color: #ececed"
        @click="togglePopover"
      >
        <template #icon>
          <FilterIcon />
        </template>
      </Button>
      <FilterPopover
        ref="FilterPopoverRef"
        @set-page-resetter="(): number => (sheetPageResetter = 0)"
      />
    </nav>
    <Sheet
      :sheet-data="sheetData"
      :is-loading="isLoading"
      :total="fetchedData ? fetchedData.total : 10"
      :rows="queryParams.get('limit') ? Number(queryParams.get('limit')) : 10"
      :first="fetchedData ? fetchedData.skip : 0"
    />
  </section>
</template>

<style>
.home-page {
  max-width: 1170px;
  box-shadow: 0px 4px 10px 0px #00000026;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px 35px;
}

.page-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.home-page__title {
  font: 600 24px/36px "Poppins";
}

.p-button-label {
  font-weight: 400 !important;
  font-size: 14px;
}
</style>
