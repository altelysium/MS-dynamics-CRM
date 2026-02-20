import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView, meta: { requiresAuth: true } },
  { path: "/user/:id", name: "profile", component: UserView, meta: { requiresAuth: true } },
  { path: "/login", name: "login", component: LoginView },
];
