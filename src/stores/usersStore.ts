import { defineStore } from "pinia";
import { computed, ref } from "vue";
import getUsers from "../services/api/getUsers.services";
import type { ResponseData, User } from "../types/userTypes";

export const useUsersStore = defineStore("users", () => {
  let fetchedData = ref<ResponseData | null>(null);
  let selectedUserId = ref<number | null>(null);
  const queryParams = ref<URLSearchParams>(
    new URLSearchParams({
      limit: "10",
      skip: "0",
    }),
  );
  const sheetPageResetter = ref<number | null>(null);
  const users = computed<User[] | null>(() => (fetchedData.value ? fetchedData.value.users : null));
  async function getUsersData(endpoint: string = "users"): Promise<ResponseData> {
    const data: ResponseData = await getUsers(queryParams.value, endpoint);
    fetchedData.value = { ...data };
    return data;
  }
  return { getUsersData, fetchedData, users, queryParams, selectedUserId, sheetPageResetter };
});
