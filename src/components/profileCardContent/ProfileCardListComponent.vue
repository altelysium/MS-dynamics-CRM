<script setup lang="ts">
import type { ActivitiesDataKeys } from "../../types/profileTypes";

const props = defineProps<{
  data: ActivitiesDataKeys[];
}>();
</script>

<template>
  <ul class="profile-card-content">
    <li class="profile-card-list-element" v-for="item in data">
      <div class="profile-card-list-element-info">
        <h4 class="profile-card-list-element-info__title">{{ item.title }}</h4>
        <p class="profile-card-list-element-info__description">{{ item.description }}</p>
      </div>
      <p class="profile-card-list-element__date">{{item.date}}</p>
    </li>
  </ul>
</template>

<style scoped>
.profile-card-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  height: 320px;
  overflow-y: auto;
}

.profile-card-list-element {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.profile-card-list-element-info__title {
  font: 500 14px/21px "Poppins";
  letter-spacing: 0.2px;
  color: #242424;
}

.profile-card-list-element-info__description,
.profile-card-list-element__date {
  font: 400 12px/14px "Poppins";
  color: #818181;
}
</style>
