<script setup lang="ts">
import type { KeyValueRow } from "../../types/profileTypes";

const props = defineProps<{
  data: Record<string, KeyValueRow>;
}>();
</script>

<template>
  <div class="profile-card-content">
    <div class="profile-card-row" v-for="item in data">
      <h4 class="profile-card-row__title">{{ item.key }}</h4>
      <p class="profile-card-row__description">{{ item.value }}</p>
    </div>
  </div>
</template>

<style scoped>
.profile-card-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
}

.profile-card-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile-card-row__title {
  font: 400 12px/14px "Poppins";
  color: #b5b5be;
}

.profile-card-row__description {
  font: 400 14px/16px "Poppins";
  color: #44444f;
}
</style>
