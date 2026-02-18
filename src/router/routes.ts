import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView, meta: { requiresAuth: true } },
  { path: "/user/:id", name: "profile", component: UserView, meta: { requiresAuth: true } },
  { path: "/login", name: "login", component: LoginView },
];

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  let { isAuth } = storeToRefs(authStore);
  if (!isAuth.value && to.name !== "login") {
    return { name: "login" };
  }
  if (isAuth.value && to.name === "login") {
    return from;
  }
  return;
});
