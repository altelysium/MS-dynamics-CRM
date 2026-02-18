<script setup lang="ts">
import type { KeyValueRow } from "../types/profileTypes";
import { Form } from "@primevue/forms";
import { Button, InputText } from "primevue";
import { ref } from "vue";

const emit = defineEmits(["updateData"]);
const props = defineProps<{
  data: Record<string, KeyValueRow>;
  title: string;
}>();

function getValues(data: Record<string, KeyValueRow>): Record<string, string> {
  return Object.fromEntries(Object.entries(data).map(([, obj]) => [obj.key, obj.value]));
}
const dataValues = ref<Record<string, string>>(getValues(props.data));
</script>

<template>
  <Form v-slot="$form" :initialValues="dataValues" class="modal">
    <div class="modal-row" v-for="item in data">
      <h4 class="modal-row__title">{{ item.key }}</h4>
      <InputText :name="item.key" class="modal-row__input"></InputText>
    </div>
    <Button label="Submit" @click="emit('updateData', $form, data)"></Button>
  </Form>
</template>

<style scoped>
.modal {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font: 400 20px/30px "Poppins";
  width: 500px;
}

.modal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 640px) {
  .modal {
    padding: 0;
    width: 300px;
  }

  .modal-row__title {
    font: 400 14px/21px "Poppins";
  }

  .modal-row__input {
    width: 200px;
  }
}
</style>
