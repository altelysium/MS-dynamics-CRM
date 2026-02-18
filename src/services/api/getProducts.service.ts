import axios from "axios";
import type { Product } from "../../types/profileTypes";

export default async function getProductsData(): Promise<{ products: Product[], total: number }> {
  const apiBaseUrl: string = import.meta.env["VITE_BASE_API_URL"];
  const { data } = await axios.get<{ products: Product[], total: number }>(`${apiBaseUrl}products`);
  return data;
}
