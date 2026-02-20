import { createRouter, createWebHistory, type Router } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
import { routes } from "./routes";

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  let { isAuth } = storeToRefs(authStore);
  if (!isAuth.value && to.name !== "login") {
    next({ name: "login" });
    return;
  }
  if (isAuth.value && to.name === "login") {
    next(from);
    return;
  }
  next();
});