<script setup lang="ts">
import type { ActivitiesDataKeys } from "../../types/profileTypes";
import { InputText, InputIcon, IconField } from "primevue";
import FragranceIcon from "../icons/FragranceIcon.vue";
import FurnitureIcon from "../icons/FurnitureIcon.vue";
import BeautyIcon from "../icons/BeautyIcon.vue";
import GroceriesIcon from "../icons/GroceriesIcon.vue";
import { ref } from "vue";

const props = defineProps<{
  data: ActivitiesDataKeys[];
}>();

const searchInput = ref<string>("");
</script>

<template>
  <ul class="profile-card-content">
    <IconField style="border-bottom: 1px #ececed solid">
      <InputText
        v-model="searchInput"
        placeholder="Type a post ..."
        style="height: 35px; border: none; font: 400 12px/14px Poppins"
      />
      <InputIcon class="pi pi-link" />
    </IconField>
    <template v-for="item in data">
      <li class="profile-card-list-element" v-if="item.title.includes(searchInput)">
        <div class="profile-card-list-element-row">
          <template v-if="item.category == 'fragrances'">
            <FragranceIcon />
          </template>
          <template v-else-if="item.category == 'furniture'">
            <FurnitureIcon />
          </template>
          <template v-else-if="item.category == 'beauty'">
            <BeautyIcon />
          </template>
          <template v-else-if="item.category == 'groceries'">
            <GroceriesIcon />
          </template>
          <div class="profile-card-list-element-info">
            <h4 class="profile-card-list-element-info__title">{{ item.title }}</h4>
            <p class="profile-card-list-element-info__description">
              by <span class="profile-card-list-element-info__brand">{{ item.description }}</span>
            </p>
          </div>
        </div>
        <p class="profile-card-list-element__date">{{ item.date }}</p>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.profile-card-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2px 15px 15px 15px;
  height: 320px;
  overflow-y: auto;
}

.profile-card-list-element {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.profile-card-list-element-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-card-list-element-row > svg {
  flex-grow: 2;
}

.profile-card-list-element-info__title {
  font: 500 14px/21px "Poppins";
  letter-spacing: 0.2px;
  color: #242424;
  max-width: 180px;
}

.profile-card-list-element-info__description,
.profile-card-list-element__date {
  font:
    400 12px/14px "Roboto",
    sans-serif;
  color: #818181;
}

.profile-card-list-element-info__brand {
  color: #2bb567;
}
</style>
