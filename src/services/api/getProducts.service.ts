import axios from "axios";
import type { Product } from "../../types/profileTypes";

export default async function getProductsData(): Promise<{ products: Product[] }> {
  const apiBaseUrl: string = import.meta.env["VITE_BASE_API_URL"];
  const response = await axios.get<{ products: Product[] }>(`${apiBaseUrl}products`);
  const data: { products: Product[] } = response.data;
  return data;
}
