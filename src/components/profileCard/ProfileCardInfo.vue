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
      <a
        v-if="item.key == 'Email'"
        :href="`mailto:${item.value}`"
        class="profile-card-row__description profile-card-row__description_link"
        >{{ item.value }}</a
      >
      <p v-else class="profile-card-row__description">{{ item.value }}</p>
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
  font:
    400 12px/14px "Roboto",
    sans-serif;
  color: #b5b5be;
}

.profile-card-row__description {
  font:
    400 14px/16px "Roboto",
    sans-serif;
  letter-spacing: 0.1px;
  color: #44444f;
}

.profile-card-row__description_link {
  color: #2cb367;
  text-decoration: none;
}
.profile-card-row__description_link:hover {
  color: #44444f;
}
</style>
