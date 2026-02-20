import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {getUserData} from "../services/api/users.services";
import type { User } from "../types/userTypes";
import { useRoute } from "vue-router";
import type { Product } from "../types/profileTypes";
import {getProductsData, getSingleProductData} from "../services/api/products.service";

export const useProfileStore = defineStore("profile", () => {
  const route = useRoute();
  const fetchedProfileData = ref<User | null>(null);
  const fetchedProductsData = ref<{ products: Product[]; total: number } | null>(null);
  const fetchedSingleProductData = ref<Product | null>(null);
  const selectedUserId = computed<string | number>(() => route.params["id"] ? route.params["id"] as string : "1");
  async function getProfileData(id: number | string): Promise<User> {
    const data: User = await getUserData(id);
    fetchedProfileData.value = data;
    return data;
  }
  async function getProducts(): Promise<{ products: Product[]; total: number }> {
    const data: { products: Product[]; total: number } = await getProductsData();
    fetchedProductsData.value = data;
    return data;
  }
  async function getProductReviews(id: number): Promise<Product> {
    const data: Product = await getSingleProductData(
      fetchedProductsData.value && id > fetchedProductsData.value.total
        ? fetchedProductsData.value.total
        : id,
    );
    fetchedSingleProductData.value = data;
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
