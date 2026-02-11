import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { router } from "./router/routes";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, {
    theme: { preset: Aura, options: { darkModeSelector: "off" } },
  })
  .use(router)
  .use(pinia)
  .mount("#app");
