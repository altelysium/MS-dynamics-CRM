<script setup lang="ts">
import LogoIcon from "./icons/LogoIcon.vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
import { Button, Popover } from "primevue";
import { ref } from "vue";

const authStore = useAuthStore();
let { loggedUserData, isAuth } = storeToRefs(authStore);
const popover = ref();
const togglePopover = (e: PointerEvent): void => popover.value.toggle(e);
function submitLogout(e: PointerEvent): void {
  authStore.logout();
  togglePopover(e);
}
</script>

<template>
  <header class="header">
    <Button v-if="isAuth"
      icon="pi pi-bars"
      style="color: #848485; background-color: #ffffff; border: none; width: 24px; height: 24px"
    ></Button>
    <RouterLink :to="{ name: 'home' }" style="text-decoration: none; color: inherit; flex-grow: 2">
      <div class="header__logo">
        <LogoIcon />
        <h1 class="header__logo-title">HCare</h1>
      </div>
    </RouterLink>
    <Button v-if="isAuth"
      icon="pi pi-bell"
      style="color: #848485; background-color: #ffffff; border: none; width: 24px; height: 24px"
    ></Button>
    <Button
      @click="togglePopover"
      style="background-color: #ffffff; border: none; outline: none; padding: 0"
    >
      <img
        v-if="isAuth"
        :src="loggedUserData?.image"
        :alt="loggedUserData?.firstName + ' ' + loggedUserData?.lastName"
        class="header__avatar"
      />
    </Button>
    <Popover ref="popover">
      <div class="header-popover">
        <h3 class="header-popover__title">
          {{ loggedUserData?.firstName + " " + loggedUserData?.lastName }}
        </h3>
        <Button
          label="Sign Out"
          @click="submitLogout"
          style="width: 150px"
          :pt="{ label: { style: { font: '500 14px/21px Poppins' } } }"
        ></Button>
      </div>
    </Popover>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 40px;
  box-shadow: 0px -1px 0px 0px #e2e2ea inset;
  gap: 20px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 5px;
}

.header__logo-title {
  font: 600 20px/30px "Poppins";
}

.header__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.header-popover {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header-popover__title {
  font: 500 14px/24px "Poppins";
}

@media (max-width: 1280px) {
  .header {
    padding: 0 2.5%;
  }
}
</style>
