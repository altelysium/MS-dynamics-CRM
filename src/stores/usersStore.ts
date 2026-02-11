import { defineStore } from "pinia";
import { computed, ref } from "vue";
import getUsers from "../services/api/getUsers.services";
import type { ResponseData, User } from "../types/userTypes";

export const queryParams = ref<URLSearchParams>(
  new URLSearchParams({
    limit: "10",
    skip: "0",
    order: "asc",
  }),
);
export const useUsersStore = defineStore("users", () => {
  let fetchedData = ref<ResponseData | null>(null);
  const users = computed<User[] | null>(() =>
    fetchedData.value ? fetchedData.value.users : null,
  );
  async function getUsersData(): Promise<ResponseData> {
    const data: ResponseData = await getUsers(queryParams.value);
    fetchedData.value = { ...data };
    return data;
  }
  return { getUsersData, fetchedData, users };
});
