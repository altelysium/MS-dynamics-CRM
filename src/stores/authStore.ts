import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { LoggedUser } from "../types/authTypes";
import { getTokens } from "../services/api/getTokens.service";
import { router } from "../router/routes";

export const useAuthStore = defineStore("auth", () => {
  const stringifiedAuthData = computed<string | null>(() => localStorage.getItem("loggedUser"));
  let loggedUserData = ref<LoggedUser | null>(stringifiedAuthData.value ? JSON.parse(stringifiedAuthData.value) : null);
  const isAuth = computed<boolean>(() => !!loggedUserData.value);
  async function logIn(username: string, password: string): Promise<LoggedUser> {
    const data: LoggedUser = await getTokens(username, password);
    loggedUserData.value = { ...data };
    if (loggedUserData.value) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUserData.value));
      router.push({ name: "home" });
    }
    return loggedUserData.value;
  }
  function logout(): void {
    localStorage.removeItem("loggedUser");
    loggedUserData.value = null;
    router.push({ name: "login" });
  }
  return { logIn, isAuth, loggedUserData, logout };
});
