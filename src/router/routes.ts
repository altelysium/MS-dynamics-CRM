import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/user/:id", component: UserView },
];

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
