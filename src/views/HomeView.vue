<script setup lang="ts">
import { Button } from "primevue";
import FilterIcon from "../components/icons/FilterIcon.vue";
import Sheet from "../components/Sheet.vue";
import { onBeforeMount, ref, watch } from "vue";
import { useUsersStore } from "../stores/usersStore";
import type { User } from "../types/userTypes";
import { storeToRefs } from "pinia";

export interface sheetRow {
  name: string;
  cityCountry: string;
  availableHours: "8:00 - 18:00" | "12:00 - 22:00";
  schedule: "Book date";
  confirmation: "Confirmed" | "Not confirmed";
  specs: string;
  image: string;
}

const usersStore = useUsersStore();
let { users } = storeToRefs(usersStore);

const sheetData = ref<sheetRow[]>([]);
let isLoading = ref<boolean>(false);
function setSheetData(data: User[]): sheetRow[] {
  if (users) {
    for (let user of data) {
      const row: sheetRow = {
        name: `${user.firstName} ${user.lastName}`,
        cityCountry: `${user.address.city}/${user.address.country}`,
        availableHours:
          Math.round(user.weight) % 2 ? "8:00 - 18:00" : "12:00 - 22:00",
        schedule: "Book date",
        confirmation:
          Math.round(user.height) % 2 ? "Confirmed" : "Not confirmed",
        specs: user.company.title,
        image: user.image,
      };
      sheetData.value.push(row);
    }
  }
  return sheetData.value;
}

watch(users, () => {
  if (users.value) {
    setSheetData(users.value);
    isLoading.value = false;
  }
});

onBeforeMount((): void => {
  isLoading.value = true;
  usersStore.getUsersData();
});
</script>

<template>
  <section class="home-page">
    <nav class="page-nav">
      <h2 class="home-page__title">Medical Staff</h2>
      <Button
        label="Filter"
        variant="outlined"
        rounded
        style="color: #2bb567; border-color: #ececed"
      >
        <template #icon>
          <FilterIcon />
        </template>
      </Button>
    </nav>
    <Sheet :sheet-data="sheetData" :is-loading="isLoading" />
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
