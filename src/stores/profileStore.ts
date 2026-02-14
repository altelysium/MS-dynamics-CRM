import { defineStore } from "pinia";
import { ref } from "vue";
import getUserData from "../services/api/getUserData.service";
import type { User } from "../types/userTypes";

export const useProfileStore = defineStore("profile", () => {
  let fetchedProfileData = ref<User | null>(null);
  let selectedUserId = ref<number>(1);
  async function getProfileData(id: number): Promise<User> {
    const data: User = await getUserData(id);
    fetchedProfileData.value = { ...data };
    return data;
  }
  return { selectedUserId, getProfileData, fetchedProfileData };
});
