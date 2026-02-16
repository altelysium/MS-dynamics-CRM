import { defineStore } from "pinia";
import { ref } from "vue";
import getUserData from "../services/api/getUserData.service";
import type { User } from "../types/userTypes";
import { useRoute } from "vue-router";
import type { Product } from "../types/profileTypes";
import getProductsData from "../services/api/getProducts.service";
import getSingleProductData from "../services/api/getProductReviews.service";

export const useProfileStore = defineStore("profile", () => {
  const route = useRoute();
  let fetchedProfileData = ref<User | null>(null);
  let fetchedProductsData = ref<{ products: Product[] } | null>(null);
  let fetchedSingleProductData = ref<Product | null>(null);
  let selectedUserId = route.params["id"]
    ? ref<number | string>(route.params["id"] as string)
    : ref<number | string>(1);
  async function getProfileData(id: number | string): Promise<User> {
    const data: User = await getUserData(id);
    fetchedProfileData.value = { ...data };
    return data;
  }
  async function getProducts(): Promise<{ products: Product[] }> {
    const data: { products: Product[] } = await getProductsData();
    fetchedProductsData.value = { ...data };
    return data;
  }
  async function getProductReviews(id: number | string): Promise<Product> {
    const data: Product = await getSingleProductData(id);
    fetchedSingleProductData.value = { ...data };
    return data;
  }
  return {
    selectedUserId,
    getProfileData,
    fetchedProfileData,
    getProducts,
    fetchedProductsData,
    getProductReviews,
    fetchedSingleProductData,
  };
});
