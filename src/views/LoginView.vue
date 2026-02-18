<script setup lang="ts">
import { Form } from "@primevue/forms";
import { useAuthStore } from "../stores/authStore";
import { InputText, Button } from "primevue";
import { ref } from "vue";

const authStore = useAuthStore();
let username = ref<string>("");
let password = ref<string>("");
</script>

<template>
  <section class="login-page">
    <Form class="login-form">
      <InputText
        name="username"
        v-model="username"
        placeholder="Username"
        style="max-width: 400px; height: 50px"
      ></InputText>
      <InputText
        name="password"
        type="password"
        v-model="password"
        placeholder="Password"
        style="max-width: 400px; height: 50px"
      ></InputText>
      <Button label="Log In" @click="() => authStore.logIn(username, password)"></Button>
    </Form>
  </section>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: calc(100vh - 118px);
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px;
  background-color: #ffffff;
  border: 1px #ececed solid;
  border-radius: 16px;
  max-width: 400px;
  margin: 0 auto;
}

@media (max-width: 1280px) {
  .login-page {
    width: 95%;
  }
}
</style>
