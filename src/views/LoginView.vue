<script setup lang="ts">
import { Form } from "@primevue/forms";
import { useAuthStore } from "../stores/authStore";
import { InputText, Button, Message } from "primevue";
import { ref } from "vue";
import { useKeyPress } from "../composables/useKeyPress";

const authStore = useAuthStore();
const username = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

async function handleLogin(): Promise<void> {
  try {
    errorMessage.value = "";
    await authStore.logIn(username.value, password.value);
  } catch (err) {
    if (err) {
      errorMessage.value = "Invalid username or password";
    }
  }
}
useKeyPress("Enter", handleLogin);
</script>

<template>
  <section class="login-page">
    <Form class="login-form">
      <InputText
        name="username"
        v-model="username"
        placeholder="Username"
        style="max-width: 400px; height: 50px"
      >
      </InputText>
      <InputText
        name="password"
        type="password"
        v-model="password"
        placeholder="Password"
        style="max-width: 400px; height: 50px"
      ></InputText>
      <Message v-if="errorMessage" class="error">
        {{ errorMessage }}
      </Message>
      <Button label="Log In" @click="handleLogin" @keyup.enter="handleLogin"></Button>
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
