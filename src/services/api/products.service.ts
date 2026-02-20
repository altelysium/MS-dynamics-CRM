import type { Product } from "../../types/profileTypes";
import { api } from "./api";

export async function getProductsData(): Promise<{ products: Product[]; total: number }> {
  const { data } = await api.get<{ products: Product[]; total: number }>(`products`);
  return data;
}

export async function getSingleProductData(id: number | string): Promise<Product> {
  const { data } = await api.get<Product>(`products/${id}`);
  return data;
}