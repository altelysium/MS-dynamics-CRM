import axios from "axios";
import type { Product } from "../../types/profileTypes";

export default async function getSingleProductData(id: number | string): Promise<Product> {
  const apiBaseUrl: string = import.meta.env["VITE_BASE_API_URL"];
  const { data } = await axios.get<Product>(`${apiBaseUrl}products/${id}`);
  return data;
}
